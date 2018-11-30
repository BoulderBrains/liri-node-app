require("dotenv").config();
var axios = require("axios");
var keys = require("keys");


switch (action) {
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

}

function songSearch() {

}

function movieSearch() {

}

function followCommand() {

}


// access spotify api keys:
// var spotify = new Spotify(keys.spotify);

var nodeArgs = process.argv;

// Create an empty variable for holding the movie name
var movieName = "";

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 2; i < nodeArgs.length; i++) {

	if (i > 2 && i < nodeArgs.length) {
		movieName = movieName + "+" + nodeArgs[i];
	}
	else {
		movieName += nodeArgs[i];

	}
}

// Then run a request with axios to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// This line is just to help us debug against the actual URL.
console.log(queryUrl);

axios.get(queryUrl).then(
	function (response) {
		console.log("Release Year: " + response.data.Year);
	}
);