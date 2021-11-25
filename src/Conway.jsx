import React, { useEffect, useRef } from 'react';
import './App.css';
//import { Link } from 'react-router-dom';
import * as d3 from "d3";

var margin = {top: 20, right: 20, bottom: 20, left: 20},
width = window.innerWidth*10/12,
height = window.innerHeight*19/20;
// width = 5,
// height = 5;

let snow = [];
let particles = [];
let field = [];
let startCount = 100;
let size = 4; // Size of each particle

function Snow(props) {


	const sizeRef = useRef(null);

	useEffect(() => {

	//width = sizeRef.current ? sizeRef.current.offsetWidth : window.offsetWidth;

	// Instantiate empty field of values
	for(var i=0;i<height;i++) {
		field.push([]);
		for(var j=0;j<width;j++) {
			field[i].push(0);
		}
	}

	for(var i=0;i<startCount;i++) {
		let randX = Math.floor((Math.random()*width));
		let randY = Math.floor((Math.random()*height));
		let particle = {x:randX, y:randY};
		particles.push(particle);

		field[randY][randX] = 1;

	}




	let x = d3.scaleLinear()
	.range([0,width])
	.domain([0,width]);

	let y = d3.scaleLinear()
	.range([height,0])
	.domain([0,height]);

	let mX = d3.scaleLinear()
	.range([0,width])
	.domain([0,width/2]);

	let mY = d3.scaleLinear()
	.range([height/2,height])
	.domain([0,width]);



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
	    .attr("fill", "black");


	// Life Particles Container
	let game = svg.append("g")
	.attr("id", "anim")
	
	game.selectAll("rect")
	.data(particles)
	.enter()
	.append("rect")
	.attr("x", d => (d.x)-size/2)
	.attr("y", d => (d.y)-size/2)
	.attr("width", size)
	.attr("height", size)
	.attr("fill", "white");






	// while(particles.length != 1) {





	// }




	}, [sizeRef.current]);

	// is e one of the 8 neighbors of d?
	function isNeighbor(d,e) {
		return Math.abs(d.x-e.x) < 1 && Math.abs(d.y-e.y) < 1 ? true : false;
	}
	function getNeighbors(d) {
		return particles.filter(e => isNeighbor(d,e) ? e : null);
	}
	function nCount(d) {
		let count = 0;
		let x = d.x;
		let y = d.y;
		if(field[y-1][x]) count++;
		if(field[y+1][x]) count++;
		if(field[y-1][x-1]) count++;
		if(field[y-1][x+1]) count++;
		if(field[y][x-1]) count++;
		if(field[y][x+1]) count++;
		if(field[y+1][x-1]) count++;
		if(field[y+1][x+1]) count++;
		return count;
	}

	function animate() {

		let game = d3.select("#cgl").select("svg").select(".main").select("#anim");


		// Get all particles which have a neighbor
		let data = particles.filter(d => getNeighbors(d).length == 2);
		let added = [];
		let removed = [];


		// Instantiate empty field of values
		for(var i=0;i<height;i++) {
			for(var j=0;j<width;j++) {
				if(nCount(field[i][j]) == 2) {
					console.log("b");
				}
			}
		}


		// game.selectAll("rect")
		// .data(data)
		// .enter()
		// .append("rect")
		// .attr("x", d => d.x)
		// .attr("y", d => d.y)
		// .attr("width", size)
		// .attr("height", size)
		// .attr("fill", "white");

		// let sn = svg.append("rect")
		// .attr('x', rX)
		// .attr('y', -margin.top-rY)
		// .attr("zIndex", 1)
		// .attr('width', 2)
		// .attr('height', 5)
		// .attr("stroke", 5)
		// .attr("fill", "white");


				// sn.transition()
				// .duration(5000)
				// .attr('y', height)
				// .remove();		
		// .attr("fill", "url(#bg-gradient)");
		//snow.push(sn);





	}

	var timer = d3.timer(animate);
 
  return (

<div id="cgl" ref={sizeRef} style={{"width": "100%"}}>

</div>

  );
}

export default Snow;