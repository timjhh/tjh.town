import React, { useRef, useState } from 'react';
import { Container, Row, Col, Button, Image, Offcanvas } from 'react-bootstrap';
import { Github, Linkedin } from 'react-bootstrap-icons';
import './App.css';
import { Link } from 'react-router-dom';
import Footer from "./Footer.jsx";
import Dvd from "./Dvd.jsx";
import Snow from "./Snow.jsx"
import Conway from "./Conway.jsx"




function Home() {

const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

const style = {
	overlay: {
		background: "none"
	},
	content: {
		//background: "rgba(255, 255, 4, 1)",
		background: "rgba(220, 220, 220, 1)",
		//background: "#FFFFFF",
		minWidth: "25%"
	}
}

const usedWidth = useRef(null);

  return (

<Container fluid>
	<Row ref={usedWidth}>
		<Col xs={12} md={2} className="d-flex transparent text-muted font-weight-light text-center flex-column">
		<Row className="justify-content-center">
			<Image rounded className="mt-3 w-75 align-items-center" id="profile" src="prof.png"/>
			
			<div className="px-3">
			<p><br/>My name is Tim Harrold(he/them), and i'm an aspiring programmer / human being. Here are some of my projects, interests and hobbies</p>
			<hr/>

			<a href="https://github.com/timjhh" target="_blank" rel="noreferrer"><Github className="mx-2 xs"/></a>|
			<Link className="mx-2 xs" to={{pathname: "/Resume.pdf"}} target="_blank">Resume</Link>|
			<a href="https://www.linkedin.com/in/tim-harrold-02b249180/" target="_blank" rel="noreferrer"><Linkedin className="mx-2"/></a>

			<p>timjharrold@gmail.com</p>
			<hr/> 

		</div>
		</Row>

		<Row className="justify-content-center mt-auto mb-3">		
			<Footer />

		</Row>

		</Col>


		<Col xs={12} md={10} usedwidth={usedWidth.current ? usedWidth.current.offsetWidth : 0} className="mx-0 px-0 d-none d-sm-block">

{/*			<Snow />*/}
			<Conway />

		</Col>



</Row>






</Container>

  );
}

export default Home;
