// Set up initial scores
let playerScore = 0;
let computerScore = 0;

// Function to generate computer's choice
function computerPlay() {
    const choices = ["rock", "paper", "scissors"];
    return choices[Math.floor(Math.random() * choices.length)];
}

// Function to play one round
function playRound(playerSelection) {
    const computerSelection = computerPlay();
    let resultMessage = "";

    if (playerSelection === computerSelection) {
        resultMessage = `It's a tie! You both chose ${playerSelection}.`;
    } else if (
        (playerSelection === "rock" && computerSelection === "scissors") ||
        (playerSelection === "scissors" && computerSelection === "paper") ||
        (playerSelection === "paper" && computerSelection === "rock")
    ) {
        playerScore++;
        resultMessage = `You win this round! ${playerSelection} beats ${computerSelection}.`;
    } else {
        computerScore++;
        resultMessage = `You lose this round! ${computerSelection} beats ${playerSelection}.`;
    }

    updateScore(resultMessage);
    checkWinner();
}

// Function to update the score display
function updateScore(message) {
    const resultsDiv = document.getElementById("results");
    const scoreDiv = document.getElementById("score");

    resultsDiv.textContent = message;
    scoreDiv.textContent = `Player: ${playerScore} | Computer: ${computerScore}`;
}

// Function to check for the winner
function checkWinner() {
    if (playerScore === 5 || computerScore === 5) {
        const resultsDiv = document.getElementById("results");
        const buttons = document.querySelectorAll("button");

        if (playerScore === 5) {
            resultsDiv.textContent = "Congratulations! You won the game!";
        } else {
            resultsDiv.textContent = "Game over! The computer won the game!";
        }

        // Disable buttons after the game ends
        buttons.forEach(button => button.disabled = true);
    }
}

// Event listeners for buttons
function setupButtons() {
    const buttons = document.querySelectorAll("button");
    buttons.forEach(button => {
        button.addEventListener("click", (e) => {
            const playerSelection = e.target.id;
            playRound(playerSelection);
        });
    });
}

// Set up the UI
function setupUI() {
    const container = document.createElement("div");
    container.id = "game-container";

    const buttonsDiv = document.createElement("div");
    buttonsDiv.id = "buttons";

    ["rock", "paper", "scissors"].forEach(choice => {
        const button = document.createElement("button");
        button.id = choice;
        button.textContent = choice.charAt(0).toUpperCase() + choice.slice(1);
        buttonsDiv.appendChild(button);
    });

    const resultsDiv = document.createElement("div");
    resultsDiv.id = "results";
    resultsDiv.textContent = "Make your move!";

    const scoreDiv = document.createElement("div");
    scoreDiv.id = "score";
    scoreDiv.textContent = "Player: 0 | Computer: 0";

    container.appendChild(buttonsDiv);
    container.appendChild(resultsDiv);
    container.appendChild(scoreDiv);

    document.body.appendChild(container);

    setupButtons();
}

// Initialize the game
setupUI();
