const grid = document.getElementById("grid");

let currentRow = 0;
let currentCol = 0;

let previousRow = 0;
let previousCol = 0;

// Helper to move grid to a specific cell
function moveGrid(row, col) {
  const x = col * window.innerWidth;
  const y = row * window.innerHeight;
  grid.style.transform = `translate(-${x}px, -${y}px)`;
}

// Handles special intermediate moves for certain transitions
function handleIntermediateMove(intermediate, target, delay = 1200) {
  moveGrid(intermediate.row, intermediate.col);
  setTimeout(() => {
    currentRow = target.row;
    currentCol = target.col;
    moveGrid(target.row, target.col);
  }, delay);
}

function goTo(row, col) {
  previousRow = currentRow;
  previousCol = currentCol;

  // Special case: move to (0,3) first if moving between (x,2) and (x,3)
  if (
    (previousCol === 2 && col === 3) ||
    (previousCol === 3 && col === 2)
  ) {
    handleIntermediateMove(
      { row: 0, col: 3 },
      { row, col }
    );
    return;
  }

  // Special case: move to (1,0) first if moving between (x,1) and (x,0)
  if (
    (previousCol === 1 && col === 0) ||
    (previousCol === 0 && col === 1)
  ) {
    handleIntermediateMove(
      { row: 1, col: 0 },
      { row, col }
    );
    return;
  }

  currentRow = row;
  currentCol = col;
  moveGrid(row, col);
}

// Example: get current position
function getCurrentPosition() {
  return { row: currentRow, col: currentCol };
}

// Attach event listeners to nav buttons
document.querySelectorAll("nav button").forEach((btn) => {
  btn.addEventListener("click", () => {
    goTo(Number(btn.dataset.row), Number(btn.dataset.col));
  });
});

// Initialize to Home
goTo(0, 0);
