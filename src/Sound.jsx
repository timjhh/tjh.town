import React, {useEffect} from 'react';
import { Container, Button } from 'react-bootstrap';
import * as Tone from 'tone';
import './App.css';

import * as d3 from "d3";




function Home() {

	var start = false

	// Correctly start the simulation/audio
	const startRef = React.useRef(start);


	const synth = new Tone.PolySynth()

	const reverb = new Tone.Reverb(2);
	const delay = new Tone.PingPongDelay("8n", 0.2);
	const env = new Tone.Envelope(0.4);
	const vibrato = new Tone.Vibrato();
	const tremolo = new Tone.Tremolo(9,0.75).toDestination().start()
	const compressor = new Tone.Compressor(-30, 2);


	//let synth = new Tone.MembraneSynth()
	


	synth.chain(tremolo,reverb, Tone.Destination)


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
	height = window.outerHeight;
	

	async function initAudio() {

		if(startRef.current) {
		  startRef.current = startRef.current;
		} else {
		await Tone.start();
		startRef.current = true;
		console.log("Audio initialized");
		
		d3.interval(presentData, 3000)

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
		console.log(data)
		before = data.length > 0
		? data[data.length-1].data.name
		: null

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
			.attr("dx", -50)
			.attr("dy", "0em")
			.text(d => d.data.subreddit_name_prefixed)

			node.append("text")
			.attr("fill", "white")
			.attr("dx", -50)
			.attr("dy", "1em")
			.text(d => d.data.title)

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
		const link = "https://www.reddit.com/r/all/new/.json?sort=new"+(before?("&before="+before):"")
		console.log(link)
		const res = await fetch(`https://api.allorigins.win/get?url=${link}`);
		const { contents } = await res.json();
		const feed = JSON.parse(contents)

		if(feed) {
			return feed.data.children
		}
	}

	function startTone() {

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
		
		let note = scale[Math.floor(Math.random()*scale.length)] + (Math.random() >= 0.5 ? "4" : "3")
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
		.attr("viewBox", "0 0 " + (width) + " " + (height+margin.bottom+margin.top))	
		.append("g")
		.attr("class", "main");

		
	}, [])




  return (

<>
<Button style={{'position': 'absolute'}} variant="primary" onClick={initAudio}>Start</Button>
<hr/>	
<Container className="h-100 pr-0 bg-dark" id="sound" fluid>

</Container>
</>

  );
}

export default Home;
