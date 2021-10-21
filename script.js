const gridContainer = document.querySelector('.grid-container');
const paletteContainer = document.querySelector('.palette-container');
const fillButton = document.querySelector('.fill-button');
const addColorButton = document.querySelector('.add-color-button');

// Creates an array of colors we want to pass into our palette circles
let paletteColors = ['red', 'orange', 'yellow', 'green', 'blue',];

let paintColor = '#666666';

function makeGrid(height, width) {
  for (let i = 0; i < height; i++) {
    const row = makeRow();
    gridContainer.appendChild(row);
    for (let j = 0; j < width; j++) {
      const square = makeSquare();
      row.appendChild(square);
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
 createColorCircleAndAppend(newColor);
 paletteColors.push(newColor)
}

// Color picker functionality


function init() {
  makeGrid(20, 20);
  fillSquares();
  createColorPalette();
}

init();
// Color Selecting
document.querySelectorAll('.circle').addEventListener("click" , pickColor);
function pickColor() {
  let paintColor = this.backgroundColor;
}

// Grid Painting
const squares = document.querySelectorAll('.square')
function paintFunction() {
  event.currentTarget.style.backgroundColor = paintColor
}
for (var i = 0 ; i < squares.length ; i++) {
  squares[i].addEventListener('click' , paintFunction);
}

//Saving

//Loading