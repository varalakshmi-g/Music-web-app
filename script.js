document.addEventListener('DOMContentLoaded', function () {
    const audioPlayer = document.getElementById('audio-player');
    const playBtn = document.getElementById('play-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const seekBar = document.getElementById('seek-bar');
    const songList = document.getElementById('song-list');

    let currentSongIndex = 0;
    let songs = ['song1.mp3', 'song2.mp3', 'song3.mp3']; // Add your song URLs here

    // Display the playlist
    songs.forEach((song, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Song ${index + 1}`;
        listItem.addEventListener('click', () => playSong(index));
        songList.appendChild(listItem);
    });

    function playSong(index) {
        currentSongIndex = index;
        audioPlayer.src = songs[index];
        audioPlayer.play();
    }

    playBtn.addEventListener('click', () => audioPlayer.play());
    pauseBtn.addEventListener('click', () => audioPlayer.pause());

    audioPlayer.addEventListener('timeupdate', () => {
        const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        seekBar.value = percent;
    });

    seekBar.addEventListener('input', () => {
        const seekTime = (seekBar.value / 100) * audioPlayer.duration;
        audioPlayer.currentTime = seekTime;
    });

    audioPlayer.addEventListener('ended', () => {
        // Play the next song when the current song ends
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        playSong(currentSongIndex);
    });
});
