const gridContainer = document.getElementById("grid-container");
const scoreText = document.getElementById("score-value");

const easyButton = document.querySelector(".easy-button");
const mediumButton = document.querySelector(".medium-button");
const hardButton = document.querySelector(".hard-button");
const upArrow = document.getElementById("up-arrow");
const downArrow = document.getElementById("down-arrow");
const leftArrow = document.getElementById("left-arrow");
const rightArrow = document.getElementById("right-arrow");
const gameOverMessage = document.getElementById("game-over-message")

const gridDimension = 20;
const directions = [
	[0, 1], // down
	[1, 0], // right
	[0, -1], // up
	[-1, 0], // left
];

let snake_coordinates = null;
let apple_coordinates = null;
let snake_direction = null;
let gameOver = null;
let score = null;
let gameSpeed = null;

function gameLoop() {
	clearCells();
	drawSnake();
	drawApple();
}

function resetLoop(gameSpeed) {
	clearInterval(gameOver);
	gridContainer.focus();
	snake_coordinates = [[10, 10]];
	apple_coordinates = [[5, 5]];
	gameOver = null;
    gameOverMessage.style.display = "none";
	score = -1;
	updateScore();
	gameOver = setInterval(gameLoop, gameSpeed);
}

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
	
    checkSelfCollision();
    checkHasEaten();
	checkWallCollision();
}

function checkWallCollision() {
	let x = snake_coordinates[0][0];
	let y = snake_coordinates[0][1];

	if (x === 0 || x === gridDimension - 1 || y === 0 || y === gridDimension - 1) {
		endGame();
	}
}

function checkSelfCollision() {
    const head = snake_coordinates[0];
    for (let i = 1; i < snake_coordinates.length; i++) {
        if (head[0] === snake_coordinates[i][0] && head[1] === snake_coordinates[i][1]) {
            endGame();
        }
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

function endGame() {
    gameOverMessage.style.display = "block";
    clearInterval(gameOver);
}

document.onkeydown = function (e) {
	switch (e.keyCode) {
		case 37:
			snake_direction = directions[3];
			leftArrow.click();
			break;
		case 38:
			snake_direction = directions[2];
			upArrow.click();
			break;
		case 39:
			snake_direction = directions[1];
			rightArrow.click();
			break;
		case 40:
			snake_direction = directions[0];
			downArrow.click();
			break;
	}
};
leftArrow.addEventListener("click", function () {
	toggleArrowButtonShadow(leftArrow);
	snake_direction = directions[3];
});
upArrow.addEventListener("click", function () {
	toggleArrowButtonShadow(upArrow);
	snake_direction = directions[2];
});
rightArrow.addEventListener("click", function () {
	toggleArrowButtonShadow(rightArrow);
	snake_direction = directions[1];
});
downArrow.addEventListener("click", function () {
	toggleArrowButtonShadow(downArrow);
	snake_direction = directions[0];
});

function addDifficultyButtonEventListener(button, speed) {
	button.addEventListener("click", function () {
		resetLoop(speed);
	});

	button.addEventListener("keydown", function (e) {
		if (e.keyCode >= 37 && e.keyCode <= 40) {
			e.preventDefault();
		}
	});
}

addDifficultyButtonEventListener(easyButton, 1000);
addDifficultyButtonEventListener(mediumButton, 700);
addDifficultyButtonEventListener(hardButton, 100);
createGrid();
