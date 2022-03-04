import React, { useEffect, useState } from 'react';
import { Button, Form, Row, Container } from 'react-bootstrap';
import './App.css';
//import { Link } from 'react-router-dom';
import * as d3 from "d3";
import $ from 'jquery';
import { color } from 'd3';

// var body = document.body,
//     html = document.documentElement;


// Starting Colors
// #9ebcda
// #90ee90
// #357360
// #CABDAF

// AI Generated Colors
// #ececd9
// #4c8a63
// #1f5d77
// #302a31
// #647443
// #2a4b7e
const colors = ["#9ebcda", "#357360", "#CABDAF", "#ececd9", "#4c8a63", "#1f5d77", "#302a31", "#647443" ,"#2a4b7e"];
// Light blue #9ebcda
// sage green #357360
// tan #CABDAF
// yellow-ish-tan #ececd9
// green #4c8a63
// deeper blue #1f5d77
// plum #302a31
// green #647443
// deep blue #2a4b7e
const colorPairs = [
	//["#2a4b7e", "#9ebcda"],
	["#ececd9", "#CABDAF"],
	["#4c8a63", "#357360"],
	["#302a31", "#647443"]
]
// sage green 

// green 
// deeper blue #1f5d77
// plum 
// green 

const minMtn = 1;
const maxMtn = 8;

const starCount = 30;

// Variation(rockiness) of mountain lines
const variation = 50;

// Rain box animation timer
var timerRain;
var timerStars;

var margin = {top: 20, right: 20, bottom: 20, left: 20},
width = window.innerWidth*(10/12),
height = window.outerHeight;


let hData = [{cX: 0, cY: 70}]; // Horizontal front-facing line
let mData = []; // Background mountain


d3.select("#cgl")
.selectAll("svg")
.remove();

function Snow(props) {


	const [rain, setRain] = useState(false);
	const [day, setDay] = useState(false);

	useEffect(() => {


	height = Math.max($(document).height(), $(window).height());


	for(var i=80;i<width;i+=10) {
		let randY = (Math.random()*10)+(i/4);
		hData.push({cX:i, cY:randY});

	}
	for(var j=0;j<width/2;j+=10) {
		let randY = (Math.random()*60);
		mData.push({cX: j, cY: randY+j+(width/2)})
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


	const svg = d3.select("#snow")
	.append("svg")
	.attr("position", "absolute")
	.attr("className", "svg-content-responsive svg-container")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 " + (width) + " " + (height+margin.bottom+margin.top))
	.attr("width", width)
	.attr("height", document.documentElement.getBoundingClientRect().height)
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

	gradient.attr("gradientTransform", "rotate(90)");
		


	// Glowy filter
	var glow = svg.append("defs").append("filter")
		.attr("id","glow");

	glow.append("feGaussianBlur")
		.attr("class", "blur")
		.attr("stdDeviation","4.5")
		.attr("result","coloredBlur");

	var feMerge = glow.append("feMerge");
	feMerge.append("feMergeNode")
		.attr("in","coloredBlur");
	feMerge.append("feMergeNode")
		.attr("in","SourceGraphic");





	svg.append("rect")
		.attr("id", "background")
	    .attr("width", "100%")
	    .attr("height", "100%")
	    .attr("fill", "url(#bg-gradient)");


	// Rain animation container
	svg.append("g")
	.attr("id", "anim")


	svg.append("g")
	.attr("id", "mtns")


	// Forefront green hill
	svg.append("path")
	.datum(hData)
	.attr("d", d3.area()
		.x(d => x(d.cX))
		.y1(d => y(d.cY))
		.y0(height+margin.top+margin.bottom)
		)
	.attr("fill", "#357360")
	.attr("opacity", 0.6);



	// Black overlay on front left hill
	// svg.append("path")
	// .datum(mData)
	// .attr("d", d3.area()
	// 	.x(d => mX(d.cX))
	// 	.y1(d => mY(d.cY))
	// 	.y0(height+margin.top+margin.bottom)
	// 	)
	// .attr("opacity", 0.9)
	// .attr("fill", "#CABDAF");

	svg.append("path")
	.datum(mData)
	.attr("d", d3.area()
		.x(d => mX(d.cX))
		.y1(d => mY(d.cY))
		.y0(height+margin.top+margin.bottom)
		)
	.attr("opacity", 0.8)
	.attr("fill", "#353839");

	// Black overlay in forefront
	svg.append("path")
	.datum(mData)
	.attr("d", d3.area()
		.x(d => mX(d.cX))
		.y1(d => mY(d.cY+0))
		.y0(height+margin.top+margin.bottom)
		)
	.attr("fill", "#353839")
	.attr("opacity", 0.8);


	// Big mountain in back
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

	let stars = svg.append("g")
	.attr("id", "stars")

	// for(var z=0;z<starCount;z++) {

	// 	let maxY = hData[hData.length-2].cY;

	// 	let randX = (Math.random()*width)+80;

	// 	let randY = Math.random()*maxY;

	// 	let rounded = (Math.round(randX / 10) * 10);

	// 	let closest = hData.find(e => e.cX === rounded);
		
	// 	if(closest) {
	// 		if(randY >= closest.cY) {
	// 			//continue;
				
	// 			let newVal = hData.find(e => e.cY > randY);
	// 			randX = newVal ? newVal.cX : width-20;
	// 			randY = Math.random()*newVal.cY;
				
	// 			//randY -= closest.cY;
	// 		}
	// 	}

	// 	// stars.append("rect")
	// 	// .attr('x', randX)
	// 	// .attr('y', randY)
	// 	// .attr("zIndex", 1)
	// 	// .attr('width', 2)
	// 	// .attr('height', 2)
	// 	// .attr("stroke", 5)
	// 	// .attr("filter","url(#glow)")
	// 	// .attr("fill", "white");

	// 	stars.append("circle")
	// 	.attr('cx', randX)
	// 	.attr('cy', randY)
	// 	.attr("zIndex", 1)
	// 	.attr('r', 1)
	// 	//.attr('height', 2)
	// 	.attr("filter","url(#glow)")
	// 	.attr("fill", "white");


	// }


	//console.log(document.documentElement.getBoundingClientRect().height);

	timerRain = d3.timer(animate);
	// timerStars = d3.timer(animateStars);
	timerStars = d3.interval(animateStars, 60);

	}, []);


	function animateStars() {

		let svg = d3.select("#stars");


		let maxY = hData[hData.length-2].cY;

		let randX = (Math.random()*width)+80;

		let randY = Math.random()*maxY;

		let rounded = (Math.round(randX / 10) * 10);

		let closest = hData.find(e => e.cX === rounded);
		
		if(closest) {
			if(randY >= closest.cY) {
				//continue;
				
				let newVal = hData.find(e => e.cY > randY);
				randX = newVal ? newVal.cX : width-20;
				randY = Math.random()*newVal.cY;
				
				//randY -= closest.cY;
			}
		}

		// stars.append("rect")
		// .attr('x', randX)
		// .attr('y', randY)
		// .attr("zIndex", 1)
		// .attr('width', 2)
		// .attr('height', 2)
		// .attr("stroke", 5)
		// .attr("filter","url(#glow)")
		// .attr("fill", "white");

		let st = svg.append("circle")
		.attr('cx', randX)
		.attr('cy', randY)
		.attr("zIndex", 1)
		.attr('r', 0)
		//.attr('height', 2)
		.attr("filter","url(#glow)")
		.attr("fill", "white");






		st.transition()
		.duration(1000)
		//.ease(d3.easeLinear)
		.ease(d3.easeQuadIn)
		.attr("r", 1)
		.transition()
		.duration(1000)
		//.ease(d3.easeLinear)
		.ease(d3.easeQuadIn)
		.attr("r", 0)
		.remove();
		// .transition()
		// .duration(5000)
		// //.ease(d3.easeLinear)
		// .ease(d3.easeQuadIn)
		// .attr("r", 1)
		//.attr('y', height+margin.top+margin.bottom)


	}

	function animate() {


		let svg = d3.select("#anim");
		let rX = Math.random()*width;
		let rY = Math.random()*height;
		let sn = svg.append("rect")
		.attr('x', rX)
		.attr('y', -margin.top-rY)
		.attr("zIndex", 1)
		.attr('width', 2)
		.attr('height', 5)
		.attr("stroke", 5)
		.attr("fill", "#53789E");
		// .attr("fill", "darkblue");


		sn.transition()
		.duration(1500)
		.ease(d3.easeLinear)
		//.ease(d3.easeQuadIn)
		.attr('y', height+margin.top+margin.bottom)
		.remove();		


	}



	useEffect(() => {

		d3.select("#anim").selectAll("*").remove();

		if(rain) {
			timerRain.restart(animate);
		} else {
			timerRain.stop();
		}
		

	}, [rain])

	useEffect(() => {


		let grad = d3.select("#bg-gradient");

		grad.selectAll("stop").remove();



		// var gradient = svg.append("defs")
		// .append("linearGradient")
		// .attr("id", "bg-gradient")
		// .attr("x1", "0")
		// .attr("x2", "1")
		// .attr("y1", "0")
		// .attr("y2", "1.5")

		if(day) {

			d3.select("#stars").attr("opacity", 0);

			grad
			.attr("gradientTransform", "rotate(-90)");

			grad.append("stop")
				.attr("stop-color", "#9ebcda")
				.attr("offset", "0")
	
			grad.append("stop")
				.attr("stop-color", "lightgreen")
				.attr("offset", "1")

		} else {
	

			d3.select("#stars").attr("opacity", 1);

			//grad.attr("y2", "3")
			grad
			.attr("gradientTransform", "rotate(-90)");

			grad.append("stop")
				.attr("stop-color", "#141852") 
				.attr("offset", "0")
	
			// #6B4984
			// #2B2F77
			grad.append("stop")
				.attr("stop-color", "#855988")
				.attr("offset", "0.4")

		}

		d3.select("#background")
		.transition()
		.duration(500)
		.attr("fill", "url(#bg-gradient)");


	}, [day])

  return (


<>
<div className="position-absolute bg-light p-2" id="panel">
	
	<Container>

		<Row className="px-3 mx-3">
			<Form.Check 
				type={"checkbox"}
				id={"rainCheck"} // lol
				label={"Toggle Rain"}
				checked={rain}
				onChange={() => setRain(!rain)} />
			<Form.Check 
				className="mx-3"
				type={"checkbox"}
				id={"nightCheck"}
				label={"Toggle Day"}
				checked={day}
				onChange={() => setDay(!day)} />
		</Row>

	</Container>

  </div>
<div style={{"backgroundColor": "black"}} id="snow" className="overflow-hidden">

</div>
</>
  );
}

export default Snow;
