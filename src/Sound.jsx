import React, { useEffect } from 'react';
import { Container, Button, Form, Row, InputGroup, Col } from 'react-bootstrap';
import * as Tone from 'tone';
import './App.css';

import * as d3 from "d3";




function Home() {

	var start = false

	// Correctly start the simulation/audio
	const startRef = React.useRef(start);
	var isStarted = false;

	var now;
	var distinct = [];

	const subRef = React.useRef("all")

	const [subTemp, setSubTemp] = React.useState("all")
	const [subReddit, setSubReddit] = React.useState("all")

	var postTypes = ["Cross-post", "Text", "Video", "Image", "Other"]
	var postScale = d3.scaleOrdinal()
	.domain(postTypes)
	.range(["#519872", "#F17300", "#81A4CD", "#EFA8B8", "#ACFCD9"])

	// #519872 Green
	// #F17300 Orange
	// #81A4CD Blue
	// #EFA8B8 Pink
	// #ACFCD9 Mint

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
	// const tremolo = new Tone.Tremolo(9,0.75).toDestination().start()
	const compressor = new Tone.Compressor(-30, 2);


	synth.chain(reverb,vibrato,compressor, Tone.Destination)


	var before;

	//const modes = ['Major', 'Minor'];
	//const notes = ['A','A#','B','C','C#','D','D#','E','F','F#','G','G#'];
  
	// W - Whole step
	// H - Half step
	// 'Final' notes are omitted to avoid duplicates i.e. C major ends at B, not C
  
	// Major scales follow the pattern of W-W-H-W-W-W-H
	//const major = [0,2,4,5,7,9,11];
  
	// Minor scales follow the pattern of W-H-W-W-H-W-W
	//const minor = [0,2,3,5,7,8,10]; 

	var margin = {top: 20, right: 20, bottom: 20, left: 20},
	width = window.innerWidth*(10/12),
	height = window.innerHeight;
	

	async function initAudio(value) {

		startRef.current = value

		if(value && !isStarted) {
			await Tone.start().then(() => isStarted = true);
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

	function handleSubChange() {
		subRef.current = subTemp
		setSubReddit(subTemp)
	}

	function getPostType(post) {
		if(post.data.post_hint) {
			if(post.data.post_hint === "image") return "Image"
			if(post.data.post_hint === "link") return "Cross-post"
			if(post.data.post_hint.includes("video")) return "Video"
		}
		if(post.data.is_video) return "Video"
		if(post.data.crosspost_parent) return "Cross-post"
		if(post.data.is_self) return "Text"
		return "Other"
	}

	async function presentData() {

		var data = await getRedditData(before);

		if(!data) return
		if(data.length === 0) return;

		before = data[d3.maxIndex(data.map(d => d.data.created_utc))].data.name
		
		// Filter out any posts that are older than the newest post from the last query
		data = data.filter(d => d.data.created_utc >= now)

		if(data.length === 0) return;



		// Filter out any posts that are not distinct, prepend to distinct array and cut off older elements
		data = data.filter(d => !distinct.includes(d.data.name))
		distinct = [...data,...distinct]
		distinct.length = Math.min(100, distinct.length)

		// console.log("new distinct: " + counter + "\ntotal: " + distinct.length)
		// console.log("----")
		// console.log(data)
		// Update time frame to filter posts with the latest from this batch
		//data[d3.maxIndex(data.map(d => d.data.created_utc))]
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
			.attr("r", 20)
			.attr("fill", d => postScale(getPostType(d)))

			node.append("text")
			.attr("fill", "white")
			.attr("dx", 12)
			.attr("dy", -17)
			.text(d => d.data.subreddit_name_prefixed)

			node.append("text")
			.attr("fill", "white")
			.attr("dx", 22)
			.attr("dy", 0)
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
	}


	function handleErrors(response) {
		if (!response.ok) throw new Error(response.status);
		return response;
	}

	async function getRedditData(before) {


		// https://www.reddit.com/r/funny/comments.json?limit=1
		
		// +before?("&before="+before):""
		var link = "https://www.reddit.com/r/"+subRef.current+"/new.json?sort=new"+(before?("&before="+before):"")

		return await fetch(`https://api.allorigins.win/get?url=${link}`)
		.then(handleErrors)
		.then(async response => {

			const { contents } = await response.json();
			const feed = JSON.parse(contents)

			if(feed) {
				return feed.data.children
			}
		})
		.catch(error => console.log(error) );
	}

	function startTone() {

		if(!startRef.current) return;

		// Chords in D minor temporarily hardcoded in
		//const chords = [["D","F","A"],["E","G","A#"],["F","A","C"],["G","A#","D"]["A","C","E"],["A#","D","F"],["C","E","G"]]

		//const scale = ["D","E","F","G#","A","A#","C"]
		const scale = ["C","D","E","F","G","A","B"]
		//const scale = ["C", "E", "G", "F", "A"]


		let note = scale[Math.floor(Math.random()*scale.length)] + (Math.floor(Math.random() * 3)+2)
		//let notes = chords[num]
		//notes.forEach((d,idx) => notes[idx] += (Math.random() >= 0.5 ? "4" : "3"))
		
		let note_len = "4n"
		
		synth.triggerAttackRelease(note, note_len)

	}


	useEffect(() => {


		d3.select("#sound")
		.append("svg")
		.attr("position", "absolute")
		.attr("preserveAspectRatio", "xMinYMin meet")
		.attr("class", "svg-content-responsive svg-container")
		.attr("viewBox", "0 0 " + (width) + " " + (height))	
		.attr("width", width)
		.attr("height", height+margin.top+margin.bottom)
		.append("g")
		.attr("class", "main");

		now = (new Date().getTime() / 1000) - 120

		d3.interval(presentData, 2000)

		
	}, [])

  return (

<>
<Form>
      
</Form>
<div className="position-absolute bg-custom p-2" id="panel">
		<h2 className="pb-0 mb-0">Listen to Reddit</h2>
		{/* <Form.Label>Data</Form.Label>
		<Form.Select id="cptrns" size="sm" className="mx-2">
			<option value="posts">Posts</option>
			<option value="comments">Comments</option>
		</Form.Select> */}
		<Form.Check 
		className="mt-2"
		type="switch"
		id="custom-switch"
		label="Enable Sound"
		onChange={(e) => initAudio(e.target.checked)}
		/>

		<InputGroup>
			<Form.Control
			placeholder="subreddit"
			aria-label="all"
			aria-describedby="sub-input"
			value={subTemp}
			onChange={(e) => setSubTemp(e.target.value)}
			/>
			<Button onClick={handleSubChange} variant="dark" id="sub-submit">
			Submit
			</Button>
      </InputGroup>
	  <small>Current: r/{subReddit}</small>
	<Row>
		{postTypes.map((d,idx) => (
			<Col xs={6} key={"legend"+idx} className='mt-2'>
				<Row>
				<div className="ml-3 mr-1" style={{"width": "10%"}}>
				<div className="px-1 w-100" style={{"paddingBottom": "100%", "height": "0", "backgroundColor": postScale(d)}}><p className='m-0'>&nbsp;</p></div>
				</div>
				{d}
				</Row>
			</Col>
		))}
	</Row>
  </div>
<Container className="h-100 px-0 bg-dark" id="sound" fluid>

</Container>
</>

  );
}

export default Home;
