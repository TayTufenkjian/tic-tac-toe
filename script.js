document.addEventListener('DOMContentLoaded', () => {

    // Module to create and display a 3x3 grid
    const GameBoard = (() => {
        let grid = [
                ['','',''], 
                ['','',''], 
                ['','',''], 
            ];

        let boardDiv = document.getElementById('game-board');

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

        // Function for storing a symbol in the grid
        function addToGrid(char, row, col) {
            grid[row][col] = char;
        }

        return {addToGrid};
    })();

    // Factory function to create players
    const Player = (name, playSymbol) => {
        return {name, playSymbol};
    };

    // Module to handle game play
    const Game = (() => {
        const player1 = Player('player1', 'X');
        const player2 = Player('player2', 'O');

        // Player 1 goes first
        let currentPlayer = player1;

        // Initialize the count of plays
        let playCounter = 0;

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
                        currentPlayer = player2;
                    } else {
                        targetSquare.textContent = player2.playSymbol;
                        currentPlayer = player1;
                    }
                    GameBoard.addToGrid(targetSquare.textContent, targetSquare.dataset.row, targetSquare.dataset.col);
                    playCounter += 1;

                    // After the fifth play, there are three Xs on the board
                    // so at that point we should check for a win
                    if (playCounter >= 5) {

                        // Check rows

                        // Check columns

                        // Check diagonal
                    }

                }
            })
        )


    })();

});

/* 

[0, 0] [0, 1] [0, 2]
[1, 0] [1, 1] [1, 2]
[2, 0] [2, 1] [2, 2]

*/