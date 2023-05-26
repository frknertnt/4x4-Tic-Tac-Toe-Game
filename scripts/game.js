function resetGameStatus() {
    activePlayer = 0;
    currentRound = 1;
    gameIsOver = false;
    gameOverElement.firstElementChild.innerHTML =
        "You Won, <span id=\"winner-name\">PLAYER NAME</span>!";
    gameOverElement.style.display = "none";

    let gameBoardIndex = 0;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            gameData[i][j] = 0;
            const gameBoardItemElement = gameBoardElement.children[gameBoardIndex];
            gameBoardItemElement.textContent="";
            gameBoardItemElement.classList.remove("disabled");
            gameBoardIndex++;
        }
    }
}

function startNewGame() {
    if (players[0].name === "" || players[1].name === "") {
        alert("Please set custom player names for both players!");
        return;
    }

    resetGameStatus();

    activePlayerNameElement.textContent = players[activePlayer].name;
    gameArea.style.display = "block";
}



function switchPlayer() {
    if (activePlayer === 0) {
        activePlayer = 1;
    } else {
        activePlayer = 0;
    }
    activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(event) {
    if (event.target.tagName !== "LI" || gameIsOver) {
        return;
    }

    const selectedField = event.target;
    const selectedColumn = selectedField.dataset.col - 1;
    const selectedRow = selectedField.dataset.row - 1;

    if (gameData[selectedRow][selectedColumn] > 0) {
        alert("Please select another field!");
        return;
    }

    selectedField.textContent = players[activePlayer].symbol; // player[0]
    selectedField.classList.add("disabled");

    gameData[selectedRow][selectedColumn] = activePlayer + 1;


    const winnerId = checkForGameOver();

    if (winnerId !== 0) {
        endGame(winnerId);
    }

    currentRound++;
    switchPlayer();
}

function checkForGameOver() {
    //Checking the rows equality
    for (let i = 0; i < 3; i++) {
        if (
            gameData[i][0] > 0 &&
            gameData[i][0] === gameData[i][1] &&
            gameData[i][1] === gameData[i][2]
        ) { return gameData[i][0]; }
        else if (
            gameData[i][1] > 0 &&
            gameData[i][1] === gameData[i][2] &&
            gameData[i][2] === gameData[i][3]
        ) { return gameData[i][1]; }
        else if (
            gameData[i + 1][0] > 0 &&
            gameData[i + 1][0] === gameData[i + 1][1] &&
            gameData[i + 1][1] === gameData[i + 1][2]
        ) { return gameData[i + 1][0]; }
        else if (
            gameData[i + 1][1] > 0 &&
            gameData[i + 1][1] === gameData[i + 1][2] &&
            gameData[i + 1][2] === gameData[i + 1][3]
        ) { return gameData[i + 1][1]; }


    }
    //Checking the column equality
    for (let i = 0; i < 3; i++) {
        if (
            gameData[0][i] > 0 &&
            gameData[0][i] === gameData[1][i] &&
            gameData[1][i] === gameData[2][i]
        ) { return gameData[0][i]; }
        else if (
            gameData[1][i] > 0 &&
            gameData[1][i] === gameData[2][i] &&
            gameData[2][i] === gameData[3][i]
        ) { return gameData[1][i]; }
        else if (
            gameData[1][i + 1] > 0 &&
            gameData[1][i + 1] === gameData[2][i + 1] &&
            gameData[2][i + 1] === gameData[3][i + 1]
        ) { return gameData[1][i + 1]; }
        else if (
            gameData[0][i + 1] > 0 &&
            gameData[0][i + 1] === gameData[1][i + 1] &&
            gameData[1][i + 1] === gameData[2][i + 1]
        ) { return gameData[0][i + 1]; }
    }
    //Diagonal: Top left to bottom right
    //First 
    if (gameData[0][0] > 0 &&
        gameData[0][0] === gameData[1][1] &&
        gameData[1][1] === gameData[2][2]
    ) { return gameData[0][0]; }
    //Second 
    if (gameData[0][1] > 0 &&
        gameData[0][1] === gameData[1][2] &&
        gameData[1][2] === gameData[2][3]
    ) { return gameData[0][1]; }
    //Third 
    if (gameData[1][0] > 0 &&
        gameData[1][0] === gameData[2][1] &&
        gameData[2][1] === gameData[3][2]
    ) { return gameData[1][0]; }
    //Fourth 
    if (gameData[1][1] > 0 &&
        gameData[1][1] === gameData[2][2] &&
        gameData[2][2] === gameData[3][3]
    ) { return gameData[1][1]; }

    //Diagonal Top right to bottom left
    //First
    if (gameData[0][3] > 0 &&
        gameData[0][3] === gameData[1][2] &&
        gameData[1][2] === gameData[2][1]
    ) { return gameData[0][3]; }
    //Second
    if (gameData[0][2] > 0 &&
        gameData[0][2] === gameData[1][1] &&
        gameData[1][1] === gameData[2][0]
    ) { return gameData[0][2]; }
    //Third
    if (gameData[1][3] > 0 &&
        gameData[1][3] === gameData[2][2] &&
        gameData[2][2] === gameData[3][1]
    ) { return gameData[1][3]; }
    //Fourth
    if (gameData[1][2] > 0 &&
        gameData[1][2] === gameData[2][1] &&
        gameData[2][1] === gameData[3][0]
    ) { return gameData[1][2]; }

    if (currentRound === 16) {
        return -1;
    }
    return 0;
}

function endGame(winnerId) {
    gameIsOver = true;
    gameOverElement.style.display = "block";

    if (winnerId > 0) {
        const winnerName = players[winnerId - 1].name;
        gameOverElement.firstElementChild.firstElementChild.textContent = winnerName;
    } else {
        gameOverElement.firstElementChild.textContent = "It's a draw!";
    }

}