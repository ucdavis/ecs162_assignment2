const gridContainer = document.getElementById("grid-container");
const scoreText = document.getElementById("score-value");
const gridDimension = 20;
const directions = [
	[0, 1], // down
	[1, 0], // right
	[0, -1], // up
	[-1, 0], // left
];

// array of tuples representing each segment of the snake
let snake_coordinates = [[10, 10]];
let apple_coordinates = [[5, 5]];
let snake_direction = directions[0];
let gameOver = null;
let score = 0;

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
			cell.style.backgroundColor = "transparent";
		}
	}
}

function drawSnake() {
	moveSnake();
	fillCells(snake_coordinates, "green");
}

function setAppleCoordinates() {
	apple_coordinates = [
		[
			Math.floor(Math.random() * gridDimension),
			Math.floor(Math.random() * gridDimension),
		],
	];
}

function drawApple() {
	fillCells(apple_coordinates, "red");
}

function moveSnake() {
	// make each previous segment equal to next segment
	for (let i = snake_coordinates.length - 1; i > 0; i--) {
		snake_coordinates[i][0] = snake_coordinates[i - 1][0];
		snake_coordinates[i][1] = snake_coordinates[i - 1][1];
	}

	// update the head
	snake_coordinates[0][0] += snake_direction[0];
	snake_coordinates[0][1] += snake_direction[1];
	checkHasEaten();
	checkWallCollision();
}

function checkWallCollision() {
	let x = snake_coordinates[0][0];
	let y = snake_coordinates[0][1];

	if (x === 0 || x === gridDimension - 1 || y === 0 || y === gridDimension - 1) {
		clearInterval(gameOver);
	}
}

function updateScore() {
	score += 1;
	scoreText.textContent = score;
}

function checkHasEaten() {
	head = snake_coordinates[0];
	if (
		head[0] === apple_coordinates[0][0] &&
		head[1] === apple_coordinates[0][1]
	) {
		let tail = snake_coordinates[snake_coordinates.length - 1];
		let newSegment = [tail[0] + snake_direction[0], tail[1] + snake_direction[1]];
		snake_coordinates.push(newSegment);

		console.log(newSegment);
		console.log(snake_coordinates);

		setAppleCoordinates();
		updateScore();
	}
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

function toggleButtonShadow(button) {
    document.querySelectorAll('.button-container button').forEach(btn => {
        btn.classList.remove('invert-shadow');
    });

    button.classList.add('invert-shadow');
}

createGrid();

function gameLoop() {
	clearCells();
	drawSnake();
	drawApple();
}

gameOver = setInterval(gameLoop, 1000);
