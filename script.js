let firstCard = document.getElementById("firstCard-el");
let secondCard = document.getElementById("secondCard-el");
let drawCard = document.getElementById("drawCard-el");
let resultEl = document.getElementById("result-el");
let currScoreEl = document.getElementById("currentScore-el");
let dealerScoreEl = document.getElementById("dealerScore-el");
let currScore;
let dealButton = document.getElementById("deal-btn");
let hitButton = document.getElementById("hit-btn");
let stayButton = document.getElementById("stay-btn");
let newButton = document.getElementById("new-btn");
let allCards = [];
let totalScore = 0;
let dealerTotal = 0;

// generate randome number 1-11
function getRandomNum() {
  let ranNum = Math.floor(Math.random() * 12) + 1;

  // Change ace, aka 1 to 11 value and j q k to 10
  if (ranNum === 1) {
    ranNum = 11;
  } else if (ranNum > 10) {
    ranNum = 10;
  }

  return ranNum;
}

// set cards to the random number
function deal() {
  if (allCards.length < 1) {
    firstCardVal = getRandomNum();
    secondCardVal = getRandomNum();

    allCards.push(firstCardVal, secondCardVal);

    firstCard.textContent = `FIRST CARD: ${firstCardVal}`;
    secondCard.textContent = `SECOND CARD: ${secondCardVal}`;

    currScoreEl.textContent = `CURRENT SCORE: ${firstCardVal + secondCardVal}`;
    totalScore = firstCardVal + secondCardVal;
  }
}

function hit() {
  drawCardVal = getRandomNum();
  drawCard.textContent = `DRAW CARD: ${drawCardVal}`;

  allCards.push(drawCardVal);

  totalScore = allCards.reduce(function (a, b) {
    return a + b;
  });

  currScoreEl.textContent = `CURRENT SCORE: ${totalScore}`;

  if (totalScore > 21) {
    resultEl.textContent = "YOU BUST!";
  }
}

function stay() {
  getDealersScore();
}

function getDealersScore() {
  firstCard = getRandomNum();
  secondCard = getRandomNum();

  dealerTotal = firstCard + secondCard;

  if (totalScore < 22 && totalScore > dealerTotal) {
    console.log("YOU WIN!");
  } else {
    console.log("YOU LOSE!");
  }

  dealerScoreEl.textContent = `DEALER SCORE: ${dealerTotal}`;
}

dealButton.addEventListener("click", deal);
hitButton.addEventListener("click", hit);
stayButton.addEventListener("click", stay);
