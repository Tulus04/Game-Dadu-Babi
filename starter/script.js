'use strict';

// Selecting elements
const score0Element = document.getElementById('score-0');
const score1Element = document.getElementById('score-1');
const current0Element = document.getElementById('current-0');
const current1Element = document.getElementById('current-1');
const player0Element = document.querySelector('.player-0');
const player1Element = document.querySelector('.player-1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn-baru');
const btnRoll = document.querySelector('.btn-putar');
const btnHold = document.querySelector('.btn-tahan');
const turnIndicator = document.querySelector('.giliran-main');

// Starting conditions
let scores, currentScore, activePlayer, playing;

const init = function () {
  // Reset all scores and states
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // Reset display scores
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;

  // Reset dice and player states
  player0Element.classList.remove('player-winner');
  player1Element.classList.remove('player-winner');
  player0Element.classList.add('player-active');
  player1Element.classList.remove('player-active');
  
  // Reset turn indicator
  turnIndicator.value = 'Giliran: Pemain 1';
};

// Switch player function
const switchPlayer = function () {
  document.getElementById(`current-${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player-active');
  player1Element.classList.toggle('player-active');
  turnIndicator.value = `Giliran: Pemain ${activePlayer + 1}`;
};

// Initialize game
init();

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceElement.classList.remove('hidden');
    diceElement.src = `images/dadu-${dice}.png`;

    // 3. Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current-${activePlayer}`).textContent = currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

// Hold functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.add('player-winner');
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.remove('player-active');
      turnIndicator.value = `Pemain ${activePlayer + 1} Menang!`;
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

// New game button
btnNew.addEventListener('click', init);