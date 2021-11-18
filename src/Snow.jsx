import React, { useEffect } from 'react';
import {Container, Row, Col, Button, Image} from 'react-bootstrap';
import { Github, Linkedin } from 'react-bootstrap-icons';
import './App.css';
import { Link } from 'react-router-dom';
import Footer from "./Footer.jsx";
import Dvd from "./Dvd.jsx";
import * as d3 from "d3";

const margin = {top: 20, right: 20, bottom: 20, left: 180},
width = window.innerWidth,
height = window.innerHeight;

const numSnow = 100;

let snow = [];
let horizon;
let hData = [{cX: 0, cY: 70}]; // Horizontal front-facing line
let mData = []; // Background mountain

for(var i=80;i<window.innerWidth;i+=10) {
	let randY = (Math.random()*10)+(i/4);
	hData.push({cX:i, cY:randY});

}
for(var i=0;i<window.innerWidth/2;i+=10) {
	let randY = (Math.random()*60);
	mData.push({cX: i, cY: randY+i+(window.innerWidth/2)})
}


let x = d3.scaleLinear()
.range([0,width])
.domain([0,window.innerWidth]);

let y = d3.scaleLinear()
.range([height,0])
.domain([0,window.innerHeight]);

let mX = d3.scaleLinear()
.range([0,width])
.domain([0,window.innerWidth/2]);

let mY = d3.scaleLinear()
.range([height/2,height])
.domain([0,window.innerWidth]);

function Snow() {


	useEffect(() => {

	var interval = setInterval(animate, 500);
	const svg = d3.select("#snow")
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
	    .attr("fill", "url(#bg-gradient)");


	// Rain animation container
	svg.append("g")
	.attr("id", "anim")
	


	// Forefront hill area
	svg.append("path")
	.datum(hData)
	.attr("d", d3.area()
		.x(d => x(d.cX))
		.y1(d => y(d.cY))
		.y0(height+margin.top+margin.bottom)
		)
	.attr("fill", "#357360");



	// Black overlay on front left hill
	svg.append("path")
	.datum(mData)
	.attr("d", d3.area()
		.x(d => mX(d.cX))
		.y1(d => mY(d.cY))
		.y0(height+margin.top+margin.bottom)
		)
	.attr("opacity", 0.9)
	.attr("fill", "#CABDAF");






	// Forefront line topo
	// svg.append("path")
	// .datum(hData)
	// .attr("class", "line")
	// .attr("stroke", "#967bb6")
	// .attr("stroke-width", 6)
	// .attr("opacity", 0.6)
	// .attr("d", d3.line()
 //  .x(d => x(d.cX))
 //  .y(d => y(d.cY))
	// .curve(d3.curveNatural));

	// Black overlay in forefront
	svg.append("path")
	.datum(mData)
	.attr("d", d3.area()
		.x(d => mX(d.cX))
		.y1(d => mY(d.cY))
		.y0(height+margin.top+margin.bottom)
		)
	.attr("fill", "black")
	.attr("opacity", 0.8);


	// Black overlay in forefront
	svg.append("path")
	.datum(hData)
	.attr("d", d3.area()
		.x(d => x(d.cX))
		.y1(d => x(d.cY))
		.y0(height+margin.top+margin.bottom)
		)
	.attr("stroke", "black")
	.attr("fill", "black")
	.attr("opacity", 0.4);




	}, []);


	function animate() {

		let svg = d3.select("#snow").select("svg").select(".main").select("#anim");
		let rX = Math.random()*width;
		let rY = Math.random()*height;
		let sn = svg.append("rect")
		.attr('x', rX)
		.attr('y', -margin.top-rY)
		.attr("zIndex", 1)
		.attr('width', 2)
		.attr('height', 5)
		.attr("stroke", 5)
		.attr("fill", "darkblue");


				sn.transition()
				.duration(5000)
				.attr('y', height)
				.remove();		
		// .attr("fill", "url(#bg-gradient)");
		snow.push(sn);
	for(var i=0;i<2;i++) {



	}

			// snow.forEach((d,i) => {
			// 	//d.transition().duration(100).attr('y', height+margin.top+margin.bottom);

			// 	d.transition()
			// 	.duration(1000)
			// 	.attr('y', height)
			// 	.remove();

			// })




	}
	//var timer = d3.interval(animate);
	var timer = d3.timer(animate);
	//const interval = setInterval(() => {animate()}, 500);
 
  return (

<div id="snow">

</div>

  );
}

export default Snow;
