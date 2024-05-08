
var mainBoard;
var playerO = "O";
var playerX = "X";
var currPlayer = playerO;
var gameOver = false;

window.onload = function() {
    setGame();
}

function setGame() {
   mainBoard = [
                [' ', ' ', ' '],
                [' ', ' ', ' '],
                [' ', ' ', ' ']
            ]

    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            let innerBoard = document.createElement("div");
            innerBoard.id = r.toString() + "-" + c.toString();
            innerBoard.classList.add("innerBoard");
            if (r == 0 || r == 1) {
                innerBoard.classList.add("horizontal-line");
            }
            if (c == 0 || c == 1) {
                innerBoard.classList.add("vertical-line");
            }
            innerBoard.innerText = "";
            innerBoard.addEventListener("click", setTile);
            document.getElementById("mainBoard").appendChild(innerBoard);
        }
    }
}

function setTile() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split("-");    //ex) "1-2" -> ["1", "2'"]
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if (mainBoard[r][c] != ' ') { 
        //already taken spot
        return;
    }
    
    //mark the board
    mainBoard[r][c] = currPlayer; 
    //mark the board on html
    this.innerText = currPlayer; //mark the board on html

    //change players
    if (currPlayer == playerO) {
        currPlayer = playerX;
    }
    else {
        currPlayer = playerO;
    }

    //check winner
    checkWinner();
}


function checkWinner() {
    //horizontally, check 3 rows
    for (let r = 0; r < 3; r++) {
        if (mainBoard[r][0] == mainBoard[r][1] && mainBoard[r][1] == mainBboard[r][2] && mainBoard[r][0] != ' ') {
            //if we found the winning row
            //apply the winner style to that row
            for (let i = 0; i < 3; i++) {
                let tile = document.getElementById(r.toString() + "-" + i.toString());
                tile.classList.add("winner");
            }
            gameOver = true;
            return;
        }
    }

    //vertically, check 3 columns
    for (let c = 0; c < 3; c++) {
        if (mainBoard[0][c] == mainBoard[1][c] && mainBoard[1][c] ==  mainBoard[2][c] && mainBoard[0][c] != ' ') {
            //if we found the winning col
            //apply the winner style to that col
            for (let i = 0; i < 3; i++) {
                let tile = document.getElementById(i.toString() + "-" + c.toString());                
                tile.classList.add("winner");
            }
            gameOver = true;
            return;
        }
    }

    //diagonally
    if (mainBoard[0][0] == mainBoard[1][1] && mainBoard[1][1] == mainBoard[2][2] && mainBoard[0][0] != ' ') {
        for (let i = 0; i < 3; i++) {
            let tile = document.getElementById(i.toString() + "-" + i.toString());                
            tile.classList.add("winner");
        }
        gameOver = true;
        return;
    }

    //anti-diagonally
    if (mainBoard[0][2] == mainBoard[1][1] && mainBoard[1][1] == mainBoard[2][0] && mainBoard[0][2] != ' ') {
        //0-2
        let tile = document.getElementById("0-2");                
        tile.classList.add("winner");

        //1-1
        tile = document.getElementById("1-1");                
        tile.classList.add("winner");

        //2-0
        tile = document.getElementById("2-0");                
        tile.classList.add("winner");
        gameOver = true;
        return;
    }
}