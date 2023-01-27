'use strict'
console.clear();

let table = document.getElementById('bagua-table');

let isEdited = false;
let cell = null;
let text = null;

table.onclick = function (event) {
    cell = event.target.closest('td');
    if (!cell || isEdited) return;

    editCell(cell);
};

function editCell(cell) {
    isEdited = true;
    text = makeText(cell);
    makeBtns(cell, text);
}

function makeText() {
    const text = document.createElement('textarea');
    text.value = cell.innerHTML;
    text.className = 'edit-text';
    const cellCoords = cell.getBoundingClientRect();
    text.style.width = cellCoords.width + 'px';
    text.style.height = cellCoords.height + 'px';
    text.style.top = cellCoords.top + 'px';
    text.style.left = cellCoords.left + 'px';
    document.body.append(text);
    return text;
}

function makeBtns() {
    const btnsContainer = document.createElement('div');
    btnsContainer.className = 'btns-container';
    const cellCoords = cell.getBoundingClientRect();
    btnsContainer.style.top = cellCoords.bottom + 'px';
    btnsContainer.style.left = cellCoords.left + 'px';
    const yesBtn = makeBtn('OK', 'true');
    const noBtn = makeBtn('CANCEL', '');
    btnsContainer.append(yesBtn, noBtn);
    yesBtn.onfocus = (e) => saveExit;
    noBtn.addEventListener('focus', (e) => saveExit)
    document.body.append(btnsContainer);
}

function makeBtn(text, value) {
    const btn = document.createElement('button');
    btn.innerHTML = text;
    btn.value = value;
    return btn;
}

function saveExit(event) {
    console.log('закрыть')
    const btn = event.target.value;
    const isSaved = btn.value;
    if (isSaved) cell.innerHTML = text.value;
    text.remove();

    isEdited = !isEdited;
    cell = null;
    text = null;
}