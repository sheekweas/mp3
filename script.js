let audioPlayer = document.getElementById('audio-player');
let fileInput = document.getElementById('file-input');
let playlist = [];
let currentSongIndex = 0;

function playPause() {
    if (audioPlayer.paused) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }
}

function playNext() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    playCurrentSong();
}

function playPrev() {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    playCurrentSong();
}

function playCurrentSong() {
    const currentSong = playlist[currentSongIndex];
    if (currentSong) {
        audioPlayer.src = currentSong.url;
        audioPlayer.play();
    }
}

function updatePlaylistUI() {
    const playlistElement = document.getElementById('playlist');
    playlistElement.innerHTML = '';

    for (let i = 0; i < playlist.length; i++) {
        const listItem = document.createElement('li');
        listItem.textContent = playlist[i].name; // использование оригинального названия файла
        listItem.addEventListener('click', function () {
            currentSongIndex = i;
            playCurrentSong();
        });
        playlistElement.appendChild(listItem);
    }
}

fileInput.addEventListener('change', function () {
    const files = fileInput.files;
    playlist = [];
    for (const file of files) {
        const objectURL = URL.createObjectURL(file);
        playlist.push({ url: objectURL, name: file.name });
    }
    if (playlist.length > 0) {
        currentSongIndex = 0;
        playCurrentSong();
    }
    updatePlaylistUI();
});

audioPlayer.addEventListener('ended', function () {
    playNext();
});


$('.input-file input[type=file]').on('change', function(){
	let file = this.files[0];
	$(this).closest('.input-file').find('.input-file-text').html(file.name);
});
