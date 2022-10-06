import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import {Image, Placeholder, Card} from 'react-bootstrap';
import axios from 'axios';

function Music() {

	const date = new Date().toLocaleString();
	const [reRender, setReRender] = useState(0);
	const [song, setSong] = useState(null);

	// var timestamp;
	// var artist;
	// var album;
	// var diff;
	var cover;


	function forceUpdate() {

		return setReRender(d => d+1);
	}

	useEffect(() => {
		fmArtists("chiefton117").then(d => {

		// Code for top track
		if(d) {


			let curr = d.toptracks.track[0];
			//let timestamp = d.toptracks.track.find(e => e.date != null).date.uts;
	
			// getTrackByMBID(curr.mbid).then(e => {



			// 	let currSong = {
			// 		title: curr.name,
			// 		playcount: curr.playcount,
			// 		artist: curr.artist.name,
			// 		album: curr.album["#text"]
			// 		//diff: getTime(Math.floor(((Date.now()/1000) - parseInt(timestamp))))
			// 	}

			// 	setSong(currSong);

			// 	forceUpdate();

			// })

			getTrackByNames(curr.artist.name, curr.name).then(e => {

				if(e) {


					let currSong = {
						title: curr.name,
						playcount: curr.playcount,
						artist: curr.artist.name,
						album: e.track.album.title,
						link: e.track.url
						//diff: getTime(Math.floor(((Date.now()/1000) - parseInt(timestamp))))
					}

					setSong(currSong);

				} else { // Track not found

					setSong({
						title:"Error: Track Not Found",playcount:0,artist:"",album:""
					})


				}



				forceUpdate();

			})



		// Code for most recent track
		// if(d) {

		// let curr = d.recenttracks.track[0];
		// let timestamp = d.recenttracks.track.find(e => e.date != null).date.uts;

		// let currSong = {
		// 	title: curr.name,
		// 	artist: curr.artist["#text"],
		// 	album: curr.album["#text"],
		// 	diff: getTime(Math.floor(((Date.now()/1000) - parseInt(timestamp))))
		// }





		}


		}).catch(err => console.log(err));



	}, []);

	

	return (
			<>
			<Card style={{"background-color": "rgba(83,60,112,1)"}} className='text-white'>
				<Card.Header className='my-0 py-1'>Top Track This Week</Card.Header>
				<Image src="" className="img-responsive mr-0"/>
				<Card.Body>
				{song ? (
					<>
					<span className='my-0 py-0'>
					<p className='my-0 py-0'>Name: {song.title}</p>
					<p className='my-0 py-0'>Artist: {song.artist}</p>
					<p className='my-0 py-0'>Album: {song.album}</p>
					<p className='my-0 py-0'>Playcount: {song.playcount}</p>
					[<a className='small text-info' rel="noreferrer" target="_blank" href={song.link}>Link</a>]
					</span>
					
					
					{/* <p className="card-text" id="when">Logged {song.diff} ago</p> */}
					</>
					) : (
					<>
					  <Placeholder as={Card.Title} animation="glow">
					    <Placeholder xs={6} />
					  </Placeholder>
					        <Placeholder as={Card.Text} animation="glow">
					    <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
					    <Placeholder xs={6} /> <Placeholder xs={8} />
					  </Placeholder>
					  <Placeholder.Button variant="primary" xs={8} />
					</>
					)


			}


				</Card.Body>
			</Card>
			<Card className="card-footer text-center">
				<small className="date">Last Updated {date}</small>
			</Card>

			</>

		)

}




	
	// Converts seconds to a string of days + hours + minutes
	function getTime(utc) {
		
		var minutes = Math.floor(utc/60) % 60;
		var hours = Math.floor(utc/3600) % 24;
		var days = Math.floor(utc/86400);

		var time = "";
		
		time = time + 
		(days > 0 ? days + " d, " : "") +
		(hours > 0 ? hours + " h, " : "") + 
		(minutes > 0 ? minutes + " m" : "");

		return time;

	}
	async function getTrackByMBID(mbid) {
		const response = await axios("https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=943bdddf5707846447a81b95edae1537&mbid="+ mbid +"&format=json")
		return await response.data;
	}
	async function getTrackByNames(artist,track) {
		const response = await axios("https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=943bdddf5707846447a81b95edae1537&track=" + track + "&artist="+ artist +"&format=json")
		return await response.data;	
	}
	async function fmArtists(username) {

		// Most recent track
		// const response = await axios("https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=" + username + "&api_key=943bdddf5707846447a81b95edae1537&limit=1&format=json");
		
		// Top track(adjustable date - 7 day chosen)
		const response = await axios("https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=" + username + "&period=7day&api_key=943bdddf5707846447a81b95edae1537&format=json");

		

		return await response.data;

	}
	// function fmTrack(tmbid, ambid) {
	// 	return $.ajax({
	// 		dataType: 'json',
	// 		async: false,
	// 		//url : 'http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=943bdddf5707846447a81b95edae1537&artist=' + ambid + '&track=' + tmbid + '&format=json'
			
	// 		url: 'https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=943bdddf5707846447a81b95edae1537&format=json&mbid=' + tmbid

	// 		//url : 'http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=943bdddf5707846447a81b95edae1537&artist=' + ambid + '&track=' + tmbid + '&format=json'
	// 	});
	// }
	// function mbTrack(mbid) {
	// 	return $.ajax({
	// 		async: false,
	// 		url: 'https://musicbrainz.org/ws/2/recording/' + mbid + '?inc=aliases+artist-credits+releases&fmt=json'
	// 	});
	// }
export default Music;