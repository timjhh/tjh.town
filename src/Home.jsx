import React, { useRef, useState } from 'react';
import { Container, Row, Col, Image, ListGroup } from 'react-bootstrap';
import { Github, Linkedin } from 'react-bootstrap-icons';
import './App.css';

import { Route, Routes, Link } from 'react-router-dom';
import Footer from "./Footer.jsx";
// import Dvd from "./Dvd.jsx";
import Snow from "./Snow.jsx";
import Conway from "./Conway.jsx";
// import MusicGraph from "./MusicGraph.jsx";
//import * as d3 from "d3";

//import MapController from "./visuals/coolviz/MapController.jsx";
import GraphController from "./visuals/coolviz/GraphController.jsx";

function Home() {

// const [show, setShow] = useState(false);
// const [active, setActive] = useState(0);

// const handleClose = () => setShow(false);
// const handleShow = () => setShow(true);

// useEffect(() => {

// 	const width = 500;
// 	const height = 500;

// 	/*
// 		GENERATE CONTROLS TO SWITCH ELEMENTS
// 	*/
// 	const svg = d3.select("#switcher")
// 	.append("svg")
// 	.attr("zIndex", 5)
// 	.attr("position", "absolute")
// 	.attr("width", width)
// 	.attr("height", height)
// 	.append("g")
// 	.attr("class", "sMain");

// 	const btns = svg.append("button")
// 	.attr("x", 0)
// 	.attr("y", window.innerHeight / 3)
// 	.attr("transform", "translate(0," + window.innerHeight/3 + ")" )
// 	.attr("width", 200)
// 	.attr("height", 100)
// 	.text("ABCD")

// }, [])

const usedWidth = useRef(null);

  return (

<Container fluid>

{/*  <Routes>
		<Route exact path="/MusicGraph" render={() => {window.location.href="/projects/MusicGraph.html"}} />
	</Routes>*/}
	<Row ref={usedWidth}>
		<Col xs={12} md={2} className="d-flex transparent text-muted font-weight-light text-center flex-column">
		<Row className="justify-content-center">
			<Image rounded className="mt-3 w-75 align-items-center" id="profile" src="prof.png"/>
			
			<div className="px-3">
			<p><br/>My name is Tim Harrold(he/them), and i'm an aspiring programmer / human being. Here are some of my projects, interests and hobbies</p>
			<hr/>

			<a href="https://github.com/timjhh" target="_blank" rel="noopener noreferrer"><Github className="mx-2 xs"/></a>|
			<Link className="mx-2 xs" to={{pathname: "/Resume.pdf"}} target="_blank">Resume</Link>|
			<a href="https://www.linkedin.com/in/tim-harrold-02b249180/" target="_blank" rel="noopener noreferrer"><Linkedin className="mx-2"/></a>

			<p>timjharrold@gmail.com</p>
			<hr/> 


		<ListGroup className="d-none d-sm-block" defaultActiveKey="#link1">
	    <ListGroup.Item action href="/">
	      Mountains
	    </ListGroup.Item>
	    <ListGroup.Item action href="/conway">
	      Conway's Game of Life
	    </ListGroup.Item>
	    <ListGroup.Item action href="/maps">
	      Neat Visuals
	    </ListGroup.Item>
	  </ListGroup>




		</div>
		</Row>

		<Row className="justify-content-center mt-auto mb-3">		
			<Footer />

		</Row>

		</Col>


		<Col xs={0} md={10} usedwidth={usedWidth.current ? usedWidth.current.offsetWidth : 0} className="mx-0 px-0 d-none d-sm-block">

			<div id="switcher" className="position-absolute">
			</div>

		<Routes>
			<Route path='/' element={<Snow/>}/>
		    <Route path='/conway' element={<Conway/>}/>
			<Route path='/maps' element={<GraphController/>}/>
		</Routes>


		</Col>



</Row>






</Container>

  );
}

export default Home;
