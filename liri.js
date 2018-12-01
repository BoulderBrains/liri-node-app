require("dotenv").config();
var axios = require("axios");
var keys = require("./keys");
var moment = require("moment");
var fs = require("fs");

var command = process.argv[2]
var completeCommand = process.argv;
var searchResult = "";
var artist = "";


switch (command) {
	// The case name triggers which function to run. 
	case "concert-this":
		concertSearch();
		break;

	case "spotify-this-song":
		songSearch();
		break;

	case "movie-this":
		movieSearch();
		break;

	case "do-what-it-says":
		followCommand();
		break;
}

// Bands in town
// TODO PUT IN MY API KEY
function concertSearch() {
	// "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

	for (var i = 3; i < completeCommand.length; i++) {
		searchResult += completeCommand[i]
		artist += (completeCommand[i] + " ");
	}

	artist = artist.slice(0, -1);

	var queryURL = "https://rest.bandsintown.com/artists/" + searchResult + "/events?app_id=" + keys.BIN.key;
	console.log(queryURL);

	if (searchResult === "") {
		console.log("You forgot to enter a band or artist name.");
	} else {
		axios.get(queryURL).then(
			function (response) {
				data = response.data
				dataLength = response.data.length

				if (dataLength > 0) {
					for (var b = 0; b < dataLength; b++) {

						console.log("======================")
						console.log("The venue is at " + data[b].venue.name);

						if (data[b].venue.region === "") {
							console.log("The location is at: " + data[b].venue.city + ", " + data[b].venue.country);
						} else {
							console.log("The location is at: " + data[b].venue.city + ", " + data[b].venue.region + ", " + data[b].venue.country);
						}

						date = new Date(data[b].datetime);

						var momentObj = moment(date);
						var momentString = momentObj.format('MM/DD/YYYY');

						console.log("The date is:", momentString);
						fs.appendFile("log.txt", JSON.stringify(data[b], null, 2), function (err) {
							if (err) {
								return console.log(err);
							}
						});
					}
					console.log("log.txt was updated!");
				} else {
					console.log("Uh oh, there doesn't look like there's any upcoming concerts from " + artist)
				}
			}
		).catch(function (error) {
			if (error.response) {
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.headers);
			} else if (error.request) {
				// If the request was made but no response was received
				// the `error.request` object comes back with details about the error
				console.log(error.request);
			} else {
				// Something happened in setting up the request that triggered an Error
				console.log("Error", error.message);
			}
			console.log(error.config);
		});
	}
}

function songSearch() {

}

function movieSearch() {

}

function followCommand() {

}