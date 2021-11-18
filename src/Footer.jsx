import React from 'react';
import {Container, Row, Col, Button, Navbar} from 'react-bootstrap';
import './App.css';
import Music from "./Music.jsx";

function Footer() {
  return (
//	<Row  style={{position: "absolute", bottom: "0px", top: "100%", flexWrap: "nowrap"}}>
//className="position-absolute bottom-0"
// className="d-flex flex-column  flex-nowrap" 

		<div className="transparent mx-auto">
			<h6 className="card-title text-center">What am I listening to?</h6>
				<Music />
		</div>

  );
}

export default Footer;
