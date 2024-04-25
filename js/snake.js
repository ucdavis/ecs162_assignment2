const gridContainer = document.getElementById("grid-container");
const gridDimension = 20;

// array of tuples representing each segment of the snake
let snake_coordinates = [[10, 10]];
let apple_coordinates = [[0, 0]];

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

function drawSnake(){
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

// make snake continously move

// if snake bumps into wall, game over

// if snake gets apple, increment points + size

// is snake touches itself, die

// detect button press

createGrid();
drawSnake();
drawApple();
