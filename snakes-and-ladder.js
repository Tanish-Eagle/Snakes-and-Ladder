const startButton = document.getElementById("startButton");
const rollButton = document.getElementById("rollButton");
const rules = document.getElementById("rules");
const playerMessage = document.getElementById("playerMessage");
const computerMessage = document.getElementById("computerMessage");

let playerPosition = 1; // Starting position for the player.
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

// Function to roll the dice.
function rollDice() {
    return Math.floor(Math.random() * 6) + 1; // Roll a 6-sided die
}

// Function to play a turn for the player.
// Function to play a turn for the player.
function playPlayerTurn() {
    const roll = rollDice();
    playerMessage.textContent = "Player rolled a " + roll;

    if (roll === 6) {
        playerMessage.textContent += " Player rolled a 6! Roll again!";
        setTimeout(playPlayerTurn, 1000);
    } else {
        const newPosition = playerPosition + roll;
        if (newPosition <= 100) {
            playerPosition = newPosition;
            if (snakes[playerPosition]) {
                playerPosition = snakes[playerPosition];
                playerMessage.textContent = "You landed on a snake's head. You are now at position " + playerPosition;
            } else {
                playerMessage.textContent = "Player is at position " + playerPosition;
            }
            checkWin();
            if (!gameOver && playerPosition !== 100) {
                setTimeout(playComputerTurn, 1000);
            }
        } else {
            // Player can't move beyond 100, wait for the next turn.
            playerMessage.textContent = "Player is at position " + playerPosition;
        }
    }
}

// Function to play a turn for the computer.
// Function to play a turn for the computer.
// Function to play a turn for the computer.
function playComputerTurn() {
    function computerRoll() {
        const roll = rollDice();
        computerMessage.textContent = "Computer rolled a " + roll;

        if (roll === 6) {
            computerMessage.textContent += " Computer rolled a 6! Roll again!";
            setTimeout(computerRoll, 1000); // Delay the next roll for 1 second
        } else {
            const newPosition = computerPosition + roll;
            if (newPosition <= 100) {
                computerPosition = newPosition;
                if (snakes[computerPosition]) {
                    computerPosition = snakes[computerPosition];
                    computerMessage.textContent = "Oops! Computer landed on a snake's head. Computer is now at position " + computerPosition;
                } else {
                    computerMessage.textContent = "Computer is at position " + computerPosition;
                }
            }
            checkWin(); // Check for a win condition after the computer's turn
        }
    }

    computerRoll(); // Start the first roll
}

// Function to check if the game is won.
let gameOver = false;
function checkWin() {
    if (playerPosition === 100) {
        playerMessage.textContent = "Congratulations! You've won!";
        gameOver = true;
        rollButton.style.display = "none";
        showStartButtonAndRules();
    } else if (computerPosition === 100) {
        computerMessage.textContent = "The computer has won the game.";
        gameOver = true;
        rollButton.style.display = "none";
        showStartButtonAndRules();
    }
}

// Event listener to begin the game.
startButton.addEventListener("click", () => {
    startGame();
});

// Event listener for the "Roll dice button".

rollButton.addEventListener("click", () => {
    playPlayerTurn();
});

// Function to start the game.
function startGame() {
    startButton.style.display = "none";
    rules.style.display = "none";
    rollButton.style.display = "block";
    playPlayerTurn();
}

// Function to revert everything back after the game is done.
function showStartButtonAndRules() {
    startButton.style.display = "block";
    rules.style.display = "block";
}
