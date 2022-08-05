

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
            document.getElementById("board").append(tile);
        }
    }
}
