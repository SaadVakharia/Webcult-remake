const grid = document.getElementById("grid");

// Map section names to 3x3 grid positions
const positions = {
  home: { row: 0, col: 0 },
  filler1: { row: 0, col: 1 },
  about: { row: 0, col: 2 },
  filler2: { row: 1, col: 0 },
  portfolio: { row: 1, col: 1 },
  filler3: { row: 1, col: 2 },
  contact: { row: 2, col: 0 },
  filler4: { row: 2, col: 1 },
  services: { row: 2, col: 2 }
};

let currentSection = "home";

// Move grid to specified row and column
function moveGrid(row, col) {
  const x = col * window.innerWidth;
  const y = row * window.innerHeight;
  grid.style.transform = `translate(-${x}px, -${y}px)`;
}

// Go to a section by name
function goTo(section) {
  const pos = positions[section.toLowerCase()];
  if (!pos) return;
  moveGrid(pos.row, pos.col);
  currentSection = section;
}

// Attach nav button event listeners
document.querySelectorAll("nav button").forEach((btn) => {
  btn.addEventListener("click", () => {
    goTo(btn.dataset.section);
  });
});

// Initialize view
goTo("home");
