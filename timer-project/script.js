// Import beep function from audio.js module
import { beep } from './audio.js';

// Object that holds the current timer values
const timerValues = {
    minutes: 0,
    seconds: 0
};

// Boolean flag to indicate if the timer is currently running or not
let isPlaying = false;

// The ID of the intervals
let alertIntervalId;
let countdownIntervalId;

// Select the start and stop buttons
const startBtn = document.querySelector('.js-start-button-timer');
const stopBtn = document.querySelector('.js-stop-button-timer');
// Select the element to display the timer
const timerDisplay = document.querySelector('.js-timer-display');

// Add event listener for the start button
startBtn.addEventListener('click', () => {
    timerDisplay.classList.toggle('js-show');
    startTimer();
});

// Add event listener for the stop button
stopBtn.addEventListener('click', () => {
    isPlaying = false;
    startBtn.disabled = false;
    timerDisplay.classList.toggle('js-show');
    stopTimer();
});


// Function that updates the display with the current timer values
function updateTimerDisplay() {
    const minutes = String(timerValues.minutes).padStart(2, '0');
    const seconds = String(timerValues.seconds).padStart(2, '0');
    // don't display negative values
    if (minutes < 0 || seconds < 0) return
    else timerDisplay.textContent = `${minutes}:${seconds}`;
}


// Inside the startTimer() function, add a call to updateTimerDisplay()
function startTimer() {
    // Get the input timer value from the input field
    const inputTimer = document.querySelector('.js-input-timer').value;

    // Parse out the minutes and seconds values from the input string
    let [minutes, seconds] = inputTimer.split(':').map(Number);

    if (minutes > 999 || minutes < 0 || seconds > 59 || seconds < 0) {
        alert('Must enter value between 0-999 for minutes and 0-59 for seconds');
        return;
    }

    if (seconds === undefined) {
        alert('Must enter value as 00:00');
        document.querySelector('.js-input-timer').value = '';
        return;
    }

    // Disable new timer start until stop is clicked
    document.querySelector('.js-input-timer').disabled = true;
    startBtn.disabled = true;

    // Limit the values to 999 minutes and 59 seconds
    timerValues.minutes = Math.min(minutes, 999);
    timerValues.seconds = Math.min(seconds, 59);

    // Start the countdown
    countdownIntervalId = setInterval(() => {
        // Decrement the seconds value
        timerValues.seconds--;

        // If seconds reach 0, decrement minutes and reset seconds to 59
        if (timerValues.seconds < 0) {
            timerValues.seconds = 59;
            timerValues.minutes--;
        }

        // If the timer has reached 0, stop the countdown and play the alert sound
        if (timerValues.minutes === 0 && timerValues.seconds === 0) {
            clearInterval(countdownIntervalId);
            playAlert(true);
        }

        // Update the display with the current timer values
        updateTimerDisplay();
    }, 1000);

    // Start playing the alert sound when the timer hits 0
    isPlaying = false;
}


// Function that plays the alert sound
function playAlert(isPlaying) {
    if (isPlaying) {
        alertIntervalId = setInterval(() => {
            beep(1000, 440, 25);
        }, 1300);
    } else {
        clearInterval(alertIntervalId);
    }
}

// Function that stops the timer
function stopTimer() {
    // Stop the countdown
    clearInterval(countdownIntervalId);

    // Stop playing the alert sound if it is currently playing
    if (!isPlaying) playAlert(isPlaying);

    // Reset the timer values to 0
    resetTimer();

    // Update the display with the current timer values
    updateTimerDisplay();

    // Enable new time to enter for countdown
    document.querySelector('.js-input-timer').disabled = false;
}

// Function that resets the timer values and input field
function resetTimer() {
    timerValues.minutes = 0;
    timerValues.seconds = 0;
    document.querySelector('.js-input-timer').value = '';
}
