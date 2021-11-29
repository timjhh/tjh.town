import React, { useEffect, useRef } from 'react';
import { Dropdown } from 'react-bootstrap';
import './App.css';
import * as d3 from "d3";

var margin = {top: 20, right: 20, bottom: 20, left: 20},
width = window.innerWidth*(10/12),
height = window.innerHeight;

let particles = [];

//let startCount = 1000;
let startCount = d3.min([height,width]);
let size = 10; // Size of each particle

// Effective grid height/width for 2d array
let aWidth = Math.floor(width/size);
let aHeight = Math.floor(height/size);

var field = new Array(aHeight);
for(let i=0;i<aHeight;i++) {
	field[i] = new Array(aWidth).fill(0);
}

d3.select("#cgl")
.selectAll("svg")
.remove();


// Optional cool seed
// var field = [
	
// 	[0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0],
// 	[0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0],
// 	[0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
// 	[0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0,0,1,0,1,1,0,0,0,0],
// 	[0,0,0,0,1,1,0,1,0,1,0,0,1,1,0,0,1,0,1,0,1,1,0,0,0,0],
// 	[0,0,0,0,0,0,0,1,0,1,0,1,0,0,1,0,1,0,1,0,0,0,0,0,0,0],
// 	[0,0,0,0,0,0,0,1,0,1,0,1,0,0,1,0,1,0,1,0,0,0,0,0,0,0],
// 	[0,0,0,0,1,1,0,1,0,1,0,0,1,1,0,0,1,0,1,0,1,1,0,0,0,0],
// 	[0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0,0,1,0,1,1,0,0,0,0],
// 	[0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
// 	[0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0],
// 	[0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0]

// ];


//var size = 10; // Size of each particle
//var width = field[0].length*size, height = field.length*size

// var aWidth = field[0].length;
// var aHeight = field.length;

function Conway(props) {


	const sizeRef = useRef(null);

	useEffect(() => {

		var time = 200;

		var options = ["Default", "Box", "Etc"];

		d3.select("#cgl")
		.selectAll("svg")
		.remove();


		// let test1 = [
		// 	[0,1,0],
		// 	[1,0,1],
		// 	[0,1,0]
		// ];

		// let test2 = [
		// 	[0,1,1],
		// 	[1,0,1],
		// 	[0,1,0]
		// ];

		// let test3 = [
		// 	[0,1,0,0],
		// 	[0,0,1,0],
		// 	[1,1,1,0],
		// 	[0,0,0,0]
		// ];

	// OPTIONAL UNIT TESTING
	//nTesting(test3);



		for(var idy=0;idy<aHeight;idy++) {
			for(var idx=0;idx<aWidth;idx++) {

					if(field[idy][idx] === 1) {
						let p = ({x:idx, y:idy});
						particles.push(p);					
					}
			
			}
		}

	for(var i=0;i<startCount;i++) {
		let randX = Math.floor((Math.random()*aWidth));
		let randY = Math.floor((Math.random()*aHeight));
		let particle = {x:randX, y:randY};
		particles.push(particle);

		field[randY][randX] = 1;

	}

	const svg = d3.select("#cgl")
	.append("svg")
	.attr("position", "absolute")
	.attr("width", width)
	.attr("height", height+margin.top+margin.bottom)
	.append("g")
	.attr("class", "main");

	var gradient = svg.append("defs")
		.append("linearGradient")
		.attr("id", "bg-gradient")
		.attr("x1", "0")
		.attr("x2", "1")
		.attr("y1", "0")
		.attr("y2", "1.5")

	// Define gradient starts and stops
	gradient.append("stop")
		.attr("stop-color", "#9ebcda")
		.attr("offset", "0")

	gradient.append("stop")
		.attr("stop-color", "lightgreen")
		.attr("offset", "1")



	var pGrad = svg.append("defs")
		.append("linearGradient")
		.attr("id", "pGrad")
		.attr("x1", "0")
		.attr("x2", "1")
		.attr("y1", "0")
		.attr("y2", "1.5")

	// Define gradient starts and stops
	pGrad.append("stop")
		.attr("stop-color", "#4F2168 ")
		.attr("offset", "0")

	pGrad.append("stop")
		.attr("stop-color", "#EE3F6B")
		.attr("offset", "1")

	svg.append("rect")
	    .attr("width", width)
	    .attr("height", "100%")
	    // .attr("fill", "url(#bg-gradient)");
	    .attr("fill", "black");


  const controls = svg
  	.append("g")
  	.attr("id", "controls")
  	.attr("height", 150)
  	.attr("width", 100)
		.attr("transform", "translate(" + margin.left + "," + (margin.top+margin.bottom) + ")");


  controls
  	.append("rect")
  	.attr("z-index", 10)
  	.attr("height", 150)
  	.attr("width", 100)
   	.style("fill", "rgba(255, 0, 0, 0.4)");



  controls.append("ul")
  .selectAll("li")
  .data(options)
  .enter()
  .append("li")
  .append("a")
  .attr("color", "white")
  .attr("fill", "white")
  .text(d => d);


	// Life Particles Container
	let game = svg.append("g")
	.attr("id", "anim")
	
	game.selectAll("rect")
	.data(particles)
	.enter()
	.append("rect")
	.attr("x", d => (d.x*size))
	.attr("y", d => (d.y*size))
	.attr("pos", d => ({x:d.x, y:d.y}))
	.attr("pX", d => d.x)
	.attr("pY", d => d.y)
	.attr("width", size)
	.attr("height", size)
	.attr("fill", "white");


	//iterate();
	const timer = d3.interval(() => animate(), time);

	}, []);




	// is e one of the 8 neighbors of d?
	function isNeighbor(d,e) {
		return Math.abs(d.x-e.x) < 1 && Math.abs(d.y-e.y) < 1 ? true : false;
	}
	function getNeighbors(d) {
		return particles.filter(e => isNeighbor(d,e) ? e : null);
	}
	function nCount(d) {

		if(!field) return;
		let count = 0;
		let x = parseInt(d.x);
		let y = parseInt(d.y);

		try {

			if(y > 0 && field[y-1][x] === 1) count++;
			if(y < aHeight-1 && field[y+1][x] === 1) count++;
			if(y > 0 && x > 0 && field[y-1][x-1] === 1) count++;
			if(y > 0 && x < aWidth-1 && field[y-1][x+1] === 1) count++;
			if(x > 0 && field[y][x-1] === 1) count++;
			if(x < aWidth-1 && field[y][x+1] === 1) count++;
			if(y < aHeight-1 && x > 0 && field[y+1][x-1] === 1) count++;
			if(x < aWidth-1 && y < aHeight-1 && field[y+1][x+1] === 1) count++;		

		} catch(e) {

			console.log(e);

		}


		return parseInt(count);
	}


	// // Given custom array, return # of neighbors
	// function nCountCustom(d,arr) {

	// 	if(!arr) return;
	// 	let count = 0;
	// 	let x = parseInt(d.x);
	// 	let y = parseInt(d.y);

	// 	let height = arr.length
	// 	let width = arr[0].length

	// 	try {

	// 		if(y > 0 && arr[y-1][x] === 1) count++;
	// 		if(y < height-1 && arr[y+1][x] === 1) count++;
	// 		if(y > 0 && x > 0 && arr[y-1][x-1] === 1) count++;
	// 		if(y > 0 && x < width-1 && arr[y-1][x+1] === 1) count++;
	// 		if(x > 0 && arr[y][x-1] === 1) count++;
	// 		if(x < width-1 && arr[y][x+1] === 1) count++;
	// 		if(y < height-1 && x > 0 && arr[y+1][x-1] === 1) count++;
	// 		if(x < width-1 && y < height-1 && arr[y+1][x+1] === 1) count++;		

	// 	} catch(e) {

	// 		console.log(e);

	// 	}
	// 	return parseInt(count);
	// }



		// DA RULEZ
		// Fewer than 2 neighbors dies
		// 2 or 3 neighbors lives
		// More than 3 neighbords dies
		// Exactly 3 neighbors becomes alive

		// 1. Any live cell with two or three live neighbours survives.
		// 2. Any dead cell with three live neighbours becomes a live cell.
		// 3. All other live cells die in the next generation. Similarly, all other dead cells stay dead.
	async function animate() {

		let game = d3.select("#cgl").select("svg").select(".main").select("#anim");

		particles = [];

		let tmpCopy = new Array(aHeight);

		for(let i=0;i<aHeight;i++) {
			tmpCopy[i] = field[i].slice();
			}


		for(var y=0;y<aHeight;y++) {
			for(var x=0;x<aWidth;x++) {

				
				let p = ({x:x, y:y});
				let val = field[y][x];
				let count = nCount(p);

				if((count === 3  || count === 2) && val === 1) {
					particles.push(p);
					tmpCopy[y][x] = 1;

				}
				else if(count === 3 && val === 0) {
					particles.push(p);
					tmpCopy[y][x] = 1;

				} else {
					tmpCopy[y][x] = 0;
				}


			}
		}

		field = tmpCopy.slice();
		tmpCopy.forEach((z,idz) => {
			field[idz] = z.slice();
		});


		// Life Particles Container
		game
		.selectAll("rect")
		.remove();


		game.selectAll("rect")
		.data(particles)
		.enter()
		.append("rect")
		.attr("x", d => (d.x*size))
		.attr("y", d => (d.y*size))
		.attr("pos", d => ({x:d.x, y:d.y}))
		.attr("pX", d => d.x)
		.attr("pY", d => d.y)
		.attr("width", size)
		.attr("height", size)
		.attr("fill", "white");



	}


  return (

<div id="cgl" ref={sizeRef} className="overflow-hidden">

</div>

  );
}

export default Conway;
