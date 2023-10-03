const startButton = document.getElementById("startButton");
const rules = document.getElementById("rules");
const rollButton = document.getElementById("rollButton");
const message = document.getElementById("message");

let playerPosition = 1; // starting position for the player.
let computerPosition = 1; // Starting position for the computer.

const snakes = {

    16: 6,
    48: 26,
    52: 29,
    55: 45,
    64: 60,
    62: 18,
    87: 24,
    92: 88,
    95: 75,
    98: 78,
};

// function to roll the dice.
function rollDice() {
    return Math.floor(Math.random() * 6) + 1; // Roll a 6-sided die
}


// Function to play a turn for the player.
function playPlayerTurn() {
    function playerRoll() {
        const roll = rollDice();
        message.textContent = "Player rolled a " + roll;
        if (roll === 6) {
            message.textContent += "Player rolled a 6! Roll again!";
            setTimeout(playerRoll, 1000);
        }
        else {
            playerPosition += roll;
            if (snakes[playerPosition]) {
                playerPosition = snakes[playerPosition];
                message.textContent = "You landed on a snake's head. You are not at the position " + playerPosition;
            }
            else {
                message.textContent = "Player is at position " + playerPosition;
            }
            checkWin();
            if (gameOver && playerPosition !== 100) {
                setTimeout(playComputerTurn, 1000);
            }
        }
    }
    playerRoll();
}

// Function to play a turn for the computer.

function playComputerTurn() {
    function computerRoll() {
        const roll = rollDice();
        message.textContent = "Computer rolled a " + roll;

        if (roll === 6) {
            message.textContent += "Computer rolled a 6! Roll again!";
            setTimeout(computerRoll, 1000); // Delay the next roll for 1 second
        } else {
            computerPosition += roll;
            if (snakes[computerPosition]) {
                computerPosition = snakes[computerPosition];
                message.textContent = "Oops! Computer landed on a snake's head. Computer is now at position " + computerPosition;
            } else {
                message.textContent = "Computer is at position " + computerPosition;
            }
            checkWin();
        }
    }

    computerRoll(); // Start the first roll
}

// Function to check if the game is won.
let gameOver = false;
function checkWin() {

    if (playerPosition === 100) {
        message.textContent = "Congratulations! You've won!";
        gameOver = true;
        rollButton.disabled = true;
        showStartButtonAndRules();

    }
    else if (computerPosition === 100) {
        message.textContent = "The computer has won the game.";
        gameOver = true;
        rollButton.disabled = true;
        showStartButtonAndRules();
    }
}

// event listener to begin the game.
startButton.addEventListener("click", () => {
    startGame();
});

// Functions to start the game;

function startGame() {
    startButton.style.display = "none";
    rules.style.display = "none";

    playPlayerTurn();
}

// Function to revert everything back after the game is done.
function showStartButtonAndRules() {
    startButton.style.display = "block";
    rules.style.display = "block";

}
