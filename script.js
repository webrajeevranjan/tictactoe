const board = document.getElementById('board');
const message = document.getElementById('message');
const resultPopup = document.getElementById('result-popup');
const result = document.getElementById('result');
const newGameBtn = document.getElementById('newGameBtn');
const resetBtn = document.getElementById('resetBtn');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function renderBoard() {
    board.innerHTML = '';
    gameBoard.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.textContent = cell;
        cellElement.addEventListener('click', () => handleCellClick(index));
        board.appendChild(cellElement);
    });
}

function handleCellClick(index) {
    if (!gameActive || gameBoard[index] !== '') return;

    gameBoard[index] = currentPlayer;
    renderBoard();
    checkWinner();
    switchPlayer();
    updateMessage();
    document.getElementById('board').children[index].classList.add('cell-clicked');
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function updateMessage() {
    message.textContent = `Your turn, Player ${currentPlayer}`;
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            result.textContent = `Player ${currentPlayer} wins!`;
            showResultScreen();
            return;
        }
    }

    if (!gameBoard.includes('')) {
        gameActive = false;
        result.textContent = 'It\'s a draw!';
        showResultScreen();
    }
}

function showResultScreen() {
    resultPopup.style.display = 'block';
}

function newGame() {
    resultPopup.style.display = 'none';
    board.style.display = 'grid';
    message.style.display = 'block';
    resetGame();
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    result.textContent = '';
    document.querySelectorAll('.cell').forEach(cell => {
        cell.classList.remove('cell-clicked');
    });
    renderBoard();
    updateMessage();
}

// Initial render
renderBoard();
updateMessage();
