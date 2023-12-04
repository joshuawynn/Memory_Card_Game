/*----- constants -----*/
const cards = document.querySelectorAll('.game-cards');

/*----- state variables -----*/
let hasFlippedCard = false;
let lockBoard = false;
let firstCard;
let secondCard;
let flips = 0;
let timer; // New variable for the timer
let elapsedSeconds = 0;
let gameStart = false;

/*----- cached elements  -----*/


/*----- event listeners -----*/
cards.forEach(card => card.addEventListener('click', flipCard));
cards.forEach(card => card.addEventListener('click', playFlipSound));
/*----- functions -----*/

// Update the timer display
function updateTimerDisplay() {
    const timerDisplay = document.getElementById('timer');
    if (timerDisplay) {
        timerDisplay.textContent = `Time: ${elapsedSeconds}s`;
    }
}

// Start the timer
function startTimer() {
    console.log(elapsedSeconds)
    timer = setInterval(() => {
        elapsedSeconds++;
        updateTimerDisplay();
    }, 1000);

}

// Stop the timer
function stopTimer() {
    clearInterval(timer);
}


//function to flip two cards
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard)
        return;
    if(!gameStart){
        startTimer()
        gameStart = true;
    }
    this.classList.add('flip');

    if (!hasFlippedCard) {
        //first click
        hasFlippedCard = true;
        firstCard = this;
        flips++; // Increment flips counter
        updateFlipsDisplay(); //Update the display of flips
        // startTimer();
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
    //do cards match?
    let isMatch = firstCard.dataset.image === secondCard.dataset.image;

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


//function to reset board 
//heveloper.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignmentttps://d
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}


function updateFlipsDisplay() {
    const flipsDisplay = document.getElementById('flips');
    if (flipsDisplay) {
        flipsDisplay.textContent = `Flips: ${flips}`;
    }
}

// function to shuffle cards
(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos
    });
})(); //immediately invoked function expression


function restartGame() {
    // Reload the page to restart the game
    location.reload();
}

// Function to play the card flip sound
function playFlipSound() {
    const flipSound = document.getElementById('flipSound');
    flipSound.play();
}

// Function to play the crowd cheering when the game is won
function playWinningSound() {
    const winSound = document.getElementById('winSound');
    winSound.play();
}

// Function to show the winning message
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
        }, 1500)
        playWinningSound();
    }

}


