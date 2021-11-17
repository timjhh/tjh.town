import React from 'react';
import {Container, Row, Col, Button, Image} from 'react-bootstrap';
import { Github, Linkedin } from 'react-bootstrap-icons';
import './App.css';
import { Link } from 'react-router-dom';
import Footer from "./Footer.jsx";
import Dvd from "./Dvd.jsx";
import * as d3 from "d3";

const margin = {top: 20, right: 20, bottom: 20, left: 180},
width = 1024 - (margin.right+margin.left),
height = 600 - margin.top - margin.bottom;

const numSnow = 100;
let snow = [];

function Snow() {


	const svg = d3.select("#snow")
	.append("svg")
	.attr("width", width)
	.attr("height", height)
	.append("g")
	.attr("transform",
	"translate(" + margin.left + "," + margin.top + ")");


	for(var i=0;i<numSnow;i++) {
		let sn = svg.append("rect")
		.attr('x', 100)
		.attr('y', 100)
		.attr('width', 3)
		.attr('height', 3)
		.attr('stroke', 'black');
		snow.push(sn);
	}


  return (

<div id="snow">

</div>

  );
}

export default Snow;
