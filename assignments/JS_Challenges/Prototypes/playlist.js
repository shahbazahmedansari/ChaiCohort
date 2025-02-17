// You need to implement the Playlist constructor function and its prototype method

function Playlist() {
    // Initialize songs property
    this.songs = [];
}

// Define addSong method on Playlist's prototype
Playlist.prototype.addSong = function (song) {
    this.songs.push(song);
};

const playlist = new Playlist();
playlist.addSong("Tum Hi Ho - Aashique 2");
playlist.addSong("Sunn Raha Hai - Aashique 2");
console.log(playlist.songs);
