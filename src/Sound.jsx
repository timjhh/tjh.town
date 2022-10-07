import React, {useEffect, useState} from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import * as Tone from 'tone';
import './App.css';

import * as d3 from "d3";




function Home() {

	var start = false

	// Correctly start the simulation/audio
	const startRef = React.useRef(start);

	var now;
	var distinct = [];

	const synth = new Tone.PolySynth()

	const synthJSON = {
		"volume": 0,
		"detune": 0,
		"portamento": 60,
		"envelope": {
			"attack": 0.1,
			"attackCurve": "linear",
			"decay": 0.4,
			"decayCurve": "linear",
			"release": 1,
			"releaseCurve": "exponential",
			"sustain": 0.3
		},
		"oscillator": {
			"partialCount": 0,
			"partials": [],
			"phase": 0,
			"type": "sine"
		}
	}

	synth.set(synthJSON)

	const reverb = new Tone.Reverb(2);
	const vibrato = new Tone.Vibrato();
	const tremolo = new Tone.Tremolo(9,0.75).toDestination().start()
	const compressor = new Tone.Compressor(-30, 2);


	synth.chain(reverb,vibrato,compressor, Tone.Destination)


	var before;

	const modes = ['Major', 'Minor'];
	const notes = ['A','A#','B','C','C#','D','D#','E','F','F#','G','G#'];
  
	// W - Whole step
	// H - Half step
	// 'Final' notes are omitted to avoid duplicates i.e. C major ends at B, not C
  
	// Major scales follow the pattern of W-W-H-W-W-W-H
	const major = [0,2,4,5,7,9,11];
  
	// Minor scales follow the pattern of W-H-W-W-H-W-W
	const minor = [0,2,3,5,7,8,10]; 

	var margin = {top: 20, right: 20, bottom: 20, left: 20},
	width = window.innerWidth*(10/12),
	height = window.innerHeight;
	

	async function initAudio(value) {

		startRef.current = value

		if(value) {
			await Tone.start();
			console.log("Audio initialized");
		}
	  }


	function randX() {
		return Math.random()*width
	}
	function randY() {
		return Math.random()*height
	}
	function randTime() {
		return Math.random()*10000
	}

	async function presentData() {

		var data = await getRedditData(before);

		before = data[0].data.name

		// Filter out any posts that are older than the newest post from the last query
		data = data.filter(d => d.data.created_utc >= now)

		if(data.length === 0) return;


		var counter = 0;
		console.log(data)

		// Filter out any posts that are not distinct, prepend to distinct array and cut off older elements
		data = data.filter(d => !distinct.includes(d.data.name))
		distinct = [...data,...distinct]
		distinct.length = Math.min(100, distinct.length)

		counter += data.length

		// console.log("new distinct: " + counter + "\ntotal: " + distinct.length)
		// console.log("----")
		
		// Update time frame to filter posts with the latest from this batch
		now = data[0].data.created_utc

		var svg = d3.select(".main");
		svg.selectAll("circle")
		.data(data)
		.join((enter) => {
			let g = enter
			
			let node = g.append("g")
			.attr("transform", () => "translate(" + randX() + "," + randY() + ")")
			.attr("class", "node")
			.attr("opacity", 0)
			
			node.append("circle")
			.attr("r", 80)
			.attr("fill", "#519872")

			node.append("text")
			.attr("fill", "white")
			.attr("dx", -70)
			.attr("dy", "0em")
			.text(d => d.data.subreddit_name_prefixed)

			node.append("text")
			.attr("fill", "white")
			.attr("dx", -50)
			.attr("dy", "1em")
			.text(d => d.data.title)
			// .call(wrap, 200)

			node
			.transition()
			.duration(randTime)
			.transition()
			.duration(50)
			.attr("opacity", 0.8)
			.on("end", () => startTone())
			.transition()
			.duration(3000)
			.ease(d3.easeLinear)
			.attr('opacity', 0)
			.remove();

		})	

		// #519872 Green
		// #F17300 Orange
		// #81A4CD Blue

	}


	async function getRedditData(before) {

		// +before?("&before="+before):""
		const link = "https://www.reddit.com/r/all/new.json?sort=new"+(before?("&before="+before):"")
		const res = await fetch(`https://api.allorigins.win/get?url=${link}`)
		if(res) {
			const { contents } = await res.json();
			const feed = JSON.parse(contents)

			if(feed) {
				return feed.data.children
			}
		}
	}

	function startTone() {

		if(!startRef.current) return;

		// Chords in D minor temporarily hardcoded in
		const chords = [["D","F","A"],["E","G","A#"],["F","A","C"],["G","A#","D"]["A","C","E"],["A#","D","F"],["C","E","G"]]

		//const scale = ["D","E","F","G#","A","A#","C"]
		const scale = ["C","D","E","F","G","A","B"]


		// let svg = d3.select("#sound").select("g")

		// let rX = Math.random()*width;
		// let rY = Math.random()*height;


		// let sn = svg.append("rect")
		// .attr('x', rX)
		// .attr('y', -margin.top-rY)
		// .attr('width', 40)
		// .attr('height', 40)
		// .attr("fill", "red");

		//let num = Math.floor(Math.random()*chords.length)
		
		let note = scale[Math.floor(Math.random()*scale.length)] + (Math.floor(Math.random() * 3)+2)
		//let notes = chords[num]
		//notes.forEach((d,idx) => notes[idx] += (Math.random() >= 0.5 ? "4" : "3"))
		
		let note_len = "4n"
		
		synth.triggerAttackRelease(note, note_len)

		// sn.transition()
		// .duration(2500)
		// .ease(d3.easeLinear)
		// .on("end", () => synth.triggerAttackRelease(notes, note_len))
		// .attr('y', height+margin.top+margin.bottom)
		// .remove();	


	}


	useEffect(() => {


		const svg = d3.select("#sound")
		.append("svg")
		.attr("position", "absolute")
		.attr("preserveAspectRatio", "xMinYMin meet")
		.attr("class", "svg-content-responsive svg-container")
		.attr("viewBox", "0 0 " + (width) + " " + (height))	
		.append("g")
		.attr("class", "main");

		now = new Date().getTime() / 1000

		d3.interval(presentData, 3000)

		
	}, [])

	// Mike Bostock's text wrap method
	function wrap(text, width) {
		text.each(function() {
		  var text = d3.select(this),
			  words = text.text().split(/\s+/).reverse(),
			  word,
			  line = [],
			  lineNumber = 0,
			  lineHeight = 1.1, // ems
			  y = text.attr("y"),
			  dy = parseFloat(text.attr("dy")),
			  tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em")
		  while (word = words.pop()) {
			line.push(word)
			tspan.text(line.join(" "))
			if (tspan.node().getComputedTextLength() > width) {
			  line.pop()
			  tspan.text(line.join(" "))
			  line = [word]
			  tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", `${++lineNumber * lineHeight + dy}em`).text(word)
			}
		  }
		})
	  }

  return (

<>
<Form>
      <Form.Check 
	  	className="mt-2"
        type="switch"
        id="custom-switch"
        label="Enable Sound"
		onChange={(e) => initAudio(e.target.checked)}
      />
</Form>
<hr/>	
<Container className="h-100 px-0 bg-dark" id="sound" fluid>

</Container>
</>

  );
}

export default Home;
