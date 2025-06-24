const grid = document.getElementById("grid");

// Map section names to grid positions
const positions = {
  home: { row: 0, col: 0 },
  portfolio: { row: 0, col: 2 },
  about: { row: 1, col: 1 },
  contact: { row: 1, col: 3 }
};

let currentSection = "home";
let previousSection = "home";

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
    moveGrid(target.row, target.col);
    currentSection = target.section;
  }, delay);
}

// Go to a section by name, with special case handling
function goTo(section) {
  const pos = positions[section];
  if (!pos) return;
  const prevPos = positions[currentSection];
  previousSection = currentSection;

  // Special case: move to (0,3) first if moving between (x,2) and (x,3)
  if (
    (prevPos.col === 2 && pos.col === 3) ||
    (prevPos.col === 3 && pos.col === 2)
  ) {
    handleIntermediateMove({ row: 0, col: 3 }, { ...pos, section });
    currentSection = section;
    return;
  }

  // Special case: move to (1,0) first if moving between (x,1) and (x,0)
  if (
    (prevPos.col === 1 && pos.col === 0) ||
    (prevPos.col === 0 && pos.col === 1)
  ) {
    handleIntermediateMove({ row: 1, col: 0 }, { ...pos, section });
    currentSection = section;
    return;
  }

  moveGrid(pos.row, pos.col);
  currentSection = section;
}

// Attach event listeners to nav buttons (assumes data-section attribute)
document.querySelectorAll("nav button").forEach((btn) => {
  btn.addEventListener("click", () => {
    goTo(btn.dataset.section);
  });
});

// Initialize to Home
goTo("home");
