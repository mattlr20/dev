var tasks = [
    {"id":1,"name":"Login Page","description":"create login page for users","reference":"todo"},
    {"id":2,"name":"Intranet Bugs","description":"fix bug on intranet home page","reference":"done"},
    {"id":3,"name":"Messenger App","description":"Create instant messenger for clients","reference":"codeReview"},
    {"id":4,"name":"Contact Page","description":"connect contact form to database","reference":"done"},
    {"id":5,"name":"Website overhaul","description":"make mobile friendly","reference":"inProgress"}
];

function addList(items) {

    for(i=0;i < items.length; i++) {
        var data = items[i];
        var list = document.getElementById('ul'+data.reference);
        var item = document.createElement('li');
        item.id = data.id;
        item.appendChild(document.createTextNode(data.name));
        item.className = 'card';
        item.draggable = true;
        list.appendChild(item);
    }

}

addList(tasks);
