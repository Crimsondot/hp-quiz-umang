// Game Start Function When Page Is Loaded //

document.addEventListener("DOMContentLoaded", function () {
  start();
});

// BGM Controls //

let bgm = document.getElementById("bgm");
let bgmToggle = document.getElementById("bgm-toggle");

// Resume BGM from stored state
let bgmState = sessionStorage.getItem("bgm-state");
if (bgmState !== "off") {
  bgm.volume = 0.3;
  bgm.play().catch(function () {
    // Autoplay blocked, will start on first click
    document.addEventListener("click", function startOnClick() {
      let state = sessionStorage.getItem("bgm-state");
      if (state !== "off") {
        bgm.volume = 0.3;
        bgm.play();
      }
      document.removeEventListener("click", startOnClick);
    });
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

// Question Pool //

let quizquestions = [
  {
    question: "What Is Hermione's Cat Called?",
    choice1: "Scabbers",
    choice2: "Hedwig",
    choice3: "Crookshanks",
    choice4: "Snape",
    correct: 3,
  },
  {
    question: "What Is Voldemort's Real Name?",
    choice1: "Tom Riddle",
    choice2: "Albus Dumbledore",
    choice3: "Bellatrix Lestrange",
    choice4: "Ron Weasley",
    correct: 1,
  },
  {
    question: "What Was The Last Horcrux?",
    choice1: "Harry Potter",
    choice2: "Nagini",
    choice3: "The Cup",
    choice4: "Tom Riddle's Diary",
    correct: 2,
  },
  {
    question: "Who Killed Dumbledore?",
    choice1: "Voldermort",
    choice2: "Hagrid",
    choice3: "Severus Snape",
    choice4: "Draco Malfoy",
    correct: 3,
  },
  {
    question: "Who is Dracos dad?",
    choice1: "McGonagall",
    choice2: "Lucius Malfoy",
    choice3: "Barty Crouch",
    choice4: "Gaspar Avery",
    correct: 2,
  },
  {
    question: "What Was Harry Potter's Mums Name?",
    choice1: "Lilly",
    choice2: "Margaret",
    choice3: "Karen",
    choice4: "Sandra",
    correct: 1,
  },
  {
    question: "Who did Ron Weasley's pet rat used to belong to?",
    choice1: "Lilly Potter",
    choice2: "Voldemort",
    choice3: "Percy Weasley",
    choice4: "Hagrid",
    correct: 3,
  },
  {
    question: "What was Hagrid's pet dog called?",
    choice1: "Fang",
    choice2: "Scabbers",
    choice3: "Hegwig",
    choice4: "Buckbeak ",
    correct: 1,
  },
  {
    question: "Who killed Dobby by throwing a knife at him?",
    choice1: "Voldemort",
    choice2: "Griphook",
    choice3: "Bellatrix Lestrange",
    choice4: "Lucius Malfoy",
    correct: 3,
  },
  {
    question: "What was Harry's Patronus?",
    choice1: "Cat",
    choice2: "Stag",
    choice3: "Fox",
    choice4: "Dove",
    correct: 2,
  },
];

// Global Selectors - DOM //

let questionSelect = document.getElementById("question-placeholder");
let answers = Array.from(document.getElementsByClassName("choice-text"));
let counterText = document.getElementById("questionCounter");

let currentQuestion = {};
let avaliableQuestions = [];
let questionCounter = 0;

// Start Function
// Questions Pulled From Question Pool
// Display Questions Function

function start() {
  questionCounter = 0;
  avaliableQuestions = [...quizquestions];
  displayQuestions();
}

// Display Questions Function
// Random Question Chosen
// Questions & Answer Populated in DOM

function displayQuestions() {
  if (questionCounter == 5) {
    return window.location.assign("index.html");
  }
  questionCounter++;
  counterText.innerText = questionCounter + "/5";
  let index = Math.floor(Math.random() * avaliableQuestions.length);
  currentQuestion = avaliableQuestions[index];
  questionSelect.innerText = currentQuestion.question;

  answers.forEach((answer) => {
    const number = answer.dataset["number"];
    answer.innerText = currentQuestion["choice" + number];
  });

  avaliableQuestions.splice(index, 1);
}

// Check Answer Function
// Will check if selected Answer is correct.
// Button will change colour accordingly

answers.forEach((answer) => {
  answer.addEventListener("click", (e) => {
    let selectedChoice = e.target;
    let selectedAnswer = selectedChoice.dataset["number"];
    checkAnswer();
    function checkAnswer() {
      if (selectedAnswer == currentQuestion.correct) {
        selectedChoice.classList.add("correct");
        CorrectAnswer();
      } else {
        selectedChoice.classList.add("incorrect");
        WrongAnswer();
      }
      setTimeout(function () {
        selectedChoice.classList.remove("correct");
        selectedChoice.classList.remove("incorrect");
        displayQuestions();
      }, 700);
    }
  });
});

// Score Board Function - If Question
// is answered correct this will increment by 1

function CorrectAnswer() {
  let correctScore = parseInt(document.getElementById("correct").innerText);
  document.getElementById("correct").innerText = ++correctScore;
  localStorage.setItem("most-recent-score", correctScore);
}

// Score Board Function - If Question
// is answered incorrect this will increment by 1

function WrongAnswer() {
  let incorrectScore = parseInt(document.getElementById("incorrect").innerText);
  document.getElementById("incorrect").innerText = ++incorrectScore;
}
