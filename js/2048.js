const upArrow = document.getElementById("up-arrow");
const downArrow = document.getElementById("down-arrow");
const leftArrow = document.getElementById("left-arrow");
const rightArrow = document.getElementById("right-arrow");

document.addEventListener('DOMContentLoaded', () => {
  createGrid();
  setupInputListeners();
  startGame();
});

let score = 0;
let size = 4; 
let board = [];

function createGrid() {
  const gridContainer = document.querySelector('.grid');
  gridContainer.innerHTML = '';
  for (let i = 0; i < size; i++) {
    const row = document.createElement('div');
    row.classList.add('grid-row');
    for (let j = 0; j < size; j++) {
      const cell = document.createElement('div');
      cell.classList.add('grid-cell');
      row.appendChild(cell);
    }
    gridContainer.appendChild(row);
  }
}

function setupInputListeners() {
  document.addEventListener('keydown', handleInput);
}

function startGame() {
  board = new Array(size).fill().map(() => new Array(size).fill(0));
  score = 0;
  document.getElementById('score').textContent = score;
  addNumber();
  addNumber();
  updateBoard();
  document.addEventListener('keydown', handleInput); 
}

function handleInput(e) {
  let flippedHorizontally = false;
  let rotated = false;
  let movePlayed = true;
  switch (e.key) {
    case 'ArrowUp':
      board = transpose(board);
      rotated = true;
      break;
    case 'ArrowDown':
      board = transpose(board);
      board = board.map(row => row.reverse());
      rotated = true;
      flippedHorizontally = true;
      break;
    case 'ArrowLeft':
      break;
    case 'ArrowRight':
      board = board.map(row => row.reverse());
      flippedHorizontally = true;
      break;
    default:
      movePlayed = false;
  }

  if (movePlayed) {
    let past = copyBoard(board);
    for (let i = 0; i < size; i++) {
      board[i] = operate(board[i]);
    }
    if (flippedHorizontally) {
      board = board.map(row => row.reverse());
    }
    if (rotated) {
      board = transpose(board);
    }
    if (compareBoards(past, board)) {
      addNumber();
    }
    updateBoard();
    checkForGameOver();
  }
}

function handleArrowPress(key) {
    let flippedHorizontally = false;
    let rotated = false;
    let movePlayed = true;

    switch (key) {
        case 'ArrowUp':
            board = transpose(board);
            rotated = true;
            break;
        case 'ArrowDown':
            board = transpose(board);
            board = board.map(row => row.reverse());
            rotated = true;
            flippedHorizontally = true;
            break;
        case 'ArrowLeft':
            break;
        case 'ArrowRight':
            board = board.map(row => row.reverse());
            flippedHorizontally = true;
            break;
        default:
            movePlayed = false;
    }

    if (movePlayed) {
        let past = copyBoard(board);
        for (let i = 0; i < size; i++) {
            board[i] = operate(board[i]);
        }
        if (flippedHorizontally) {
            board = board.map(row => row.reverse());
        }
        if (rotated) {
            board = transpose(board);
        }
        if (compareBoards(past, board)) {
            addNumber();
        }
        updateBoard();
        checkForGameOver();
    }
}

leftArrow.addEventListener("click", function () {
    handleArrowPress('ArrowLeft');
});

upArrow.addEventListener("click", function () {
    handleArrowPress('ArrowUp');
});

rightArrow.addEventListener("click", function () {
    handleArrowPress('ArrowRight');
});

downArrow.addEventListener("click", function () {
    handleArrowPress('ArrowDown');
});



function operate(row) {
  row = slide(row);
  row = combine(row);
  row = slide(row);
  return row;
}

function slide(row) {
  return row.filter(val => val).concat(Array(size).fill(0).slice(0, size - row.filter(val => val).length));
}

function combine(row) {
  for (let i = 0; i < size - 1; i++) {
    if (row[i] !== 0 && row[i] === row[i + 1]) {
      row[i] *= 2;
      row[i + 1] = 0;
      score += row[i];
      document.getElementById('score').textContent = score;
    }
  }
  return row;
}


function transpose(matrix) {
  return matrix[0].map((col, i) => matrix.map(row => row[i]));
}


function copyBoard(board) {
  return board.map(row => [...row]);
}

function compareBoards(b1, b2) {
  return b1.some((row, i) => row.some((cell, j) => cell !== b2[i][j]));
}

function addNumber() {
  let options = [];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (board[i][j] === 0) {
        options.push({ x: i, y: j });
      }
    }
  }
  if (options.length > 0) {
    let spot = options[Math.floor(Math.random() * options.length)];
    let r = Math.random();
    board[spot.x][spot.y] = r > 0.1 ? 2 : 4;
  }
}

function updateBoard() {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let cell = document.querySelector(`.grid-row:nth-child(${i + 1}) .grid-cell:nth-child(${j + 1})`);
      cell.textContent = board[i][j] === 0 ? '' : board[i][j];
      cell.style.backgroundColor = getColor(board[i][j]);
    }
  }
}


function getColor(value) {
  const colorMap = {
    0: 'gray', 2: 'lightgray', 4: 'darkgray', 8: 'slategray',
    16: 'lightslategray', 32: 'dimgray', 64: 'black', 128: 'silver',
    256: 'darkslategray', 512: 'dimgrey', 1024: 'darkgray', 2048: 'lightgray'
  };
  return colorMap[value] || 'black';
}


function checkForGameOver() {
  let moves = [
    board,
    transpose(board),
    board.map(row => [...row].reverse()),
    transpose(board).map(row => [...row].reverse())
  ];

  if (board.some(row => row.includes(2048))) {
    alert('You won!');
    document.removeEventListener('keydown', handleInput);
    return;
  }

  if (!moves.some(grid => grid.some(row => row.includes(0) || row.some((v, i) => i && v === row[i - 1])))) {
    alert('Game over!');
    document.removeEventListener('keydown', handleInput);
  }
}
