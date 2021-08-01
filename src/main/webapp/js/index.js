$(document).ready(function () {
    trigger();
})

function trigger() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/todo/category',
        dataType: 'json'
    }).done(function (data) {
        let opt = document.getElementById('cIds').getElementsByTagName('option');
        for (; opt.length > 0;) {
            opt[0].parentNode.removeChild(opt[0]);
        }
        for (let i = 0; i < data.length; i++) {
            $('#cIds').append(
                `<option id="cat" value="${data[i].id}">${data[i].name}</option>`
            )
        }
    })
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
        let categories = data[i].categories;
        let created = data[i].created;
        let cat = '';
        if (data[i].done) {
            checked = 'checked disabled';
            disabled = '_disabled';
        }
        for (let j = 0; j < categories.length; j++) {
            cat += `<p>${categories[j].name}</p>`;
        }
        $('#table').append(
            `<tr id="item${disabled}">
                        <td class="col-md-1"><input type="checkbox" 
                        onclick="do_done(${id})" ${checked}></td>
                        <td class="col-md-3">${description}</td>
                        <td class="col-md-2">${cat}</td>
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
        let categories = data[i].categories;
        let created = data[i].created;
        let cat = '';
        for (let j = 0; j < categories.length; j++) {
            cat += `<p>${categories[j].name}</p>`;
        }
        $('#table').append(
            `<tr id="item">
                        <td class="col-md-1"><input type="checkbox" 
                        onclick="do_done(${id})"></td>
                        <td class="col-md-4">${description}</td>
                        <td class="col-md-2">${cat}</td>
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
        data: {
            description: $('#description').val(),
            categoryIds: $('#cIds').val().join(",")
        },
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
    if ($('#cIds').val().length===0) {
        alert('Выберите категорию задачи');
        return false;
    }
    create_new();
}