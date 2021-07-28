$(document).ready(function () {
    trigger();
})

function trigger() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/todo/index.do',
        dataType: 'json'
    }).done(function (data) {
        let show_all = document.getElementById('show_all').checked;
        for (; document.getElementById('table').getElementsByTagName('tr').length > 1;) {
            document.getElementById('table').deleteRow(1);
        }
        if (show_all) {
            showAll(data);
        } else {
            showNewOnly(data);
        }
    })
}

function showAll(data) {
    for (let i = 0; i < data.length; i++) {
        let checked = '';
        let disabled = '';
        if (data[i].done) {
            checked = 'checked disabled';
            disabled = '_disabled';
        }
        $('#table').append(
            `<tr id="item${disabled}">
                        <td><input type="checkbox"
                        onclick="do_done(${data[i].id})" ${checked}></td>
                        <td>${data[i].description}</td>
                    </tr>`
        );
    }
}

function showNewOnly(data) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].done) {
            continue;
        }
        $('#table').append(
            `<tr id="item">
                        <td><input type="checkbox" onclick="do_done(${data[i].id})"></td>
                        <td>${data[i].description}</td>
                    </tr>`
        );
    }
}

function do_done(item_id) {
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/todo/do_done.do',
        data: JSON.stringify({
            id: item_id
        }),
        dataType: 'json'
    }).done(function () {
        trigger();
    })
}

function create_new() {
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/todo/index.do',
        data: JSON.stringify({
            description: $('#description').val(),
            created: new Date(),
            done: false
        }),
        dataType: 'json'
    }).done(function () {
        document.getElementById('description').value = '';
        trigger();
    })
}

function validate() {
    if ($('#description').val()==='') {
        alert('Введите описание задачи');
        return false;
    }
    create_new();
}