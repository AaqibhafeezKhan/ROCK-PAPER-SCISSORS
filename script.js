const playerScoreElem = document.getElementById("player-score");
const computerScoreElem = document.getElementById("computer-score");
const resultMessageElem = document.getElementById("result");
const restartButton = document.getElementById("restart-btn");
const choices = document.querySelectorAll(".choice");

let playerScore = 0;
let computerScore = 0;
const totalRounds = 5;

const choicesArray = ["rock", "paper", "scissors"];

choices.forEach(choice => {
    choice.addEventListener("click", function () {
        const playerChoice = this.id;
        const computerChoice = getComputerChoice();
        const winner = determineWinner(playerChoice, computerChoice);
        updateScores(winner);
        checkGameOver();
    });
});

restartButton.addEventListener("click", restartGame);

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choicesArray.length);
    return choicesArray[randomIndex];
}

function determineWinner(player, computer) {
    if (player === computer) {
        return "tie";
    }

    if (
        (player === "rock" && computer === "scissors") ||
        (player === "scissors" && computer === "paper") ||
        (player === "paper" && computer === "rock")
    ) {
        return "player";
    } else {
        return "computer";
    }
}

function updateScores(winner) {
    if (winner === "player") {
        playerScore++;
        resultMessageElem.textContent = "You won this round!";
    } else if (winner === "computer") {
        computerScore++;
        resultMessageElem.textContent = "Computer won this round!";
    } else {
        resultMessageElem.textContent = "It's a tie!";
    }

    playerScoreElem.textContent = playerScore;
    computerScoreElem.textContent = computerScore;
}

function checkGameOver() {
    if (playerScore === 3 || computerScore === 3) {
        resultMessageElem.textContent = playerScore === 3 ? "You won the game!" : "Computer won the game!";
        disableChoices();
        restartButton.classList.remove("hidden");
    }
}

function disableChoices() {
    choices.forEach(choice => {
        choice.disabled = true;
    });
}

function restartGame() {
    playerScore = 0;
    computerScore = 0;
    playerScoreElem.textContent = 0;
    computerScoreElem.textContent = 0;
    resultMessageElem.textContent = "First to 3 wins!";
    choices.forEach(choice => {
        choice.disabled = false;
    });
    restartButton.classList.add("hidden");
}
