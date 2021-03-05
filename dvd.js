$(document).ready(function() {

	const icon = document.getElementById("dvd");
	const dvd = document.querySelector(".logo");
	const canvas = document.querySelector(".canvas");
	var FPS = 60;
	$("#speed-select").val(FPS);
	//$("#speed-select").attr("value", FPS);
	var headerHeight = $("#headrow").height(); // Set height accordingly
	$("#canvas").width("100vw").height($(window).height() - headerHeight);

	const width = window.innerWidth;
	var xPosition = 10;
	var yPosition = 10;
	var xSpeed = 4;
	var ySpeed = 4;

	var interval = setInterval(animate, 1000 / FPS);

	function update() {
		dvd.style.left = xPosition + "px";
		dvd.style.top = yPosition + "px";
	}

	$("#speed-select").change(function() {
		FPS = parseInt($("#speed-select").val());
		clearInterval(interval);
		interval = setInterval(animate, 1000 / FPS);
	});

	function animate() {
		if(xPosition <= 0 || xPosition + dvd.clientWidth >= canvas.clientWidth) {
			xSpeed = -xSpeed;
			dvd.style.fill = randomColor();
		}
		if(yPosition <= 0 || yPosition + dvd.clientHeight >= canvas.clientHeight) {
			ySpeed = -ySpeed;
			dvd.style.fill = randomColor();
		}

		xPosition += xSpeed;
		yPosition += ySpeed;

		update();


	}
	function randomColor() {
		return "#" + Math.floor(Math.random() * 1000000);
	}
	

});

