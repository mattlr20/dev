var tasks = [
    {"id":1,"name":"MERN.io","description":"learn mean stack","reference":"todo"},
    {"id":2,"name":"Portal","description":"Portal updates","reference":"done"},
    {"id":3,"name":"FINRA","description":"Test and give feed back","reference":"codeReview"},
    {"id":4,"name":"GovPartners","description":"Maintain fund application","reference":"done"},
    {"id":5,"name":"ABLE TN","description":"make mobile friendly","reference":"inProgress"}
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
