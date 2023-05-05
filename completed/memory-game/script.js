import { cardArray } from "./cardArray.js";

let score = {
    matches: 0,
    tries: 0
}

let advancedScore = JSON.parse(localStorage.getItem('score-advanced')) || {
    averageTries: 0,
    worstGame: 0,
    bestGame: 999,
    perfectGames: 0,
    gamesPlayed: 0,
    scores: []
}

// cant store functions in localstorage only strings
advancedScore.scoresTotal = function() {
    let total = 0;
    for (let i = 0; i < this.scores.length; i++) {
      total += this.scores[i];
    }
    return total;
};



let cardsChosen = [];
let cardsChosenIds = [];
const cardsWon = [];

// to not allow the user to do anything after clicking a match
let overlay = document.createElement('div');
overlay.id = 'overlay';


// randomize the order of the array
cardArray.sort(() => 0.5 - Math.random());

const grid = document.querySelector('#grid');
const matches = document.querySelector('#matches');
const tries = document.querySelector('#tries');
const winner = document.querySelector('#winner');
const averageTries = document.querySelector('#average-tries');
const averageTriesText = document.querySelector('#average-tries-text');
const worstGame = document.querySelector('#worst-game');
const bestGame = document.querySelector('#best-game');
const perfectGames = document.querySelector('#perfect-games');
const resetBtn = document.querySelector('#reset');


resetBtn.addEventListener('click', () => {
    resetAdvancedStats();
});


function createBoard() {
    cardArray.forEach((e, index) => {
        const card = document.createElement('img');
        card.setAttribute('src', 'img/blank.png');
        card.setAttribute('data-id', index);
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    });
}

// initialization
createBoard();
setAverageTriesColor();
averageTries.textContent = advancedScore.averageTries;
worstGame.textContent = advancedScore.worstGame;
bestGame.textContent = advancedScore.bestGame;
perfectGames.textContent = advancedScore.perfectGames;


function checkMatch() {
    const cards = document.querySelectorAll('#grid img');
    const optionOneId = cardsChosenIds[0];
    const optionTwoId = cardsChosenIds[1];
    score.tries++;

    if (optionOneId == optionTwoId) {
        cards[optionOneId].setAttribute('src', 'img/blank.png');
        cards[optionTwoId].setAttribute('src', 'img/blank.png');
    }

    if (cardsChosen[0] == cardsChosen[1]) {
        cards[optionOneId].setAttribute('src', 'img/white.png');
        cards[optionTwoId].setAttribute('src', 'img/white.png');
        cards[optionOneId].removeEventListener('click', flipCard);
        cards[optionTwoId].removeEventListener('click', flipCard);
        cardsWon.push(cardsChosen);
        score.matches++;
        document.body.appendChild(overlay);
        setTimeout(function() {
            // code to execute after waiting period
            overlay.remove();
        }, 200);
    } else {
        cards[optionOneId].setAttribute('src', 'img/blank.png');
        cards[optionTwoId].setAttribute('src', 'img/blank.png');
        document.body.appendChild(overlay);
        setTimeout(function() {
            // code to execute after waiting period
            overlay.remove();
        }, 200);
    }
    matches.textContent = score.matches;
    tries.textContent = score.tries;
    cardsChosen = [];
    cardsChosenIds = [];

    if (cardsWon.length === cardArray.length / 2) {
        winner.innerHTML = 'You won and found all matches!';

        advancedScoreCalculations();

        setTimeout(function() {
            location.reload();
        }, 2000);
    }
}

function flipCard() {
    let cardId = this.getAttribute('data-id');
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenIds.push(cardId);
    this.setAttribute('src', cardArray[cardId].img);

    if (cardsChosen.length === 2) {
        setTimeout(() => {
            checkMatch();
        }, 500);
    }
}

function advancedScoreCalculations() {
    advancedScore.gamesPlayed++;
    advancedScore.scores.push(score.tries);

    if (advancedScore.averageTries === 0) {
        advancedScore.averageTries = score.tries;
    } else {
        advancedScore.averageTries = (advancedScore.scoresTotal() / advancedScore.gamesPlayed).toFixed(2);
    }
    
    // for color
    if (advancedScore.averageTries <= 10) {
        averageTriesText.style.color = 'green';
        averageTries.style.color = 'green';
    } else if (advancedScore.averageTries >= 11 && advancedScore.averageTries <= 14) {
        averageTriesText.style.color = 'yellow';
        averageTries.style.color = 'yellow';
    } else {
        averageTriesText.style.color = 'red';
        averageTries.style.color = 'red';
    }
    averageTries.textContent = advancedScore.averageTries;    



    if (score.tries >= advancedScore.worstGame) {
        advancedScore.worstGame = score.tries;
    }
    worstGame.textContent = advancedScore.worstGame;



    if (score.tries <= advancedScore.bestGame) {
        advancedScore.bestGame = score.tries;
    }
    bestGame.textContent = advancedScore.bestGame;



    // update if more cards are added
    if (score.tries === 6) {
        advancedScore.perfectGames++;
    }
    perfectGames.textContent = advancedScore.perfectGames;
    


    localStorage.setItem('score-advanced', JSON.stringify(advancedScore));
}

function setAverageTriesColor() {
    // Retrieve the color from local storage
    let averageTriesColor = localStorage.getItem('averageTriesColor');

    // Set the initial color based on the stored value, or use the default color
    if (averageTriesColor) {
        averageTries.style.color = averageTriesColor;
        averageTriesText.style.color = averageTriesColor;
    } else {
        averageTries.style.color = 'white';
        averageTriesText.style.color = 'white';
    }

    // Update the color based on the averageTries value
    if (advancedScore.averageTries <= 10) {
        averageTriesText.style.color = 'green';
        averageTries.style.color = 'green';
    } else if (advancedScore.averageTries >= 11 && advancedScore.averageTries <= 14) {
        averageTriesText.style.color = 'yellow';
        averageTries.style.color = 'yellow';
    } else {
        averageTriesText.style.color = 'red';
        averageTries.style.color = 'red';
    }

    // Store the updated color in local storage
    localStorage.setItem('averageTriesColor', averageTries.style.color);
}



function resetAdvancedStats() {
    localStorage.removeItem('score-advanced');
    location.reload();
}
