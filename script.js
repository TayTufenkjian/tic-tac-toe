document.addEventListener('DOMContentLoaded', () => {

    // Create and display an empty 3x3 grid
    const gameBoard = (() => {
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
    
})