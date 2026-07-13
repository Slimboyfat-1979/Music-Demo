console.log("helloe")

const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

//Song Titles
const songs = ['upbeat', 'dancing', 'flamenco'];

//Keep track of song
let songIndex = 0;

//Initially load song details into dom
loadSong(songs[songIndex]);

//Update song details

function loadSong(song) {
    title.textContent = song;
    audio.src = `assets/music/${song}.mp3`;
    cover.src = `assets/music/images/${song}.jpg`;
}

//Play Song

function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fa-solid').classList.remove('fa-play');
    playBtn.querySelector('i.fa-solid').classList.add('fa-pause');

    audio.play();    
}

function pauseSong() {
    // musicContainer.classList.remove('play');
    // playBtn.querySelector('i.fas').classList.add('fa-pause');
    // playBtn.querySelector('i.fas').classList.remove('fa-play');
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fa-solid').classList.add('fa-play');
    playBtn.querySelector('i.fa-solid').classList.remove('fa-pause');
    audio.pause();
}

function prevSong() {
    songIndex--;
    if(songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function nextSong() {
    songIndex++;
    if(songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex])
    playSong()
}

function updateProgress(e) {
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`
}

//Event Listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');
    if(isPlaying) {
        pauseSong();
    }else{
        playSong();
    }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

//Time Song Update

audio.addEventListener('timeupdate', updateProgress);

//Click On Progress Bar
progressContainer.addEventListener('click', function(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
});

//Song ends

audio.addEventListener('ended', nextSong);


