function toggleButtonShadow(button) {
	document.querySelectorAll(".button-container button").forEach((btn) => {
		btn.classList.remove("invert-shadow");
	});

	button.classList.add("invert-shadow");
}


function toggleArrowButtonShadow(button) {
	document
		.querySelectorAll(".arrow-button, .button-container button")
		.forEach((btn) => {
			btn.classList.remove("invert-shadow");
		});

	if (button) {
		button.classList.add("invert-shadow");
	}
}

// select down arrow by defualt
document.addEventListener("DOMContentLoaded", function () {
	const arrowButtons = document.querySelectorAll(".arrow-button");

	arrowButtons.forEach((button) => {
		button.addEventListener("click", () => toggleArrowButtonShadow(button));
	});

	const upArrowButton = document.getElementById("down-arrow");
	if (upArrowButton) {
		upArrowButton.click();
	}
});

// select easy difficulty by default
document.addEventListener("DOMContentLoaded", function () {
	const easyButton = document.querySelector(".easy-button");
	easyButton.click();
});
