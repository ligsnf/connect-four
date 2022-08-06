// Script for web connect 4 game

var playerRed = "R";
var playerYellow = "Y";
var currentPlayer = playerRed;

var gameOver = false;
var board;
var currentColumns;

var rows = 6;
var columns = 7;

window.onload = function() {
    setGame();
}

function setGame() {
    document.getElementById("board").innerHTML = ""; // empty board for reset
    currentPlayer = playerRed;
    gameOver = false;

    let status = document.getElementById("status-container");
    status.classList.remove("yellow-background");
    status.classList.remove("grey-background");
    status.classList.add("red-background");

    // reset board and column state on js side
    board = [];
    currentColumns = [5, 5, 5, 5, 5, 5, 5];

    let currentTurn = document.getElementById("game-status");
    currentTurn.innerText = "Red's Turn";

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            // JS Code
            row.push(' ');

            // HTML Code - <div id="0-0" class="tile"></div>
            let tile = document.createElement("div"); // created div for each cell in board
            tile.id = r.toString() + "-" + c.toString(); // gives id to html div of board coordinate, e.g. '3-4'
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            tile.addEventListener("mouseenter", addHoverPiece);
            tile.addEventListener("mouseleave", removeHoverPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}

function setPiece() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split("-"); // "0-0" -> ["0", "0"]
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    r = currentColumns[c];
    // Checking if column is full
    if (r < 0) {
        return;
    }

    board[r][c] = currentPlayer; // update board on js side
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    let status = document.getElementById("status-container");
    let currentTurn = document.getElementById("game-status");
    if (currentPlayer == playerRed) {
        tile.classList.remove("red-piece-next"); // remove hover
        tile.classList.add("red-piece");
        currentPlayer = playerYellow;
        status.classList.remove("red-background");
        status.classList.add("yellow-background");
        currentTurn.innerText = "Yellow's Turn";
    }
    else {
        tile.classList.remove("yellow-piece-next");
        tile.classList.add("yellow-piece");
        currentPlayer = playerRed;
        status.classList.remove("yellow-background");
        status.classList.add("red-background");
        currentTurn.innerText = "Red's Turn";
    }

    // Update current state of columns
    r -= 1;
    currentColumns[c] = r;

    // Check for a winner
    checkWinner();

    // Begin next hover
    tile = document.getElementById(r.toString() + "-" + c.toString());
    if (currentPlayer == playerRed) {
        tile.classList.add("red-piece-next");
    }
    else {
        tile.classList.add("yellow-piece-next");
    }
}

function addHoverPiece() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split("-"); // "0-0" -> ["0", "0"]
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    r = currentColumns[c];
    // Checking if column is full
    if (r < 0) {
        return;
    }

    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if (currentPlayer == playerRed) {
        tile.classList.add("red-piece-next");
    }
    else {
        tile.classList.add("yellow-piece-next");
    }
}

function removeHoverPiece() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split("-"); // "0-0" -> ["0", "0"]
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    r = currentColumns[c];
    // Checking if column is full
    if (r < 0) {
        return;
    }

    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if (currentPlayer == playerRed) {
        tile.classList.remove("red-piece-next");
    }
    else {
        tile.classList.remove("yellow-piece-next");
    }
}

function checkWinner() {
    // Check Horizontal
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++){
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // Check Vertical
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // Check Diagonal (top-left to bottom-right direction)
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // Check Diagonal (bottom-left to top-right direction)
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // Check Draw
    const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);
    if (equals(currentColumns, [-1, -1, -1, -1, -1, -1, -1])) {
        document.getElementById("game-status").innerText = "Draw";
        document.getElementById("status-container").classList.remove("red-background");
        document.getElementById("status-container").classList.remove("yellow-background");
        document.getElementById("status-container").classList.add("grey-background");
        setTimeout("alert('Draw!')",100);
        gameOver = true;
    }

}

function setWinner(r, c) {
    let winner = document.getElementById("game-status");
    let status = document.getElementById("status-container");
    if (board[r][c] == playerRed) {
        winner.innerText = "Red Wins";
        status.classList.remove("yellow-background");
        status.classList.add("red-background");
        setTimeout("alert('Red Won!')",100);
    } else {
        winner.innerText = "Yellow Wins";
        status.classList.remove("red-background");
        status.classList.add("yellow-background");
        setTimeout("alert('Yellow Won!')",100);
    }

    gameOver = true;
}