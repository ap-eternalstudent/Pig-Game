'use strict';

// SELECT DOM ELEMETS
const player0DOM = document.querySelector('.player--0');
const player1DOM = document.querySelector('.player--1');
const player0Name = document.querySelector('#name--0');
const player1Name = document.querySelector('#name--1');

const diceElementDOM = document.querySelector('.dice');

const player0TotalScoreDOM = document.querySelector('#score--0');
const player1TotalScoreDOM = document.querySelector('#score--1');

const player0CurrentScoreDOM = document.querySelector('#current--0');
const player1CurrentScoreDOM = document.querySelector('#current--1');

const actionNewGame = document.getElementById('new');
const actionRoll = document.getElementById('roll');
const actionHold = document.getElementById('hold');

// INITIAL CONDITIONS
let player0Turn = 0;

let player0RecordTotalScore = 0;
let player1RecordTotalScore = 0;

let player0CurrentScoreValue = 0;
let player1CurrentScoreValue = 0;

player0TotalScoreDOM.textContent = 0;
player1TotalScoreDOM.textContent = 0;
diceElementDOM.classList.add('hidden');

const generateRandomNumber = function () {
  return Math.trunc(Math.random() * 6 + 1);
};

// GENERATE RANDOM NUMBER BETWEEN 1 and 6 inclusive

const gameIsOn = function () {
  let rolledDice = 0;
  const showDice = function () {
    diceElementDOM.classList.remove('hidden');
    diceElementDOM.src = `dice-${rolledDice}.png`;
  };

  const diceRoll = function () {
    rolledDice = generateRandomNumber();
    showDice();
    if (player0Turn == 0) {
      if (rolledDice > 1) {
        player0CurrentScoreValue += rolledDice;
      } else {
        player0CurrentScoreValue = 0;
        switchPlayer();
      }
      player0CurrentScoreDOM.textContent = player0CurrentScoreValue;
    } else {
      if (rolledDice > 1) {
        player1CurrentScoreValue += rolledDice;
      } else {
        player1CurrentScoreValue = 0;
        switchPlayer();
      }
      player1CurrentScoreDOM.textContent = player1CurrentScoreValue;
    }
  };

  const announceWinner = function () {
    if (player0Turn == 0) {
      player0DOM.classList.add('player--winner');
    } else {
      player1DOM.classList.add('player--winner');
    }
    actionRoll.classList.add('hidden');
    actionHold.classList.add('hidden');
  };

  const switchPlayer = function () {
    if (player0Turn == 0) {
      player0DOM.classList.remove('player--active');
      player1DOM.classList.add('player--active');
      player0Turn = 1;
    } else {
      player1DOM.classList.remove('player--active');
      player0DOM.classList.add('player--active');
      player0Turn = 0;
    }
  };

  const scoreHold = function () {
    if (player0Turn == 0) {
      player0RecordTotalScore += player0CurrentScoreValue;
      if (player0RecordTotalScore >= 20) {
        announceWinner();
        player0CurrentScoreValue = 0;
        player0CurrentScoreDOM.textContent = 0;
        player0TotalScoreDOM.textContent = player0RecordTotalScore;
      } else {
        player0CurrentScoreValue = 0;
        player0CurrentScoreDOM.textContent = 0;
        player0TotalScoreDOM.textContent = player0RecordTotalScore;
        switchPlayer();
      }
    } else {
      player1RecordTotalScore += player1CurrentScoreValue;

      if (player1RecordTotalScore >= 20) {
        announceWinner();
        player1CurrentScoreValue = 0;
        player1CurrentScoreDOM.textContent = 0;
        player1TotalScoreDOM.textContent = player1RecordTotalScore;
      } else {
        player1CurrentScoreValue = 0;
        player1CurrentScoreDOM.textContent = 0;
        player1TotalScoreDOM.textContent = player1RecordTotalScore;
        switchPlayer();
      }
    }
  };
  const resetGame = function () {
    player0Turn = 0;
    player0RecordTotalScore = 0;
    player1RecordTotalScore = 0;

    player0CurrentScoreValue = 0;
    player1CurrentScoreValue = 0;

    player0TotalScoreDOM.textContent = 0;
    player1TotalScoreDOM.textContent = 0;
    diceElementDOM.classList.add('hidden');

    player1DOM.classList.remove('player--active');
    player0DOM.classList.add('player--active');
    player0DOM.classList.remove('player--winner');
    player1DOM.classList.remove('player--winner');

    actionRoll.classList.remove('hidden');
    actionHold.classList.remove('hidden');

    console.log('reset game function');
  };
  actionRoll.addEventListener('click', diceRoll);
  actionHold.addEventListener('click', scoreHold);
  actionNewGame.addEventListener('click', resetGame);
};

gameIsOn();
