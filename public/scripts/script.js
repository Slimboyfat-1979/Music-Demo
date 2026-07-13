"use strict";

const audio = document.querySelector(".audio");
const playBtn = document.querySelector("#playIcon");
const backwardBtn = document.querySelector(".backward-btn");
const forwardBtn = document.querySelector(".forward-btn");
const songs = [
  "dreams",
  "standback",
  "gypsy",
  "sara"
];

const progressContainer = document.querySelector('.progress-container'); 
const songTitle = document.querySelector('.song-titles h3');

/* Code for player */

let SONG_URL = "./assets/music/";
let songIndex = 0;
let playingState = false;
let songUrl = `${SONG_URL}${songs[songIndex]}.m4a`;



playBtn.addEventListener('click', () => {
    let songPlayingUrl = SONG_URL + songs[songIndex] + '.m4a';
    playingState = !playingState;

    showSong();

    if(audio.getAttribute('src') === '') {
        audio.setAttribute('src', songPlayingUrl);
    }

    playingState ? playBtn.className = 'fa solid fa-pause' : playBtn.className = 'fa solid fa-play';
    !playingState ? audio.pause() : audio.play();

    audio.addEventListener('timeupdate', (e) => {
        const {duration, currentTime} = e.target;
        const progressPercent = (currentTime / duration) * 100;
        document.querySelector('.progress-bar').style.width = `${progressPercent}%`;
    })
})

forwardBtn.addEventListener('click', () => {
    songIndex++;
    if(songIndex === songs.length) {
       songIndex = 0;
    }

    if(playingState) {
        audio.setAttribute('src', SONG_URL + songs[songIndex] + '.m4a');
        audio.play(); 
        showSong();
    }
})

backwardBtn.addEventListener('click', () => {
    songIndex--;
    if(songIndex < 0) {
        songIndex = songs.length - 1;
    }

    if(playingState) {
        audio.setAttribute('src', SONG_URL + songs[songIndex] + '.m4a');
        audio.play();
        showSong();   
    }
})

function showSong() {
    songTitle.textContent = songs[songIndex];
}

progressContainer.addEventListener('click', function(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
})

const parallaxChild = document.querySelector('.parallax-child');

// window.addEventListener('scroll', () => {
//   const scrollPosition = window.scrollY;
//   parallaxChild.style.transform = `translateZ(-1px) scale(2) translateY(${scrollPosition * 0.5}px)`;
// });

/* Code for player end */
//Menu Nav Click

const hamburger = document.querySelector(".hamburger");
const mobileNav = document.querySelector("#mobile-nav");
const navContainer = document.querySelector('.nav-container');
let openedMenu = false;

hamburger.addEventListener('click', toggleMenu);

function toggleMenu() {
    openedMenu = !openedMenu;
    if(openedMenu) {
       mobileNav.style.animationName = 'growMenu';
       mobileNav.style.animationPlayState = 'running';
       mobileNav.addEventListener('animationend', function() {
        if(openedMenu){
            navContainer.style.display = 'block';
            document.querySelector('.nav-container ul').classList.add('show');
        }   
       })
    }else{
        mobileNav.style.animationName = 'shrinkMenu';
        navContainer.style.display = 'none';
    }
}



//Code for smooth scrolling

const menuLinks = document.querySelectorAll('#desktop-nav ul li a');


menuLinks.forEach(link => {
    // console.log(link.getAttribute('href'));
    link.addEventListener('click', (e) => {
        e.preventDefault();
       
        const target = document.querySelector(link.getAttribute('href'));
        console.log(target);

        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    })
})




