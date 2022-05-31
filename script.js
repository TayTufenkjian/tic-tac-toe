document.addEventListener('DOMContentLoaded', () => { 
    // Listen for a click on the Start New Game button
    let startButton = document.getElementById('start');
    startButton.addEventListener('click', () => {
        // Clear name inputs, game board, game result
        document.getElementById('players').textContent = '';
        document.getElementById('game-result').textContent = '';
        document.getElementById('game-board').textContent = '';
        // Allow user to enter player names
        showPlayerNameInputs();
        let enterButton = document.querySelector('#players button');
        let player1, player2;
        enterButton.addEventListener('click', () => {
            player1 = document.getElementById('namePlayer1').value;
            player2 = document.getElementById('namePlayer2').value;
            // Start the game with those player names
            playGame(player1, player2);
        });
    })
});


// Module to create, display, and update the board grid
const GameBoard = (() => {
    let grid;

    // Create a clean grid
    function createGrid() {     
        grid = [
                ['','',''], 
                ['','',''], 
                ['','',''], 
            ];

        let boardDiv = document.getElementById('game-board');
        boardDiv.innerHTML = '';

        let rowIndex = 0;     
        for (col of grid) {
            let colIndex = 0;
            for (row of col) {
                let square = document.createElement('div');
                square.className = 'grid-square';
                square.dataset.row = rowIndex;
                square.dataset.col = colIndex;
                boardDiv.append(square);
                colIndex += 1;
            }
            rowIndex += 1;
        };     
    } 

    // Store a symbol in one cell of the grid
    function addToGrid(char, row, col) {
        grid[row][col] = char;
    }

    // Get the value from a cell in the grid
    function getFromGrid(i, j) {
        return grid[i][j];
    }

    return {addToGrid, getFromGrid, createGrid};
})();


// Create and display fields so the user can enter player names
function showPlayerNameInputs() {
    let playersDiv = document.getElementById('players');
    let divPlayer1 = document.createElement('div');
    let divPlayer2 = document.createElement('div');

    // Create input and label for the name of player1 
    let nameInput1 = document.createElement('input');
    nameInput1.id = 'namePlayer1';
    let nameLabel1 = document.createElement('label');
    nameLabel1.setAttribute('for', nameInput1.id);
    nameLabel1.textContent = 'Name of Player 1:';
    divPlayer1.append(nameLabel1, nameInput1);

    // Create input and label for the name of player2
    let nameInput2 = document.createElement('input');
    nameInput2.id = 'namePlayer2';
    let nameLabel2 = document.createElement('label');
    nameLabel2.setAttribute('for', nameInput2.id);
    nameLabel2.textContent = 'Name of Player 2:';
    divPlayer2.append(nameLabel2, nameInput2);

    // Create button to enter names
    let enterButton = document.createElement('button');
    enterButton.textContent = 'Enter names';

    playersDiv.append(divPlayer1, divPlayer2, enterButton);   
}


// Factory function to create players
const Player = (name, playSymbol) => {
    return {name, playSymbol};
};


 // Function to handle game play
function playGame(name1, name2) {    
    // Clear name input fields
    let playersDiv = document.getElementById('players');
    playersDiv.textContent = '';

    // Create players
    const player1 = Player(name1, 'X');
    const player2 = Player(name2, 'O');

    // Display player names
    let players = document.createElement('h2');
    players.textContent = `${player1.name} vs ${player2.name}`;
    playersDiv.append(players);

    // Create a clean grid
    GameBoard.createGrid();

    // Player 1 goes first
    let currentPlayer = player1;

    // Initialize the count of plays
    let playCounter = 0;

    // Function to display game result
    function showGameResult(winner) {
        let resultDiv = document.getElementById('game-result');
        resultDiv.textContent = (winner === 'tie' ? 'It\'s a tie' : `${winner.name} wins!`);
    }

    // Listen for click on each grid square
    let squares = document.querySelectorAll('.grid-square');
    squares.forEach(square => square.addEventListener('click', (event) => {

            // Get the square that was clicked
            let targetSquare = event.target;

            // Make sure that square is empty
            if (targetSquare.textContent === '') {

                // Mark the square with the player's symbol
                // Add the player's symbol to the board array
                if (currentPlayer === player1) {
                    targetSquare.textContent = player1.playSymbol;
                    targetSquare.classList.add('player1');
                    currentPlayer = player2;
                } else {
                    targetSquare.textContent = player2.playSymbol;
                    targetSquare.classList.add('player2');
                    currentPlayer = player1;
                }
                GameBoard.addToGrid(targetSquare.textContent, targetSquare.dataset.row, targetSquare.dataset.col);
                playCounter += 1;

                // After the fifth play, there are three Xs on the board
                // so at that point we should check for a win
                if (playCounter >= 5) {

                    let winner;

                    // Check rows
                for (let i = 0; i < 3; i++) {
                    let rowString = '';
                    for (let j = 0; j < 3; j++) {
                        switch (GameBoard.getFromGrid(i, j)) {
                            case 'X':
                                rowString += 'X';
                                break;
                                case 'O':
                                    rowString += 'O';
                                    break;
                                default:
                                    break;
                        }
                    }
                    switch (rowString) {
                        case 'XXX':
                            winner = player1;
                            break;
                            case 'OOO':
                                winner = player2;
                                break;
                            default:
                                break;
                    }
                }

                    // Check columns
                    for (let i = 0; i < 3; i++) {
                        let colString = '';
                        for (let j = 0; j < 3; j++) {
                            switch (GameBoard.getFromGrid(j, i)) {
                                case 'X':
                                    colString += 'X';
                                    break;
                                case 'O':
                                    colString += 'O';
                                    break;
                                default:
                                    break;
                            }
                        }
                        switch (colString) {
                            case 'XXX':
                                winner = player1;
                                break;
                            case 'OOO':
                                winner = player2;
                                break;
                            default:
                                break;
                        }
                    }

                    // Check diagonals
                    let diagonalString1 = `${GameBoard.getFromGrid(0, 0)}${GameBoard.getFromGrid(1, 1)}${GameBoard.getFromGrid(2, 2)}`;
                    let diagonalString2 = `${GameBoard.getFromGrid(2, 0)}${GameBoard.getFromGrid(1, 1)}${GameBoard.getFromGrid(0, 2)}`;
                    if (diagonalString1 === 'XXX' || diagonalString2 === 'XXX') {
                        winner = player1;
                    } else if (diagonalString1 === 'OOO' || diagonalString2 === 'OOO') {
                        winner = player2;
                    } else {
                        // pass
                    }

                    if (winner) {
                        showGameResult(winner);
                    }

                    // If there is no winner and the game is over, then it's a tie
                    if (!winner && playCounter === 9) {
                        showGameResult('tie');
                    }
                }
            }
        })
    )
};   