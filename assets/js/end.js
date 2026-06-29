// Global DOM Selectors //

let mostRecentScore = parseInt(localStorage.getItem("most-recent-score"));
let scoreAlert = document.getElementById("sorting-hat-greeting");
let houseScore = document.getElementById("house-sort");
let charHarry = document.getElementById("char-harry");
let charHermione = document.getElementById("char-hermione");
let charDumbledore = document.getElementById("char-dumbledore");
let charDraco = document.getElementById("char-draco");
let characterName = document.getElementById("character-name");

scoresOnDoors();

// Character Sorting Function
// Depending on Score Player Will Be Matched To A Character
// Corresponding character portrait will display depending on score

function scoresOnDoors() {
  // Check if this is a first visit (no quiz taken yet)
  let hasPlayed = localStorage.getItem("most-recent-score") !== null;

  if (!hasPlayed) {
    // First visit - show welcome screen
    scoreAlert.innerText = "Welcome to the Harry Potter Quiz";
    houseScore.innerText = "Answer 5 questions to discover which character you are";
    // Change button text to "Start Quiz"
    let playBtn = document.getElementById("play-again");
    if (playBtn) playBtn.innerText = "Start Quiz";
    return;
  }

  if (isNaN(mostRecentScore)) {
    mostRecentScore = 0;
  }

  scoreAlert.innerText = "You Scored " + mostRecentScore + " out of 5";

  if (mostRecentScore == 5) {
    charHarry.classList.remove("hidden");
    houseScore.innerText = "You are Harry Potter - The Chosen One";
    characterName.innerText = "Harry Potter";
  } else if (mostRecentScore == 4) {
    charHermione.classList.remove("hidden");
    houseScore.innerText = "You are Hermione Granger - The Brightest Witch of Her Age";
    characterName.innerText = "Hermione Granger";
  } else if (mostRecentScore == 3) {
    charDumbledore.classList.remove("hidden");
    houseScore.innerText = "You are Albus Dumbledore - The Greatest Wizard";
    characterName.innerText = "Albus Dumbledore";
  } else {
    charDraco.classList.remove("hidden");
    houseScore.innerText = "You are Draco Malfoy - My father will hear about this";
    characterName.innerText = "Draco Malfoy";
  }
}

localStorage.clear();

// BGM Controls //

let bgm = document.getElementById("bgm");
let bgmToggle = document.getElementById("bgm-toggle");

// Try to resume BGM from stored state
let bgmState = sessionStorage.getItem("bgm-state");
if (bgmState !== "off") {
  bgm.volume = 0.3;
  bgm.play().catch(function () {
    // Autoplay blocked, will need user click
  });
  if (bgmToggle) bgmToggle.innerText = "Music: ON";
} else {
  if (bgmToggle) bgmToggle.innerText = "Music: OFF";
}

if (bgmToggle) {
  bgmToggle.onclick = function () {
    if (bgm.paused) {
      bgm.volume = 0.3;
      bgm.play();
      bgmToggle.innerText = "Music: ON";
      sessionStorage.setItem("bgm-state", "on");
    } else {
      bgm.pause();
      bgmToggle.innerText = "Music: OFF";
      sessionStorage.setItem("bgm-state", "off");
    }
  };
}

// Instruction Box //

let modal = document.getElementById("myModal");

let btn = document.getElementById("instruct");

let span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
