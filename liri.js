require("dotenv").config();

var axios = require("axios");
var request = require("request");
var moment = require("moment");
var fs = require("fs");
var keys = require("./keys");

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
	default: console.log("Function you entered, not found. Try again.");
}

// Bands in town
// node liri.js concert-this
function concertSearch() {
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
					console.log("======================")
					console.log(artist + " has these upcoming shows:")
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
					console.log("There are no upcoming concerts from " + artist + ". Go listen to the album on Spotify.");
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

	// if user doesn't search a movie, look for the movie
	// Mr. Nobody

	//Title, Year released, IMDB Rating, Rotten Tomatoes Rating, country produced, language, plot, actors (top 5?)

	// Store all of the arguments in an array
	var nodeArgs = process.argv;

	// Create an empty variable for holding the movie name
	var movieName = "";

	// Loop through all the words in the node argument
	// And do a little for-loop magic to handle the inclusion of "+"s
	for (var i = 2; i < nodeArgs.length; i++) {
		if (i > 2 && i < nodeArgs.length) {
			movieName = movieName + "+" + nodeArgs[i];
		} else {
			movieName += nodeArgs[i];
		}
	}

	// Then run a request to the OMDB API with the movie specified
	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

	// This line is just to help us debug against the actual URL.
	console.log(queryUrl);
	console.log(response);

	request(queryUrl, function (error, response, body) {

		// If the request is successful
		if (!error && response.statusCode === 200) {

			// Parse the body of the site and recover just the imdbRating
			// (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
			console.log("Release Year: " + JSON.parse(body).Year);
		}
	});
}

function followCommand() {

}