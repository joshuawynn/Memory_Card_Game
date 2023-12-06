/*----- constants -----*/


/*----- state variables -----*/
let hasFlippedCard = false;
let lockBoard = false; 
let firstCard;
let secondCard;
let flips = 0;
let timer; 
let elapsedSeconds = 0;
let gameStart = false;

/*----- cached elements  -----*/
//declares a variable to to store all the elements within the class "game-cards"
const cards = document.querySelectorAll('.game-cards'); 

/*----- event listeners -----*/
//event listener to flip a card once clicked
cards.forEach(card => card.addEventListener('click', flipCard));
//event listener to play a flip sound once clicked
cards.forEach(card => card.addEventListener('click', playFlipSound));

document.addEventListener('DOMContentLoaded', function () {
    const audio = document.getElementById('backgroundSound');
    audio.volume = 0.3;
    audio.play();
});

/*----- functions -----*/

// Update the timer display, using the ID "timer".
function updateTimerDisplay() {
    const timerDisplay = document.getElementById('timer');
    if (timerDisplay) {
        timerDisplay.textContent = `Time: ${elapsedSeconds}s`;
    }
}

// Start the timer using the setInterval js function to increment the seconds and refresh the displayed timer by calling the updateTimerDisplay function
function startTimer() {
    timer = setInterval(() => {
        elapsedSeconds++;
        updateTimerDisplay();
    }, 1000);

}

// Stop the timer using the clearInterval js function
function stopTimer() {
    clearInterval(timer);
}


//function to flip two cards
function flipCard() {
    if (lockBoard) return; // checks if the board is locked and more cards cannot be flipped
    if (this === firstCard)  
        return;
    if(!gameStart){
        startTimer()
        gameStart = true; 
    }
    this.classList.add('flip'); //calls the css to visually flip the card

    if (!hasFlippedCard) {
        //first click
        hasFlippedCard = true;
        firstCard = this;
        flips++; // Increment flips counter
        updateFlipsDisplay(); //Update the display of flips
        return;
    }
    //second click
    secondCard = this;
    checkMatchingCards();
    flips++; // Increment flips counter
    updateFlipsDisplay(); //Update the display of flips
}

// function to check for matching cards
function checkMatchingCards() {
    
    let isMatch = firstCard.dataset.image === secondCard.dataset.image;
    //do cards match - ternary operator, if cards match disable flip of both cards, other unflip the cards
    isMatch ? disableCardFlip() : unflipCards();

    checkAllMatched(); //Check for a winner after each move

}

// function to disabled flipping cards
function disableCardFlip() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard()
}

//function to unflip cards
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard()
    }, 1500)
}


//function to reset board state to allow for the next set of card flips. 
//heveloper.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignmentttps://d
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//updates the flips counter on the game page
function updateFlipsDisplay() {
    const flipsDisplay = document.getElementById('flips');
    if (flipsDisplay) {
        flipsDisplay.textContent = `Flips: ${flips}`;
    }
}

// function to shuffle cards
// source chatgpt
(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12); //formula to generate a random position
        card.style.order = randomPos  // changes the order within the grid
    });
})(); //immediately invoked function expression

//source stackoverflow how to reload a page
function restartGame() {
    // Reload the page to restart the game
    location.reload();
}

// source stackoverflow - Function to play the card flip sound
function playFlipSound() {
    const flipSound = document.getElementById('flipSound');
    flipSound.play();
}

// source stackoverflow - Function to play the crowd cheering when the game is won
function playWinningSound() {
    const winSound = document.getElementById('winSound');
    winSound.play();
}

// learned by creating the other two sound functions, Function to play the crowd cheering when the game is won
function playindexBackGroundSound() {
    const winSound = document.getElementById('backgroundSound');
    backgroundSound.play();
}

// Function to show the winning message, removed from checkAllMatched function to make the code more modular. 
function displayWinnerMessage() {
    document.getElementById('winner-message').textContent = 'Congratulations! You have matched all the cards and won!';
}

//Array.from method turns a node list into an array to check if all the cards are flipped.
function checkAllMatched() {
    const allMatched = Array.from(cards).every(card => card.classList.contains('flip'));

    if (allMatched) {
        setTimeout(() => {
            stopTimer();
            gameStart = false;
            displayWinnerMessage();
        }, 1500) // delay of 1.5 seconds before running the code in the code in the function
        playWinningSound();
    }

}


