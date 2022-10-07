import React, { useRef } from 'react';
import { Container, Row, Col, Image, ListGroup, Navbar, Nav } from 'react-bootstrap';
import { Github, Linkedin } from 'react-bootstrap-icons';
import './App.css';

import { Route, Routes, Link } from 'react-router-dom';
import Footer from "./Footer.jsx";
// import Dvd from "./Dvd.jsx";
import Snow from "./Snow.jsx";
import Conway from "./Conway.jsx";
import Sound from "./Sound.jsx"
import GHStats from "./visuals/coolviz/GHStats.jsx"
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

const usedHeight = useRef(null);

  return (

<Container className="h-100 pr-0" fluid>

{/*  <Routes>
		<Route exact path="/MusicGraph" render={() => {window.location.href="/projects/MusicGraph.html"}} />
	</Routes>*/}
	<Row ref={usedHeight} className="h-100 mr-0">
		<Col xs={12} sm={4} md={2} className="maxH d-flex transparent text-muted font-weight-light text-center flex-column">
		<Row className="justify-content-center">

			<Col xs={6} sm={12}>
				<Image rounded className="mt-3 w-75 align-items-center" id="profile" src="prof.png"/>
			</Col>

			<div className="px-3">
				
			<Col xs={12}>
			<p><br/>My name is Tim Harrold, and i'm a programmer / human being. Here are some of my projects, interests and hobbies</p>
			<hr/>


			<a href="https://github.com/timjhh" target="_blank" rel="noopener noreferrer"><Github className="mx-2 xs"/></a>|
			<Link className="mx-2 xs" to={{pathname: "/Resume.pdf"}} target="_blank">Resume</Link>|
			<a href="https://www.linkedin.com/in/tim-harrold-02b249180/" target="_blank" rel="noopener noreferrer"><Linkedin className="mx-2"/></a>

			<p>timjharrold@gmail.com</p>
			<hr/> 
			</Col>


		<ListGroup className="d-none d-sm-block" defaultActiveKey="#link1">
			<ListGroup.Item action href="/">
			Mountains
			</ListGroup.Item>
			<ListGroup.Item action href="/conway">
			Conway's Game of Life
			</ListGroup.Item>
			<ListGroup.Item action href="/sound">
			Sound
			</ListGroup.Item>
			{/* <ListGroup.Item action href="/maps">
			Neat Visuals
			</ListGroup.Item> */}
			<ListGroup.Item action href="/stats">
			Github User Stats
			</ListGroup.Item>
	  	</ListGroup>

		</div>
		</Row>

		<Row className="justify-content-center mt-auto mb-3">		
			
		</Row>

		</Col>


		<Col xs={0} sm={8} md={10} className="mx-0 px-0 pb-0 mb-0 d-none d-md-block w-100 h-100">

			<div id="switcher" className="position-absolute w-100 h-100">
			</div>
			{/* <Footer /> */}

		<Routes>
			<Route path='/' element={<Snow style={{"backgroundColor": "black"}}/>}/>
		    <Route path='/conway' element={<Conway style={{"backgroundColor": "black"}}/>}/>
			<Route path='/sound' element={<Sound style={{"backgroundColor": "black"}}/>}/>
			<Route path='/maps' element={<GraphController />}/>
			<Route path='/stats' element={<GHStats />}/>
		</Routes>


		</Col>



</Row>






</Container>

  );
}

export default Home;
