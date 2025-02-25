const image = document.getElementById("cover"),
  title = document.getElementById("music-title"),
  artist = document.getElementById("music-artist"),
  currentTimeEl = document.getElementById("current-time"),
  durationEl = document.getElementById("duration"),
  progress = document.getElementById("progress"),
  playerProgress = document.getElementById("player-progress"),
  prevBtn = document.getElementById("prev"),
  playBtn = document.getElementById("play"),
  nextBtn = document.getElementById("next"),
  background = document.getElementById("bg-img"),
  lyricText = document.querySelector(".lyric-text"),
  lyricTitle = document.querySelector(".lyric-title");

const music = new Audio();

const songs = [
  {
    path: "assets/1.mp3",
    displayname: "The Charmer's Call",
    cover: "assets/1.jpg",
    artist: "Hanu Dixit",
  },
  {
    path: "assets/2.mp3",
    displayname: "You Will Never See Me Coming",
    cover: "assets/2.jpg",
    artist: "NEFFEX",
  },
  {
    path: "assets/3.mp3",
    displayname: "Intellect",
    cover: "assets/3.jpg",
    artist: "Yung Logos",
  },
  {
    path: "assets/4.mp3",
    displayname: "Ветрено/Холодно",
    cover: "assets/4.jpg",
    artist: "Markul",
    lyrics: `Там на другом конце провода, ветрено — холодно
    Танцы на костях. Это я тебе повод дал
    И в твоей груди всё разбито — расколотоТакой не найти на другом конце города
    На другом конце провода, ветрено — холодно
    Танцы на костях. Это я тебе повод дал
    И в твоей груди всё разбито — расколото
    Такой не найти на другом конце города
    На другом конце…
    Там на другом конце провода, ветрено — холодно
    Танцы на костях. Это я тебе повод дал
    И в твоей груди всё разбито — расколотоТакой не найти на другом конце города
    На другом конце провода, ветрено — холодно
    Танцы на костях. Это я тебе повод дал
    И в твоей груди всё разбито — расколото
    Такой не найти на другом конце города
    На другом конце…
    Там на другом конце провода, ветрено — холодно
    Танцы на костях. Это я тебе повод дал
    И в твоей груди всё разбито — расколотоТакой не найти на другом конце города
    На другом конце провода, ветрено — холодно
    Танцы на костях. Это я тебе повод дал
    И в твоей груди всё разбито — расколото
    Такой не найти на другом конце города
    На другом конце…
    Там на другом конце провода, ветрено — холодно
    Танцы на костях. Это я тебе повод дал
    И в твоей груди всё разбито — расколотоТакой не найти на другом конце города
    На другом конце провода, ветрено — холодно
    Танцы на костях. Это я тебе повод дал
    И в твоей груди всё разбито — расколото
    Такой не найти на другом конце города
    На другом конце…`,
  },
];

let musicIndex = 0;
let isPlaying = false;

function tooglePlay() {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}

function playMusic() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

function pauseMusic() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

function loadMusic(song) {
  music.src = song.path;
  title.textContent = song.displayname;
  artist.textContent = song.artist;
  image.src = song.cover;
  background.src = song.cover;
  lyricText.textContent = song.lyrics;
  lyricTitle.textContent = song.displayname;
}

function changeMusic(direction) {
  musicIndex = (musicIndex + direction + songs.length) % songs.length;
  loadMusic(songs[musicIndex]);
  playMusic();
  lyricTitle.classList.add('opacity')
}

function updateProgressBar() {
  const { duration, currentTime } = music;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  const formatTime = (time) => String(Math.floor(time)).padStart(2, "0");
  durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(
    duration % 60
  )}`;
  currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(
    currentTime % 60
  )}`;
}

function setProgressBar(e) {
  const width = playerProgress.clientWidth;
  const clickX = e.offsetX;
  music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener("click", tooglePlay);
prevBtn.addEventListener("click", () => changeMusic(-1));
nextBtn.addEventListener("click", () => changeMusic(1));
music.addEventListener("ended", () => changeMusic(1));
music.addEventListener("timeupdate", updateProgressBar);
playerProgress.addEventListener("click", setProgressBar);

loadMusic(songs[musicIndex]);
