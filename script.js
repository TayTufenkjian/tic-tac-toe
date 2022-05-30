document.addEventListener('DOMContentLoaded', () => {

    // Module to create and display an empty 3x3 grid
    const GameBoard = (() => {
        let grid = [
                ['','',''], 
                ['','',''], 
                ['','',''], 
            ];

        let boardDiv = document.getElementById('game-board');

        for (row of grid) {
            for (col of row) {
                let square = document.createElement('div');
                square.className = 'grid-square'
                boardDiv.append(square);
            }
        };      
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

        // Listen for click on each grid square
        let squares = document.querySelectorAll('.grid-square');
        squares.forEach(square => square.addEventListener('click', (event) => {
                let targetSquare = event.target;
                if (currentPlayer === player1) {
                    targetSquare.textContent = player1.playSymbol;
                    currentPlayer = player2;
                } else {
                    targetSquare.textContent = player2.playSymbol;
                    currentPlayer = player1;
                }
            })
        )
    })();

});