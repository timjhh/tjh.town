import React from 'react';
import {Container, Row, Col, Button, Image} from 'react-bootstrap';
import { Github, Linkedin } from 'react-bootstrap-icons';
import './App.css';
import { Link } from 'react-router-dom';
import Footer from "./Footer.jsx";
import Dvd from "./Dvd.jsx";
import Snow from "./Snow.jsx"



function Home() {
  return (

<Container style={{'height': '100vh'}} fluid className="d-flex">
	<Row>
		<Col xs={12} md={2} className="ml-0 pl-0 text-muted font-weight-light text-center">
			<Image className="d-flex w-100" id="profile" src="prof.png"/>
			
			<p><br/>My name is Tim Harrold(he/them), and i'm an aspiring programmer / human being. Here are some of my projects, interests and hobbies</p>
			<hr/>

			<a href="https://github.com/timjhh" target="_blank" rel="noreferrer"><Github className="mx-2 xs"/></a>|
			<a href="resume.pdf" className="mx-2">Resume</a>|
			<a href="https://www.linkedin.com/in/tim-harrold-02b249180/" target="_blank" rel="noreferrer"><Linkedin className="mx-2"/></a>

			<p>timjharrold@gmail.com</p>
			<hr/>		
			<Footer/>

		</Col>


		<Col xs={12} md={10}>


		</Col>



</Row>






</Container>

  );
}

export default Home;
