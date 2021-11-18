import React, { useEffect } from 'react';
import $ from 'jquery';
import {Image, Placeholder, Card} from 'react-bootstrap';
import axios from 'axios';

function Music() {

	const date = new Date().toLocaleString();
	var song;
	var timestamp;
	var artist;
	var album;
	var diff;
	var cover;
	var fmBox;
	var diff;

	useEffect(() => {
		const fmData = fmArtists("chiefton117").then(d => {

		if(d) {


		song = d.recenttracks.track[0];
		timestamp = d.recenttracks.track.find(e => e.date != null).date.uts;
		artist = song.artist["#text"];
		album = song.album["#text"];


		// Time difference in seconds
		diff = getTime(Math.floor(((Date.now()/1000) - parseInt(timestamp))));

		fmBox = $(".music");
		$(".cover").attr("src", cover);

		cover = song.image.find(d => d.size === "large")["#text"];



		}


		});




	});

	









	return (
			<>
			<Card className="card-horizontal w-100">
				<Image src="" className="img-responsive mr-0"/>
				<div className="card-body">
				{song ? (
					<>
					<p>Song: {song.name}<br/>Artist: {artist}<br/>Album: {album}</p>
					<p className="card-text" id="when">Logged {diff} ago</p>
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


				</div>
			</Card>
			<div className="card-footer text-center">
				<small className="date">Last Updated {date}</small>
			</div>

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
	async function fmArtists(username) {

		axios
		.get("http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=" + username + "&api_key=943bdddf5707846447a81b95edae1537&limit=1&format=json")
		.then(response => {
			console.log(response.data);
		    return response.data;
		})
		.catch(function(error) {
		    console.log(error);
		});

	  	// return $.ajax({
	   //      dataType: 'json',
	   //      async: false,
	   //      url: 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=' + username + '&api_key=943bdddf5707846447a81b95edae1537&limit=1&format=json'
	   //    });
	}
	function fmTrack(tmbid, ambid) {
		return $.ajax({
			dataType: 'json',
			async: false,
			//url : 'http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=943bdddf5707846447a81b95edae1537&artist=' + ambid + '&track=' + tmbid + '&format=json'
			
			url: 'http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=943bdddf5707846447a81b95edae1537&format=json&mbid=' + tmbid

			//url : 'http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=943bdddf5707846447a81b95edae1537&artist=' + ambid + '&track=' + tmbid + '&format=json'
		});
	}
	function mbTrack(mbid) {
		return $.ajax({
			async: false,
			url: 'https://musicbrainz.org/ws/2/recording/' + mbid + '?inc=aliases+artist-credits+releases&fmt=json'
		});
	}
export default Music;