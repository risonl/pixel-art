const gridContainer = document.querySelector('.grid-container');
const paletteContainer = document.querySelector('.palette-container');
const fillButton = document.querySelector('.fill-button');
const addColorButton = document.querySelector('.add-color-button');
const clearButton = document.querySelector('.clear-button');
const squares = document.querySelectorAll('.square');
const loadButton = document.querySelector('.load-button');
const saveButton = document.querySelector('.save-button');
const removeColorButton = document.querySelector('.remove-color-button');
const allColors = document.querySelectorAll('.circle');


const allSquares = [];

// Creates an array of colors we want to pass into our palette circles
let paletteColors = ['red', 'orange', 'yellow', 'green', 'blue', 'white'];

let paintColor = '#666666';

function makeGrid(height, width) {
  for (let i = 0; i < height; i++) {
    const row = makeRow();
    gridContainer.appendChild(row);
    for (let j = 0; j < width; j++) {
      const square = makeSquare();
      row.appendChild(square);
      square.addEventListener('click', () => {
        square.style.backgroundColor = paintColor;
      })
    }
  }
}

function makeRow() {
  const row = document.createElement('div');
  row.classList.add('row');

  return row;
}

function makeSquare() {
  const square = document.createElement('div');
  square.classList.add('square');

  allSquares.push(square);

  return square;
}

function fillSquares() {
  fillButton.addEventListener('click', () => {
    const allSquares = document.querySelectorAll('.square');
    allSquares.forEach(square => (square.style.backgroundColor = paintColor));
  });
}

// Create a color circle and append to palette container
function createColorCircleAndAppend(colorHex) {
  const colorCircle = document.createElement('div');
  colorCircle.classList.add('circle');
  colorCircle.style.backgroundColor = colorHex;

  paletteContainer.appendChild(colorCircle);
  colorCircle.addEventListener('click', () => {
    paintColor = colorCircle.style.backgroundColor;
  });
}

// Create multiple color palette circles
function createColorPalette() {
  for (let i = 0; i < paletteColors.length; i++) {
    const colorHex = paletteColors[i];

    createColorCircleAndAppend(colorHex);
  }
}

// Allow user to add color palette circles
function addColor() {
  let newColor = document.querySelector('input').value;
  if (paletteColors.length < 20) {
    createColorCircleAndAppend(newColor);
    paletteColors.push(newColor)
  }
  else { alert("Too many colors! Save your progress and refresh the page to clear your palette!") }
}

//Paint Functionality
function dragAndDraw() {
  gridContainer.addEventListener('mousedown', () => {
    down = true;
    gridContainer.addEventListener('mouseup', () => {
      down = false;
    });
    gridContainer.addEventListener('mouseover', (e) => {
      if (e.target.className === "square" && down) {
        e.target.style.backgroundColor = paintColor;
      }
    });
  });
}

//clear
function clear() {
  clearButton.addEventListener('click', () => {
    const allSquares = document.querySelectorAll('.square');
    allSquares.forEach(square => (square.style.backgroundColor = 'white'));
  });
}
// Save and Load
function saveBtn() {
  saveButton.addEventListener('click', () => {
    const gridArray = [];
    for (let i = 0; i < allSquares.length; i++) {
      const squareColors = allSquares[i];
      gridArray.push(squareColors.style.backgroundColor);
    }

    const gridInfo = {
      grid: gridArray,
    }

    localStorage.setItem('gridSave', JSON.stringify(gridInfo));
  });
}

function loadBtn() {
  loadButton.addEventListener('click', () => {
    const savedGridInfo = JSON.parse(localStorage.getItem('gridSave'));
    for (let i = 0; i < allSquares.length; i++) {
      allSquares[i].style.backgroundColor = savedGridInfo.grid[i];
    }
  });
}

function init() {
  makeGrid(20, 20);
  fillSquares();
  createColorPalette();
  dragAndDraw();
  clear();
  saveBtn();
  loadBtn();
}

init();