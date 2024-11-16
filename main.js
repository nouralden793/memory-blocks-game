let spalshSpan = document.querySelector(".control-splash-screen span");
let userName = document.querySelector(".name span");
let memoryBlocks = document.querySelector(".memory-blocks");
let blocks = Array.from(memoryBlocks.children);
let orderRange = [...Array(blocks.length).keys()];
let timer = document.querySelector(".time-left span");
let blo = document.querySelectorAll(".memory-blocks .block.has-match");
let namesCont = document.querySelector(".namesContainer div");
let tries = document.querySelector(".tries span");
let countainer = [];

if (localStorage.getItem("container")) {
  countainer = JSON.parse(localStorage.getItem("container"));
  let cont = JSON.parse(localStorage.getItem("container"));
  cont.forEach((detal) => {
    let p = document.createElement("p");
    p.className = "detal";
    p.textContent = `Your Name Is ${detal.name} And Wrong Tries Is ${detal.tries}`;
    namesCont.appendChild(p);
  });
}

if (namesCont.textContent == "") {
  namesCont.textContent = "Ranks Will Appear Here";
}

spalshSpan.onclick = function () {
  timer.textContent = 45;
  document.querySelector(".tries span").textContent = "0";
  memoryBlocks.style.pointerEvents = "all";
  blocks.forEach((block) => {
    block.style.transition = "0s";
    block.classList.remove("flip");
    block.classList.remove("has-match");
    setTimeout(() => {
      block.style.transition = "0.5s";
    }, 10);
  });
  document.querySelector(".control-splash-screen").style.display = "none";
  let yourName = prompt("Whats Your Name?");
  if (yourName == null || yourName == "") {
    userName.textContent = "Unkown";
  } else {
    userName.textContent = yourName;
  }
  orderBlocks();
  let counter = setInterval(() => {
    timer.textContent--;
    if (timer.textContent <= 25) {
      timer.classList.add("color-yellow");
    }
    if (timer.textContent <= 10) {
      timer.classList.remove("color-yellow");
      timer.classList.add("color-red");
    }
    if (timer.textContent == 0) {
      timer.classList.remove("color-red");
      blo = document.querySelectorAll(".memory-blocks .block.has-match");
      clearInterval(counter);
      blocks.forEach((block) => {
        if (Array(...blo).length == blocks.length) {
          document.querySelector(".win").style.opacity = 1;
          setTimeout(() => {
            document.querySelector(".win").style.opacity = 0;
          }, 2000);
          document.querySelector(".control-splash-screen").style.display =
            "block";
          memoryBlocks.style.pointerEvents = "none";
          localStorage.setItem("name", `${yourName || "Unknown"}`);
          localStorage.setItem("tries", tries.textContent);
        } else {
          document.querySelector(".lose").style.opacity = 1;
          setTimeout(() => {
            document.querySelector(".lose").style.opacity = 0;
          }, 2000);
          document.querySelector(".control-splash-screen").style.display =
            "block";
          memoryBlocks.style.pointerEvents = "none";
        }
      });
      const detal = {
        name: `${yourName || "Unknown"}`,
        tries: tries.textContent,
      };
      countainer.push(detal);
      localStorage.setItem("container", JSON.stringify(countainer));
      namesCont.textContent = "";
      countainer.forEach((detal) => {
        let p = document.createElement("p");
        p.className = "detal";
        p.textContent = `Your Name Is ${detal.name} And Wrong Tries Is ${detal.tries}`;
        namesCont.appendChild(p);
      });
    }
  }, 1000);
};

function orderBlocks() {
  blocks.forEach((block) => {
    block.style.order = Math.floor(Math.random() * orderRange.length);
    block.addEventListener("click", (e) => {
      e.currentTarget.classList.add("flip");
      let allFlippedCards = blocks.filter((block) =>
        block.classList.contains("flip")
      );
      if (allFlippedCards.length === 2) {
        blocks.forEach((block) => block.classList.add("no-clicking"));
        setTimeout(() => {
          blocks.forEach((block) => block.classList.remove("no-clicking"));
        }, 1000);
        checkMatchedCards(allFlippedCards[0], allFlippedCards[1]);
      }
    });
  });
}

function checkMatchedCards(firstCard, secondCard) {
  if (firstCard.dataset.technology == secondCard.dataset.technology) {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    firstCard.classList.add("has-match");
    secondCard.classList.add("has-match");
  } else {
    tries.textContent++;
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
    }, 500);
  }
}

document.querySelector(".clear").onclick = function () {
  localStorage.clear();
  countainer = [];
  namesCont.textContent = "";
  if (namesCont.textContent == "") {
    namesCont.textContent = "Ranks Will Appear Here";
  }
};
