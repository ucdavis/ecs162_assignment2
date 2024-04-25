const gridContainer = document.getElementById("grid-container");
const gridDimension = 20;
const directions = [
    [0, 1], // down
    [1, 0], // right
    [0, -1], // up
    [-1, 0] // left
]

// array of tuples representing each segment of the snake
let snake_coordinates = [[10, 10]];
let apple_coordinates = [[0, 0]];
let snake_direction = directions[0];

function createGrid() {
	for (let i = 0; i < gridDimension * gridDimension; i++) {
		const cell = document.createElement("div");
		cell.classList.add("grid-cell");
		gridContainer.appendChild(cell);
	}
}

function fillCells(coordinates, color) {
    coordinates.forEach((coord) => {
        const cellIndex = coord[0] + coord[1] * gridDimension;
        const cell = gridContainer.children[cellIndex];
        cell.style.backgroundColor = color;
    });
}

function clearCells() {
    for (let row = 0; row < gridDimension; row++) {
        for (let col = 0; col < gridDimension; col++) {
            const cellIndex = col + row * gridDimension;
            const cell = gridContainer.children[cellIndex];
            cell.style.backgroundColor = 'transparent';
        }
    }
}

function drawSnake(){
    moveSnake();
    fillCells(snake_coordinates, 'green');
}

function setAppleCoordinates(){
    apple_coordinates = [[
        Math.floor(Math.random() * gridDimension),
        Math.floor(Math.random() * gridDimension)
    ]];
}

function drawApple(){
    setAppleCoordinates();
    fillCells(apple_coordinates, 'red');
}

function moveSnake(){
    snake_coordinates.forEach((segment) => {
        segment[0] += snake_direction[0];
        segment[1] += snake_direction[1];
    });
}

document.onkeydown = function (e) {
    switch (e.keyCode) {
        case 37:
            snake_direction = directions[3];
            break;
        case 38:
            snake_direction = directions[2];
            break;
        case 39:
            snake_direction = directions[1];
            break;
        case 40:
            snake_direction = directions[0];
            break;
    }
};

// if snake bumps into wall, game over

// if snake gets apple, increment points + size

// is snake touches itself, die

// detect button press
createGrid();
function gameLoop(){
    clearCells();
    drawSnake();
    drawApple();
}

setInterval(gameLoop, 1000);


