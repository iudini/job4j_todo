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
        let id = data[i].id;
        let description = data[i].description;
        let created = data[i].created;
        if (data[i].done) {
            checked = 'checked disabled';
            disabled = '_disabled';
        }
        $('#table').append(
            `<tr id="item${disabled}">
                        <td class="col-md-1"><input type="checkbox" 
                        onclick="do_done(${id})" ${checked}></td>
                        <td class="col-md-4">${description}</td>
                        <td class="col-md-2">${created}</td>
                    </tr>`
        );
    }
}

function showNewOnly(data) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].done) {
            continue;
        }
        let id = data[i].id;
        let description = data[i].description;
        let created = data[i].created;
        $('#table').append(
            `<tr id="item">
                        <td class="col-md-1"><input type="checkbox" 
                        onclick="do_done(${id})"></td>
                        <td class="col-md-4">${description}</td>
                        <td class="col-md-2">${created}</td>
                    </tr>`
        );
    }
}

function do_done(item_id, description, created) {
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/todo/do_done.do',
        data: JSON.stringify({
            id: item_id,
            description: description,
            created: created,
            done: true
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