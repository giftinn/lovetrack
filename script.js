function selectProfile(name){
  document.getElementById("profileSelect").style.display="none";
  document.getElementById("welcomeScreen").classList.remove("hidden");
  document.getElementById("welcomeText").innerText="selamat menuju salting, "+name+"!";
}

function enterAbout(){
  document.getElementById("welcomeScreen").classList.add("hidden");
  document.getElementById("aboutPage").classList.remove("hidden");
}

/* ================= LETTER PAGE ================= */

function goToLetter(){
  document.getElementById("aboutPage").classList.add("hidden");

  const letterPage = document.getElementById("letterPage");
  letterPage.classList.remove("hidden");
  letterPage.classList.add("active"); // INI PENTING

  startTyping();
}

const text = `
Makasih ya? Makasih udah mau nemenin aku sampai detik ini juga, aku bersyukur bertemu kamu. Kamu tau? disetiap langkah atau harimu selalu penuh warna karna kamu itu indah, biarlah kamu bilang kamu "ngga sempurna" tapi dimataku kamu jauh lebih sempurna. Sayang, jangan ragu untuk cerita atau apapun itu ya? Karna aku always disini buat dengerin kamu, buat nemenin kamu disaat susah dan senang.

Kadang Terbesit dipikiran aku, kenapa kamu bisa sebucin ini sama aku but disisi lain aku juga senang. Aku senang banget mendapatkan cinta kamu seutuhnya, makasih ya?  Aku lega tau kamu udah ngga ada perasaan apapun ke mantanmu dan makasih ya? Udah klarifikasi disetiap keributan kita 😭😭😭 ☝🏼

Bulan aja kalah indahnya sama kamu, jangan lupa untuk jaga diri kamu sendiri ya? Utamakan diri kamu lalu orang lain, karna aku ngga mau kamu terluka atau apapun itu. Aku sayang abang, aku ngga mau Abang sampai kenapa-kenapa. Abang sayang aku ngga pernah menyesal bertemu Abang ❤️❤️ i love you so muchh
`;

let i = 0;
let typingStarted = false;

function startTyping(){
  if(typingStarted) return;
  typingStarted = true;

  const typingDiv = document.getElementById("typingText");
  typingDiv.innerHTML = "";
  i = 0;

  function type(){
    if(i < text.length){
      typingDiv.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, 25);
    }
  }
  type();
}

/* ================= PLAYLIST PAGE ================= */

function goToPlaylist(){

  // sembunyikan semua page
  document.querySelectorAll(".page").forEach(page=>{
    page.classList.add("hidden");
    page.classList.remove("active");
  });

  // tampilkan playlist
  const playlist = document.getElementById("playlistPage");
  playlist.classList.remove("hidden");
  playlist.classList.add("active");

}


const audio = document.getElementById("audioPlayer");
const songs = document.querySelectorAll(".song-item");
const playPauseBtn = document.getElementById("playPauseBtn");
const progressBar = document.getElementById("progressBar");
const currentTimeEl = document.getElementById("currentTime");
const totalDurationEl = document.getElementById("totalDuration");

let currentSongIndex = 0;

function formatTime(seconds){
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return mins + ":" + (secs < 10 ? "0" + secs : secs);
}

function togglePlay(){

  // kalau belum ada lagu sama sekali
  if(!audio.src){
    playSong(0);
    return;
  }

  if(audio.paused){
    audio.play();
  } else {
    audio.pause();
  }

}


// ================= NEXT =================
function nextSong(){

  currentSongIndex++;

  if(currentSongIndex >= songs.length){
    currentSongIndex = 0;
  }

  playSong(currentSongIndex);

}

function prevSong(){

  currentSongIndex--;
  if(currentSongIndex < 0){
    currentSongIndex = songs.length - 1;
  }

  playSong(currentSongIndex);

}


// ================= AUTO UPDATE ICON =================
audio.addEventListener("play", function(){
  playPauseBtn.textContent = "⏸";
});

audio.addEventListener("pause", function(){
  playPauseBtn.textContent = "▶";
});


// ================= AUTO NEXT =================
audio.addEventListener("ended", function(){
  nextSong();
});


// ================= TOTAL DURATION =================
audio.addEventListener("loadedmetadata", function(){
  totalDurationEl.textContent = formatTime(audio.duration);
});


// ================= UPDATE PROGRESS =================
audio.addEventListener("timeupdate", function(){

  if(audio.duration){

    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progressPercent;

    currentTimeEl.textContent = formatTime(audio.currentTime);

  }

});


// ================= SEEK =================
progressBar.addEventListener("input", function(){

  const seekTime = (progressBar.value / 100) * audio.duration;
  audio.currentTime = seekTime;

});


function playSong(index){

  currentSongIndex = index; // WAJIB ADA INI

  const selectedSong = songs[currentSongIndex];

  const songSrc = selectedSong.getAttribute("data-src");
  const songTitle = selectedSong.querySelector("h4").textContent;
  const songArtist = selectedSong.querySelector("p").textContent;
  const songImg = selectedSong.querySelector("img").src;

  if(!songSrc){
    console.log("Tidak ada file audio.");
    return;
  }

  audio.pause();
  audio.currentTime = 0;
  audio.src = songSrc;
  audio.load();
  audio.play();

  document.getElementById("playerTitle").textContent = songTitle;
  document.getElementById("playerArtist").textContent = songArtist;
  document.getElementById("playerImg").src = songImg;

  songs.forEach(song => song.classList.remove("active"));
  selectedSong.classList.add("active");
}

function goToFinal(){
  document.getElementById("playlistPage").classList.add("hidden");
  document.getElementById("finalPage").classList.remove("hidden");

  startFinalTyping();
}

function backToHome(){

  // hide final page
  document.getElementById("finalPage").classList.add("hidden");

  // pastikan profileSelect tampil dan center lagi
  const home = document.getElementById("profileSelect");
  home.classList.remove("hidden");
  home.style.display = "flex"; // supaya tetap center

}

function startFinalTyping(){

  const text = "Thank you for being my favorite path in this life. Every song reminds me of you. 🤍";
  const typingElement = document.getElementById("finalTyping");

  typingElement.textContent = "";
  let i = 0;

  function typing(){
    if(i < text.length){
      typingElement.textContent += text.charAt(i);
      i++;
      setTimeout(typing, 40);
    }
  }

  typing();
}

