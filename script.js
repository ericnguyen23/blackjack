let firstCard = document.getElementById("firstCard-el");
let secondCard = document.getElementById("secondCard-el");
let firstCardVal = 0;
let secondCardVal = 0;

let drawCard = document.getElementById("drawCard-el");
let resultEl = document.getElementById("result-el");
let currScoreEl = document.getElementById("currentScore-el");
let currScore;
let dealerScoreEl = document.getElementById("dealerScore-el");

let dealButton = document.getElementById("deal-btn");
let hitButton = document.getElementById("hit-btn");
let stayButton = document.getElementById("stay-btn");
let newButton = document.getElementById("new-btn");

let allCards = [];
let totalScore = 0;
let dealerTotal = 0;

let inGame = false;

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
  inGame = true;

  if (allCards.length < 1) {
    firstCardVal = getRandomNum();
    secondCardVal = getRandomNum();

    allCards.push(firstCardVal, secondCardVal);

    firstCard.textContent = `FIRST CARD: ${firstCardVal}`;
    secondCard.textContent = `SECOND CARD: ${secondCardVal}`;

    currScoreEl.textContent = `YOUR SCORE: ${firstCardVal + secondCardVal}`;
    totalScore = firstCardVal + secondCardVal;
  }
}

function hit() {
  if (inGame === true) {
    drawCardVal = getRandomNum();
    drawCard.textContent = `DRAW CARD: ${drawCardVal}`;

    allCards.push(drawCardVal);

    totalScore = allCards.reduce(function (a, b) {
      return a + b;
    });

    currScoreEl.textContent = `YOUR SCORE: ${totalScore}`;

    if (totalScore > 21) {
      resultEl.textContent = "YOU BUST!";
      resultEl.classList.add("lose");
      inGame = false;
    }
  }
}

function stay() {
  if (inGame === true) {
    let dealerTotal;
    dealerFirstCard = getRandomNum();
    dealerSecondCard = getRandomNum();

    dealerTotal = dealerFirstCard + dealerSecondCard;

    // dealer draws new card if less than 16
    if (dealerTotal < 16) {
      let dealerDraw;
      dealerDraw = getRandomNum();
      dealerTotal += dealerDraw;
    }

    if (totalScore < 22 && totalScore > dealerTotal) {
      resultEl.textContent = "YOU WIN!";
      resultEl.classList.add("win");
      inGame = false;
    } else if (totalScore < 22 && dealerTotal > 21) {
      resultEl.textContent = "YOU WIN!";
      resultEl.classList.add("win");
      inGame = false;
    } else {
      resultEl.textContent = "YOU LOSE!";
      resultEl.classList.add("lose");
      inGame = false;
    }

    dealerScoreEl.textContent = `DEALER SCORE: ${dealerTotal}`;
  }
}

function newGame() {
  // reset all cards, scores
  firstCardVal = " ";
  secondCardVal = " ";
  dealerTotal = " ";
  currScore = " ";
  allCards = [];
  inGame = false;

  firstCard.textContent = `FIRST CARD: `;
  secondCard.textContent = `SECOND CARD: `;
  drawCard.textContent = `DRAW CARD: `;
  dealerScoreEl.textContent = `DEALERS SCORE: ${dealerTotal}`;
  currScoreEl.textContent = `YOUR SCORE: ${currScore}`;
  resultEl.textContent = " ";
}

dealButton.addEventListener("click", deal);
hitButton.addEventListener("click", hit);
stayButton.addEventListener("click", stay);
newButton.addEventListener("click", newGame);
