let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const statusText = document.getElementById("status");
const cells = document.querySelectorAll(".cell");

const winningCombos = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // columns
  [0,4,8], [2,4,6]           // diagonals
];

cells.forEach(cell => cell.addEventListener("click", cellClick));

function cellClick(e) {
  const index = e.target.getAttribute("data-index");

  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin()) {
    statusText.textContent = `${currentPlayer} wins!`;
    gameActive = false;
  } else if (board.every(cell => cell !== "")) {
    statusText.textContent = "Draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "Y" : "X";
    statusText.textContent = `Current Player: ${currentPlayer}`;
  }
}

function checkWin() {
  return winningCombos.some(combo => {
    return combo.every(i => board[i] === currentPlayer);
  });
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  statusText.textContent = `Current Player: ${currentPlayer}`;
  cells.forEach(cell => cell.textContent = "");
}
