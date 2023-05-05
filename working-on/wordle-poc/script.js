import { WORDS } from './words/words.js';

// load the score from local storage, or set default values
let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    gamesPlayed: 0
};

// set the number of guesses and initialize variables for the current guess and remaining guesses
const numberOfGuesses = 6;
let guessesRemaining = numberOfGuesses;
let currentGuess = [];
let nextLetter = 0;

// for getting random correct guess
let correctGuessString = WORDS[Math.floor(Math.random() * WORDS.length)];
console.log(correctGuessString);

// listen for keyboard events
document.addEventListener(('keyup'), (e) => {
    if (guessesRemaining === 0) return;

    let keyPressed = e.key;
    // for checking if the letter is a-z
    // g is global and i is case-insensitive mode
    let regexChar = keyPressed.match(/[a-z]/gi)
    

    if (keyPressed === 'Delete' || keyPressed === 'Backspace' && nextLetter !== 0) {
        deleteLetter();
        return;
    }

    if (keyPressed === 'Enter') {
        checkGuess();
        return;
    }

    // regexChar.length is for disallowing shift and tab to be passed or multiple characters at once
    if(!regexChar || regexChar.length > 1) {
        return;
    } else {
        insertLetter(keyPressed.toLowerCase());
    }
})

// listen for clicks on the virtual keyboard
document.querySelector('.js-keyboard-cont').addEventListener('click', (e) => {    
    if (!e.target.classList.contains('js-keyboard-button')) {
        return
    }
    let key = e.target.textContent

    if (key === 'Del') {
        key = 'Backspace'
    } 

    document.dispatchEvent(new KeyboardEvent('keyup', {'key': key}))
})


// check the current guess against the correct answer and update the score
function checkGuess() {
    let row = document.getElementsByClassName("js-letter-row")[6 - guessesRemaining];
    let guess = '';
    let correctGuess = Array.from(correctGuessString);

    // add each value inputted by user to the guess string
    for (const value of currentGuess) {
        guess += value;
    }

    // if the guess is too short or not in the list of available words, do nothing
    if (guess.length !== 5) {
        alert('word not long enough');
        return;
    }
    if (!WORDS.includes(guess)) {
        alert('word not in list');
        return;
    }

    // check each letter of the guess against the correct answer and update the display
    for (let i = 0; i < 5; i++) {
        let letterColor = '';
        let field = row.children[i];
        let letter = currentGuess[i];

        let letterPosition = correctGuess.indexOf(currentGuess[i]);
        if (letterPosition === -1) {
            letterColor = 'gray'
        } else { 
            if (currentGuess[i] === correctGuess[i]) {
                letterColor = 'green';
            } else {
                letterColor = 'yellow';
            }

            correctGuess[letterPosition] = '.';
        }

        // set the color of the current letter and the corresponding key on the virtual keyboard
        setTimeout(() => {
            field.style.backgroundColor = letterColor;
            shadeKeyBoard(letter, letterColor);
        }, 100);

    };

    // win case
    if (guess === correctGuessString) {
        score.wins++;
        score.gamesPlayed++;
        guessesRemaining = 0;
        localStorage.setItem('score', JSON.stringify(score));
        alert(`You got the answer correct! The answer was "${correctGuessString}".\nGame(s) played: ${score.gamesPlayed}\nWins: ${score.wins} Losses: ${score.losses}`);
        resetScore();
        setTimeout(() => {
            location.reload();
        }, 2000);
    // still have guesses remaining but guess was incorrect
    } else {
        guessesRemaining -= 1;
        currentGuess = [];
        nextLetter = 0;
        
        // lose case
        if (guessesRemaining === 0) {
            score.losses++;
            score.gamesPlayed++;
            localStorage.setItem('score', JSON.stringify(score));
            alert(`You ran out of guesses! The answer was "${correctGuessString}".\nGame(s) played: ${score.gamesPlayed}\nWins: ${score.wins} Losses: ${score.losses}`);
            resetScore();
            setTimeout(() => {
                location.reload();
            }, 2000);
        }
    }
}

// Updates the background color of the keyboard button that corresponds to the letter that was just guessed
function shadeKeyBoard(letter, letterColor) {
    for (const e of document.getElementsByClassName('js-keyboard-button')) {
        if (e.textContent === letter) {
            let oldColor = e.style.backgroundColor
            if (oldColor === 'green') {
                return
            } 

            if (oldColor === 'yellow' && letterColor !== 'green') {
                return
            }

            e.style.backgroundColor = letterColor
            break
        }
    }
}

// Deletes the last letter of the current guess when the user presses the 'Backspace' or 'Delete' key
function deleteLetter() {
    // Select the current row and field where the next letter should be deleted
    let row = document.getElementsByClassName("js-letter-row")[6 - guessesRemaining];
    let field = row.children[nextLetter - 1];

    // Clear the text content and remove the 'js-filled-field' class from the current field
    field.textContent = "";
    field.classList.remove("js-filled-field");

    // Remove the last letter from the current guess array and decrement the index of the next letter to be guessed
    currentGuess.pop();
    nextLetter -= 1;
}

// Inserts a letter into the current guess when the user clicks on a letter tile
function insertLetter(letter) {
    if (nextLetter === 5) return;

    // Select the current row and field where the next letter should be inserted
    let row = document.getElementsByClassName('js-letter-row')[6 - guessesRemaining];
    let field = row.children[nextLetter];

    // Insert the selected letter into the current field, add the 'js-filled-field' class, and add the letter to the current guess array
    field.textContent = letter;
    field.textContent = letter;
    field.classList.add('js-filled-field');
    currentGuess.push(letter);

    // Increment the index of the next letter to be guessed
    nextLetter++;
}

// Resets the user's localStorage score(object) when they click the 'OK' on the prompt
function resetScore() {
    const response = confirm('Do you want to reset your score?');
    if (response === true) {
        score.wins = 0;
        score.losses = 0;
        score.gamesPlayed = 0;
        localStorage.removeItem('score');
    } else {
        return;
    }
}
