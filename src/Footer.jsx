import React from 'react';

import './App.css';
import Music from "./Music.jsx";

function Footer() {
  return (

	<div className='position-absolute mr-2' style={{ right: 0, bottom: 0 }}>
		<div className="mh-100">
				<Music />
		</div>
	</div>

  );
}

export default Footer;
