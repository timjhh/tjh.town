import React, { useRef } from 'react';
import {Container, Row, Col, Button, Image} from 'react-bootstrap';
import { Github, Linkedin } from 'react-bootstrap-icons';
import './App.css';
import { Link } from 'react-router-dom';
import Footer from "./Footer.jsx";
import Dvd from "./Dvd.jsx";
import Snow from "./Snow.jsx"



function Home() {

const usedWidth = useRef(null);

  return (

<Container style={{'height': '100vh'}} fluid className="d-flex">
	<Row ref={usedWidth}>
		<Col xs={12} md={2} className="transparent text-muted font-weight-light text-center">
		<Row className="d-block">
			<Image className="d-flex w-100" id="profile" src="prof.png"/>
			
			<div className="px-3">
			<p><br/>My name is Tim Harrold(he/them), and i'm an aspiring programmer / human being. Here are some of my projects, interests and hobbies</p>
			<hr/>

			<a href="https://github.com/timjhh" target="_blank" rel="noreferrer"><Github className="mx-2 xs"/></a>|
			<Link className="mx-2 xs" to={{pathname: "/Resume.pdf"}} target="_blank">Resume</Link>|
			<a href="https://www.linkedin.com/in/tim-harrold-02b249180/" target="_blank" rel="noreferrer"><Linkedin className="mx-2"/></a>

			<p>timjharrold@gmail.com</p>
			<hr/>
			<a href="./MusicGraph/MusicGraph.html">Music Graph</a>
		</div>
		</Row>
		<Row className="d-inline-block">		
			<Footer />
		</Row>

		</Col>


		<Col xs={12} md={10} usedwidth={usedWidth.current ? usedWidth.current.offsetWidth : 0} className="mx-0 px-0 d-none d-sm-block">

			<Snow />

		</Col>



</Row>






</Container>

  );
}

export default Home;
