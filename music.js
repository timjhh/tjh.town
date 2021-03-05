$(document).ready(function() {

	var song;
	fmArtists("chiefton117").done(function(d) {
		var tracks = d.recenttracks.track;
		console.log(tracks);
		if(tracks.length > 1) { // Iterate backwards to find the most recent track
			for(var i = tracks.length-1; i >= 0; i--) {
				if(tracks[i].date) song = tracks[i];
			}
		} else song = tracks[0];
	});
	console.log(song);

	//fmTrack(song.mbid, song.artist.mbid).done(function(d) {
	//	console.log(d);
	//});

	var cover = song.image[2]["#text"];
	var artist = song.artist["#text"];
	var album = song.album["#text"];

	//var date = song.date ? song.date["#text"] : 0;

	// Time difference in seconds
	var diff = Math.floor(Date.now()/1000) - parseInt(song.date.uts, 10);
	

	//const fmBox = document.querySelector(".music");
	var fmBox = $(".music");
	$(".cover").attr("src", cover);

	fmBox.text(
	"Song: " + song.name + "\n" +
	"Artist: " + artist + "\n" +
	"Album: " + album + "\n");

	$("#when").text(function() {
		return "Logged: " + getTime(diff) + " ago";
	});

	var d = new Date();
	$(".date").text("Last Updated " + 
	d.toLocaleString());

});

	
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
	function fmArtists(username) {
	  	return $.ajax({
	        dataType: 'json',
	        async: false,
	        url: 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=' + username + '&api_key=943bdddf5707846447a81b95edae1537&limit=1&format=json'
	      });
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