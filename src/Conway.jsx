import React, { useEffect, useRef } from 'react';
import './App.css';
//import { Link } from 'react-router-dom';
import * as d3 from "d3";

var margin = {top: 20, right: 20, bottom: 20, left: 20},
// width = window.innerWidth*10/12,
// height = window.innerHeight*19/20;

// width = 250,
// height = 250;

width = 16,
height = 16;

let snow = [];
let particles = [];

let startCount = 3;
let size = 4; // Size of each particle

// Effective grid height/width for 2d array
let aWidth = Math.floor(width/size);
let aHeight = Math.floor(height/size);

var field = new Array(aHeight);
for(let i=0;i<aHeight;i++) {
	field[i] = new Array(aWidth).fill(0);
}

// console.log(aWidth + " aW");
// console.log(aHeight + " aH");
function Conway(props) {


	const sizeRef = useRef(null);

	useEffect(() => {

	//width = sizeRef.current ? sizeRef.current.offsetWidth : window.offsetWidth;

// Instantiate empty field of values




	for(var i=0;i<startCount;i++) {
		let randX = Math.floor((Math.random()*aWidth));
		let randY = Math.floor((Math.random()*aHeight));
		let particle = {x:randX, y:randY};
		particles.push(particle);

		field[randY][randX] = 1;

	}
	// let x = d3.scaleLinear()
	// .range([0,width])
	// .domain([0,width]);

	// let y = d3.scaleLinear()
	// .range([height,0])
	// .domain([0,height]);

	// let mX = d3.scaleLinear()
	// .range([0,width])
	// .domain([0,width/2]);

	// let mY = d3.scaleLinear()
	// .range([height/2,height])
	// .domain([0,width]);



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
	    .attr("width", "100%")
	    .attr("height", "100%")
	    // .attr("fill", "url(#bg-gradient)");
	    .attr("fill", "red");

	svg.append("rect")
	    .attr("width", width)
	    .attr("height", height)
	    // .attr("fill", "url(#bg-gradient)");
	    .attr("fill", "black");

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


	iterate();
	//var timer = d3.interval(animate, 4000);

	}, []);

	function sleep(ms) {
	  return new Promise(resolve => setTimeout(resolve, ms));
	}


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
		// console.log(field);
		// console.log(field.at(0));
		// console.log(field.at(1));
		// console.log(field.at(2));
		// console.log(field.at(3));
		try {
			// console.log(x + " " + y + " " + count + " " + field[y][x]);
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

		//console.log(x + " " + y + " " + count + " " + field[y][x]);
		return parseInt(count);
	}

	async function animate() {

		let game = d3.select("#cgl").select("svg").select(".main").select("#anim");



		// DA RULEZ
		// Fewer than 2 neighbors dies
		// 2 or 3 neighbors lives
		// More than 3 neighbords dies
		// Exactly 3 neighbors becomes alive

		// 1. Any live cell with two or three live neighbours survives.
		// 2. Any dead cell with three live neighbours becomes a live cell.
		// 3. All other live cells die in the next generation. Similarly, all other dead cells stay dead.


		particles = [];

		// Get all particles which have a neighbor
		// field.forEach((d,idy) => {
		// 	d.forEach((e,idx) => {


		// 	});
		// });

		for(var idy=0;idy<aHeight;idy++) {
			for(var idx=0;idx<aWidth;idx++) {

				
				let p = ({x:idx, y:idy});
				let count = nCount(p);
				console.log("x y " + p.x + " " + p.y + " " + count);

				if(count === 3 || count === 2) {
					particles.push(p);
					field[idy][idx] = 1;
				}


			}
		}
		console.log("\n\n END");

		// particles = particles.filter(d => {
		// 	let count = nCount(d);
		// 	return count === 2 || count === 3 ? d : null;
		// });

		// particles.forEach(d => {
		// 	if(field[d.y][d.x] === 0) {
		// 		field[d.y][d.x] = 1;
		// 	} else field[d.y][d.x] = 0;
		// });


		//console.log(field);

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






				// sn.transition()
				// .duration(5000)
				// .attr('y', height)
				// .remove();		
		// .attr("fill", "url(#bg-gradient)");
		//snow.push(sn);





	}



async function iterate() {

		for(var idy=0;idy<aHeight;idy++) {
			for(var idx=0;idx<aWidth;idx++) {


				let p = ({x:idx, y:idy});
				let count = nCount(p);
				console.log(idx + " " + idy + " " + count + " " + field[idy][idx]);

				// if(count === 3 || count === 2) {
				// 	particles.push(p);
				// 	field[idy][idx] = 1;
				// } else {
				// 	field[idy][idx] = 0;
				// }	


			}
		}
		console.log("\n\n END");

}





  return (

<div id="cgl" ref={sizeRef} style={{"width": "100%"}}>

</div>

  );
}

export default Conway;
