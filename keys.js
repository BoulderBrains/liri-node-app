console.log('this is loaded');

exports.BIN = {
	key: process.env.BIN_KEY
}

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

exports.OMDB = {
	key: process.env.OMDB_KEY
}