function toggleButtonShadow(button) {
	document.querySelectorAll(".button-container button").forEach((btn) => {
		btn.classList.remove("invert-shadow");
	});

	button.classList.add("invert-shadow");
}

document.addEventListener("DOMContentLoaded", function () {
	const easyButton = document.querySelector(".easy-button");
	easyButton.click();
});