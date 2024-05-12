// Global variables
let counter = 0;
let count = 40;
let firstSelection = 0;
let secondSelection = 0;
let id1 = 0;
let id2 = 0;
let startGame = -1;
let matchingNum = 0;

// Get all cards
const cards = document.querySelectorAll(".card");

// Add click event listener to each card
cards.forEach((card) => {
  card.addEventListener("click", handleCardClick);
});

// Function to handle card click
function handleCardClick() {
  // Start the game if it's not started yet
  if (startGame === -1) {
    startGame = 1;
  }

  // Add clicked class to the card
  this.classList.add("clicked");

  // Handle first and second card selection
  if (counter === 0) {
    firstSelection = this.getAttribute("Num");
    id1 = this.getAttribute("id");
    counter++;
  } else {
    handleSecondCardSelection(this);
  }
}

// Function to handle second card selection
function handleSecondCardSelection(card) {
  id2 = card.getAttribute("id");
  if (id1 !== id2) {
    secondSelection = card.getAttribute("Num");
    counter = 0;
    if (firstSelection === secondSelection) {
      handleCorrectSelection();
    } else {
      handleIncorrectSelection();
    }
  }
}

// Function to handle correct card selection
function handleCorrectSelection() {
  matchingNum++;
  const correctMatching = document.querySelectorAll(".card[Num='" + firstSelection + "']");
  correctMatching.forEach((card) => {
    card.classList.add("checked");
    card.classList.remove("clicked");
  });
}

// Function to handle incorrect card selection
function handleIncorrectSelection() {
  const incorrectMatching = document.querySelectorAll(".card.clicked");
  incorrectMatching.forEach((card) => {
    setTimeout(() => card.classList.add("shake"), 300);
    setTimeout(() => {
      card.classList.remove("clicked");
      card.classList.remove("shake");
    }, 800);
  });
}

// Function to shuffle cards
function shuffleCard() {
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1));
  cards.forEach((card, i) => {
    let imgTag = card.querySelector("img");
    imgTag.src = `Memory Card Game Images/img-${arr[i]}.png`;
    card.setAttribute("Num", arr[i]);
  });
}

// Function to start timer
function timer() {
  const myInterval = setInterval(myTimeout1, 1000);
  function myTimeout1() {
    const forTime = document.getElementById("start");
    forTime.innerHTML = `Time | ${count} `;
    if (count >= 0) {
      if (matchingNum === 8) {
        forTime.innerHTML = `You Win`;
        setTimeout(() => {
          window.location.reload();
        }, 3000);
        clearInterval(myInterval);
      }
    } else {
      clearInterval(myInterval);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
      forTime.innerHTML = `Time Up`;
    }
    count--;
  }
}

// Start game on click of start button
const hidStart = document.getElementById("Time");
hidStart.addEventListener("click", startGameOnClick);

// Function to start game on click
function startGameOnClick() {

  if (startGame === -1) {
    const Interval = setInterval(
      cards.forEach((card) => {
        card.getElementsByTagName("img")[0].style.opacity = "1";
      }),
      1000
    );
    setTimeout(() => {
      clearInterval(Interval);
      cards.forEach((card) => {
        card.getElementsByTagName("img")[0].style.opacity = "0";
      });
    }, 2000);
    timer();
    startGame = 1;
  }
}

// Shuffle cards at the start
shuffleCard();

// Choose level
const easy = document.getElementById("easy");
const medium = document.getElementById("medium");
const hard = document.getElementById("hard");

// Add click event listener to each level
easy.addEventListener("click", () => startGameAtLevel("easy"));
medium.addEventListener("click", () => startGameAtLevel("medium"));
hard.addEventListener("click", () => startGameAtLevel("hard"));

// Function to start game at a specific level
function startGameAtLevel(level) {
  const levels = document.getElementById("level");
  levels.style.display = "none";
  count = level === "easy" ? 40 : level === "medium" ? 30 : 20;
  shuffleCard();
  timer();
  cards.forEach((card) => {
    card.getElementsByTagName("img")[0].style.opacity = "1";
  });

  // Hide the cards after 2 seconds
  setTimeout(() => {
    cards.forEach((card) => {
      card.getElementsByTagName("img")[0].style.opacity = "0";
    });
  }, 2000);

  // Hide the other levels
  [easy, medium, hard].forEach((levelButton) => {
    if (levelButton !== level) {
      levelButton.style.display = "none";
    }
  });
}

// Reset the game
const reset = document.getElementById("reset");
reset.addEventListener("click", () => {
  window.location.reload();
});