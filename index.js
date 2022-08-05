

var playerRed = "R";
var playerYellow = "Y";
var currentPlayer = playerRed;

var gameOver = false;
var board;

var rows = 6;
var columns = 7;

window.onload = function() {
    setGame();
}

function setGame() {
    board = [];

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

    board[r][c] = currentPlayer;
    let tile = this;
    if (currentPlayer == playerRed) {
        tile.classList.add("red-piece");
    }
    else {
        tile.classList.add("yellow-piece");
    }
}