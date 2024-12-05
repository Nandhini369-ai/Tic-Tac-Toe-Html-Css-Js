const cells = document.querySelectorAll(".cell");
const status = document.getElementById('status'); 
const resetBtn = document.getElementById('resetBtn'); 

let currentPlayer = 'X';
let gameActive = true;
let board = ['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute("data-index");

    if (board[index] !== '' || !gameActive) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add('taken');  

    
    checkResult();
    switchPlayer();
}

function checkResult() {
    let winner = null;

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            winner = currentPlayer;
            break;
        }
    }

    if (winner) {
        status.textContent = `${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (!board.includes('')) {
        status.textContent = 'It\'s a draw!'; 
        gameActive = false;
        return;
    }
}


function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
   
}

function restartGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    status.textContent = ''; 

    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken');
    });
}
cells.forEach(cell => cell.addEventListener('click', handleCellClick));

resetBtn.addEventListener('click', restartGame);
