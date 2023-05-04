let gameboard = ['', '', '', '', '', '', '', '', ''];
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];
let score = {
    wins: 0,
    losses: 0,
    cats: 0
  };

stats();

const topLeft = document.querySelector('.js-choice-0');
const topMiddle = document.querySelector('.js-choice-1');
const topRight = document.querySelector('.js-choice-2');

topLeft.addEventListener('click', () => {
    if (topLeft.textContent !== 'O' && topLeft.textContent !== 'X') {
        topLeft.textContent = 'X';
        updateGameBoard(0, 'X');
        computerPickTile();
        determineWinner();
    }
});
topMiddle.addEventListener('click', () => {
    if (topMiddle.textContent !== 'O' && topMiddle.textContent !== 'X') {
        topMiddle.textContent = 'X';
        updateGameBoard(1, 'X');
        computerPickTile();
        determineWinner();
    }
});
topRight.addEventListener('click', () => {
    if (topRight.textContent !== 'O' && topRight.textContent !== 'X') {
        topRight.textContent = 'X';
        updateGameBoard(2, 'X');
        computerPickTile();
        determineWinner();
    }
});



const middleLeft = document.querySelector('.js-choice-3');
const middleMiddle = document.querySelector('.js-choice-4');
const middleRight = document.querySelector('.js-choice-5');

middleLeft.addEventListener('click', () => {
    if (middleLeft.textContent !== 'O' && middleLeft.textContent !== 'X') {
        middleLeft.textContent = 'X';
        updateGameBoard(3, 'X');
        computerPickTile();
        determineWinner();
    }
});
middleMiddle.addEventListener('click', () => {
    if (middleMiddle.textContent !== 'O' && middleMiddle.textContent !== 'X') {
        middleMiddle.textContent = 'X';
        updateGameBoard(4, 'X');
        computerPickTile();
        determineWinner();
    }
});
middleRight.addEventListener('click', () => {
    if (middleRight.textContent !== 'O' && middleRight.textContent !== 'X') {
        middleRight.textContent = 'X';
        updateGameBoard(5, 'X');
        computerPickTile();
        determineWinner();
    }
});



const bottomLeft = document.querySelector('.js-choice-6');
const bottomMiddle = document.querySelector('.js-choice-7');
const bottomRight = document.querySelector('.js-choice-8');

bottomLeft.addEventListener('click', () => {
    if (bottomLeft.textContent !== 'O' && bottomLeft.textContent !== 'X') {
        bottomLeft.textContent = 'X';
        updateGameBoard(6, 'X');
        computerPickTile();
        determineWinner();
    }
});
bottomMiddle.addEventListener('click', () => {
    if (bottomMiddle.textContent !== 'O' && bottomMiddle.textContent !== 'X') {
        bottomMiddle.textContent = 'X';
        updateGameBoard(7, 'X');
        computerPickTile();
        determineWinner();
    }
});
bottomRight.addEventListener('click', () => {
    if (bottomRight.textContent !== 'O' && bottomRight.textContent !== 'X') {
        bottomRight.textContent = 'X';
        updateGameBoard(8, 'X');
        computerPickTile();
        determineWinner();
    }
});


function stats() {
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Cats Gotten: ${score.cats}`;
}


function updateGameBoard(index, player) {
    gameboard[index] = player;
    console.log(gameboard);
}

function getOpenSpaces(gameboard) {
    let openSpaces = [];
    for (let i = 0; i < gameboard.length; i++) {
      if (gameboard[i] === '') {
        openSpaces.push(i);
      }
    }
    return openSpaces;
}


function getRandomSpace(gameboard) {
    let openSpaces = getOpenSpaces(gameboard);
    
    // check for two in a row and block the player's move
    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (gameboard[a] === 'X' && gameboard[b] === 'X' && !gameboard[c]) {
        console.log(c)
        return c;
      }
      if (gameboard[b] === 'X' && gameboard[c] === 'X' && !gameboard[a]) {
        console.log(a)
        return a;
      }
      if (gameboard[a] === 'X' && gameboard[c] === 'X' && !gameboard[b]) {
        console.log(b)
        return b;
      }
    }
    
    // otherwise, choose a random open space
    let randomIndex = Math.floor(Math.random() * openSpaces.length);
    console.log(openSpaces[randomIndex])
    return openSpaces[randomIndex];
  }
  


function computerPickTile() {
    let index = getRandomSpace(gameboard);
    if (index !== undefined) {
        gameboard[index] = 'O';
        const tile = document.querySelector(`.js-choice-${index}`);
        tile.textContent = 'O';
    }
}



function determineWinner() {  
    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (gameboard[a] && gameboard[a] === gameboard[b] && gameboard[a] === gameboard[c]) {
        console.log(`Winner: ${gameboard[a]}`);
        // If the computer won, display a message and end the game
        if (gameboard[a] === 'O') {
          document.querySelector('.js-result').innerHTML = 'The computer won!';
          setTimeout(() => {
            // reset the game board
            gameboard = ['', '', '', '', '', '', '', '', ''];
            const tiles = document.querySelectorAll('.js-choiceAll');
            tiles.forEach(tile => tile.textContent = '');
            score.losses++;
            stats();
          }, 3000); // delay of 3 seconds
        } else { // If the player won, display a message and end the game
          document.querySelector('.js-result').innerHTML = 'You won!';
          setTimeout(() => {
            // reset the game board
            gameboard = ['', '', '', '', '', '', '', '', ''];
            const tiles = document.querySelectorAll('.js-choiceAll');
            tiles.forEach(tile => tile.textContent = '');
            score.wins++;
            stats();
          }, 3000); // delay of 3 seconds
        }
        return true;
      }
    }
  
    // if tie
    if (!gameboard.includes('')) {
      document.querySelector('.js-result').innerHTML = 'The cat got it!';
      setTimeout(() => {
        // reset the game board
        gameboard = ['', '', '', '', '', '', '', '', ''];
        const tiles = document.querySelectorAll('.js-choiceAll');
        tiles.forEach(tile => tile.textContent = '');
        score.cats++;
        stats();
      }, 3000); // delay of 3 seconds
      return true;
    }
  
    return false;
  }
  

