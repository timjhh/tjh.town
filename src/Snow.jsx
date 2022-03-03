import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './App.css';
//import { Link } from 'react-router-dom';
import * as d3 from "d3";
import $ from 'jquery';

var body = document.body,
    html = document.documentElement;


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
const colors = ["#9ebcda", "#357360", "#CABDAF"
, "#ececd9", "#4c8a63", "#1f5d77", "#302a31", "#647443" ,"#2a4b7e"]
	
var margin = {top: 20, right: 20, bottom: 20, left: 20},
width = window.innerWidth*(10/12),
height = window.outerHeight;
//height = Math.max($(document).height(), $(window).height());
// height = Math.max( body.scrollHeight, body.offsetHeight, 
// 	html.clientHeight, html.scrollHeight, html.offsetHeight, document.height );
//height = window.innerHeight;
// height = Math.max( body.scrollHeight, body.offsetHeight, 
// 	html.clientHeight, html.scrollHeight, html.offsetHeight, document.height );

let hData = [{cX: 0, cY: 70}]; // Horizontal front-facing line
let mData = []; // Background mountain


	d3.select("#cgl")
	.selectAll("svg")
	.remove();

function Snow(props) {


	const [sliderVal, setSliderVal] = useState(3);

	function handleSlider(event) {
		setSliderVal(parseInt(event.target.value)+1);
	}

	useEffect(() => {

	// d3.select("#cgl")
	// .selectAll("svg")
	// .remove();

	//height = document.documentElement.getBoundingClientRect().height;
	height = Math.max($(document).height(), $(window).height());





	for(var i=80;i<width;i+=10) {
		let randY = (Math.random()*10)+(i/4);
		hData.push({cX:i, cY:randY});

	}
	for(var i=0;i<width/2;i+=10) {
		let randY = (Math.random()*60);
		mData.push({cX: i, cY: randY+i+(width/2)})
	}


	// let x = d3.scaleLinear()
	// .range([0,width+margin.left+margin.right])
	// .domain([0,width]);

	// let y = d3.scaleLinear()
	// .range([height,0])
	// .domain([0,height]);

	// let mX = d3.scaleLinear()
	// .range([0,width+margin.left+margin.right])
	// .domain([0,width/2]);

	// let mY = d3.scaleLinear()
	// .range([height/2,height])
	// .domain([0,width]);



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



	var pGrad = svg.append("defs")
		.append("linearGradient")
		.attr("id", "pGrad")
		.attr("x1", "0")
		.attr("x2", "1")
		.attr("y1", "0")
		.attr("y2", "1.5")

	// Define gradient starts and stops
	pGrad.append("stop")
		.attr("stop-color", "#4F2168")
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
	


	// // Forefront hill area
	// svg.append("path")
	// .datum(hData)
	// .attr("d", d3.area()
	// 	.x(d => x(d.cX))
	// 	.y1(d => y(d.cY))
	// 	.y0(height+margin.top+margin.bottom)
	// 	)
	// .attr("fill", "#357360");



	// // Black overlay on front left hill
	// svg.append("path")
	// .datum(mData)
	// .attr("d", d3.area()
	// 	.x(d => mX(d.cX))
	// 	.y1(d => mY(d.cY))
	// 	.y0(height+margin.top+margin.bottom)
	// 	)
	// .attr("opacity", 0.9)
	// .attr("fill", "#CABDAF");


	// // Black overlay in forefront
	// svg.append("path")
	// .datum(mData)
	// .attr("d", d3.area()
	// 	.x(d => mX(d.cX))
	// 	.y1(d => mY(d.cY))
	// 	.y0(height+margin.top+margin.bottom)
	// 	)
	// .attr("fill", "black")
	// .attr("opacity", 0.8);


	// // Big mountain in back
	// svg.append("path")
	// .datum(hData)
	// .attr("d", d3.area()
	// 	.x(d => x(d.cX))
	// 	.y1(d => x(d.cY))
	// 	.y0(height+margin.top+margin.bottom)
	// 	)
	// .attr("stroke", "black")
	// .attr("fill", "black")
	// .attr("opacity", 0.4);



	let x = d3.scaleLinear()
	.range([0,width+margin.left+margin.right])
	.domain([0,width]);

	let y = d3.scaleLinear()
	.domain([0,height])
	.range([0,height]);

	let mtns = svg.append("g")
	.attr("id", "mtns");

	let negative = 1;



		for(var j=1;j<=sliderVal;j++) {
			
			let grad = mtns.append("defs")
			.append("linearGradient")
			.attr("id", "grad#"+j)
			.attr("x1", "0")
			.attr("x2", "1")
			.attr("y1", "0")
			.attr("y2", "1.5")

			let randClr1 = parseInt(Math.random()*colors.length);
			let randClr2 = parseInt(Math.random()*colors.length);

			// Define gradient starts and stops
			grad.append("stop")
				.attr("stop-color", colors[randClr1])
				.attr("offset", "0")

			grad.append("stop")
				.attr("stop-color", colors[randClr2])
				.attr("offset", "1")




			let randW = (Math.random()*(width/2))+(width/2);

			let slope = (Math.random()*2)+0.2;

			let heightVar = (height/(sliderVal))*(sliderVal-j);
			let variation = ((Math.random()+0.1)*60);
			let data = [];

			for(var i=0;i<width;i+=10) {
				let randY = (Math.random()*variation); // Variation per data point
				data.push({
					cX: (negative > 0 ? i : (width-i)),
					cY: ((slope*i)+randY)+heightVar
					//cY: ((height)-((randY+i)))+(heightVar)
				})
			}
			
			mtns.selectAll("path")
			.data(data)
			.enter()
			.append("path")
			.attr("id", "mtn#" + j)
			.attr("d", d3.area()
				.x(d => x(d.cX))
				.y1(d => x(d.cY))
				.y0(height+margin.top+margin.bottom)
				)
			.attr("stroke", "black")
			//.attr("fill", "url(#grad#" + j + ")")
			.attr("fill", colors[randClr1])
			.attr("opacity", 0.8);
		
			mtns
			.datum(data)
			.append("path")
			.attr("id", "mtn#" + j)
			.attr("d", d3.area()
				.x(d => x(d.cX))
				.y1(d => x(d.cY+20))
				.y0(height+margin.top+margin.bottom)
				)
			.attr("stroke", "black")
			.attr("fill", "url(#grad#" + j + ")")
			//.attr("fill", colors[randClr1])
			.attr("opacity", 0.5);

			mtns
			.datum(data)
			.append("path")
			.attr("id", "mtn#" + j)
			.attr("d", d3.area()
				.x(d => x(d.cX))
				.y1(d => x(d.cY+80))
				.y0(height+margin.top+margin.bottom)
				)
			.attr("stroke", "black")
			.attr("fill", "url(#grad#" + j + ")")

			.attr("opacity", 1);



			negative *= -1;


		}















	// Attempt at circle via areaRadial
	// svg.append("path")
	// .datum(mData)
	// .attr("d", d3.areaRadial()
	// 	.curve(d3.curveLinearClosed)
	// 	.angle(d => mX(d.cX)%360)
	// 	.radius(d => mY(Math.sqrt(d.cY)))
	// 	)
	// .attr("transform", "translate("+ width/2 + "," + height/2 + ")")
	// .attr("opacity", 0.9)
	// .attr("fill", "#CABDAF");
	console.log(document.documentElement.getBoundingClientRect().height);

	var timer = d3.timer(animate);

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
		//.ease(d3.easeLinear)
		.ease(d3.easeQuadIn)
		.attr('y', height+margin.top+margin.bottom)

		.remove();		


	}
	useEffect(() => {

		let svg = d3.select(".main");

		svg.selectAll("path").remove();







	}, [sliderVal])
	
  return (


<>
<div className="position-absolute bg-light p-2" id="panel">
	

	<Form.Label>Mountain Count</Form.Label>
  		<Form.Range className="mx-2" max={9} min={0} value={sliderVal-1} onChange={(event) => handleSlider(event)} />
	<Button variant="dark" onClick={() => setSliderVal(3)}>Reset</Button>

  </div>
<div style={{"backgroundColor": "black"}} id="snow" className="overflow-hidden">

</div>
</>
  );
}

export default Snow;
