// fade in home screen //

let splash = document.querySelector(".splash");

document.addEventListener("DOMContentLoaded", (e) => {
  setTimeout(() => {
    splash.classList.add("display-none");
  }, 5000);
});

// BGM Controls //

let bgm = document.getElementById("bgm");

// Start BGM on first user interaction (autoplay policy workaround)
function startBGM() {
  let bgmState = sessionStorage.getItem("bgm-state");
  if (bgmState !== "off") {
    bgm.volume = 0.3;
    bgm.play().catch(function () {
      // Browser blocked autoplay, wait for next interaction
    });
    sessionStorage.setItem("bgm-state", "on");
  }
  document.removeEventListener("click", startBGM);
}

// Try to play immediately first
let bgmState = sessionStorage.getItem("bgm-state");
if (bgmState !== "off") {
  bgm.volume = 0.3;
  bgm.play().catch(function () {
    // Autoplay blocked by browser, will start on first click
    document.addEventListener("click", startBGM);
  });
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
