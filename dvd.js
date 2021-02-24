$(document).ready(function() {

	const icon = document.getElementById("dvd");
	const dvd = document.querySelector(".logo");
	const canvas = document.querySelector(".canvas");
	const FPS = 60;

	const width = window.innerWidth;

	var xPosition = 10;
	var yPosition = 10;
	var xSpeed = 4;
	var ySpeed = 4;

	function update() {
		dvd.style.left = xPosition + "px";
		dvd.style.top = yPosition + "px";
	}
	setInterval(()  => {
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

	}, 1000 / FPS);
	
	function randomColor() {
		return "#" + Math.floor(Math.random() * 1000000);
	}
	console.log($("#speed-select").attr("value"));
	$("#speed-select").change(function(d) {
		console.log(d);
		console.log($("#speed-select").attr("value"));
		console.log($('#speed-select').slider('getValue'));
	});

});

