const cardArray = [
    {
        name: 'fries',
        img: 'img/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'img/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img: 'img/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'img/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'img/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'img/pizza.png'
    },
    {
        name: 'fries',
        img: 'img/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'img/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img: 'img/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'img/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'img/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'img/pizza.png'
    }
];

let cardsChosen = [];
let cardsChosenIds = [];
const cardsWon = [];

let score = {
    matches: 0,
    tries: 0
}

// randomize the order of the array
cardArray.sort(() => 0.5 - Math.random());

const grid = document.querySelector('#grid');
const matches = document.querySelector('#matches');
const tries = document.querySelector('#tries');
const win = document.querySelector('#winner');


function createBoard() {
    cardArray.forEach((e, index) => {
        const card = document.createElement('img');
        card.setAttribute('src', 'img/blank.png');
        card.setAttribute('data-id', index);
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    });
}

createBoard();

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
        alert('You found a match!'); // add a wait
        cards[optionOneId].setAttribute('src', 'img/white.png');
        cards[optionTwoId].setAttribute('src', 'img/white.png');
        cards[optionOneId].removeEventListener('click', flipCard);
        cards[optionTwoId].removeEventListener('click', flipCard);
        cardsWon.push(cardsChosen);
        score.matches++;
    } else {
        cards[optionOneId].setAttribute('src', 'img/blank.png');
        cards[optionTwoId].setAttribute('src', 'img/blank.png');
        alert('Not a match!'); // add a wait
    }
    matches.textContent = score.matches;
    tries.textContent = score.tries;
    cardsChosen = [];
    cardsChosenIds = [];

    if (cardsWon.length === cardArray.length / 2) {
        winner.innerHTML = 'You won and found all matches!';
        setTimeout(() => {
            const response = confirm('Do you want to play again?');
            if (response) {
                location.reload();
            }
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












