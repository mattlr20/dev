var movingCard = null;

function startDragging(e) {
    this.classList.add('dragging');
    movingCard = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function dragInto(e) {
    if (movingCard.parentNode.parentNode !== this){
        this.classList.add('over');
    }
}

function dragWithin(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function dragOut(e) {
    this.classList.remove('over');
}

function drop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }

    if (movingCard.parentNode.parentNode !== this) {
        this.getElementsByClassName('card-list')[0].appendChild(movingCard);
        //alert("UPDATE WebTaskJournal SET reference = "+this.id+" WHERE record = "+movingCard.id);
    }

    return false;
}

function stopDragging(e) {
    [].forEach.call(columns, function (column) {
      column.classList.remove('over');
    });
    movingCard.classList.remove('dragging');
    movingCard = null;
}

function clickCard(e) {
    var cardLoc = this.getBoundingClientRect();

    var newCard = document.createElement('div');
    newCard.setAttribute('id', 'cardDetail');
    newCard.style.left = cardLoc.left + 'px';
    newCard.style.top = cardLoc.top + 'px';
    newCard.style.width = cardLoc.width + 'px';
    newCard.style.height = cardLoc.height + 'px';

    var frontSide = document.createElement('div');
    frontSide.classList.add('front');
    var contentWrapper = document.createElement('div');
    contentWrapper.classList.add('content');

    var lookup = {};
    for (var i = 0, len = tasks.length; i < len; i++) {
        lookup[tasks[i].id] = tasks[i];
    }
    result = lookup[this.id].description;

    contentWrapper.innerHTML = this.innerHTML;
    contentWrapper.innerHTML += "<br>" + result;
    frontSide.appendChild(contentWrapper);
    newCard.appendChild(frontSide);

    document.getElementById('board').appendChild(newCard);

    setTimeout(function(){ expandCard(newCard); }, 50);
}

function expandCard(newCard) {
    document.getElementById('modalOverlay').style.display = 'block';
    var cardWidth = window.innerWidth * 0.6;
    if (cardWidth > 1000) { 
        cardWidth = 1000;
    }
    var cardHeight = cardWidth * 0.7;
    if (cardHeight > window.innerHeight) {
        cardHeight = window.innerHeight * 0.9;
        cardWidth = cardHeight / 0.7;
    }
    newCard.style.width = cardWidth + 'px';
    newCard.style.height = cardHeight + 'px';
    newCard.style.left = (window.innerWidth - cardWidth) / 2 + 'px';
    newCard.style.top = (window.innerHeight - cardHeight) / 2 + 'px';
}

function clickOverlay(e) {
    closeDetail();
}

function handleKeyup(e) {
    if (e.keyCode === 27) {
        var cardDetail = document.getElementById('cardDetail');
        if (cardDetail !== null && typeof cardDetail !== 'undefined') {
            closeDetail();
        }
    }
}

function closeDetail(){
    document.getElementById('modalOverlay').style.display = 'none';
    var cardDetail = document.getElementById('cardDetail');
    cardDetail.parentNode.removeChild(cardDetail);
}

var cards = document.querySelectorAll('#board .card');
[].forEach.call(cards, function(card) {
    card.addEventListener('dragstart', startDragging, false);
    card.addEventListener('dragend', stopDragging, false);
    card.addEventListener('click', clickCard, false);
});
var columns = document.querySelectorAll('#board .column');
[].forEach.call(columns, function(column) {
    column.addEventListener('dragenter', dragInto, false);
    column.addEventListener('dragover', dragWithin, false);
    column.addEventListener('dragleave', dragOut, false);
    column.addEventListener('drop', drop, false);
});
var modalOverlay = document.getElementById('modalOverlay');
modalOverlay.addEventListener('click', clickOverlay, false);
document.addEventListener('keyup', handleKeyup, false);