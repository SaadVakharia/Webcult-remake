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

  // Update magic menu active state
  document.querySelectorAll('.mg-list').forEach(li => {
    if (li.getAttribute('onclick')?.includes(`goTo('${section}'`)) {
      li.classList.add('active');
    } else {
      li.classList.remove('active');
    }
  });
}

function updateViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  // Realign grid to current section with new dimensions
  const pos = positions[currentSection.toLowerCase()];
  if (pos) {
    moveGrid(pos.row, pos.col);
  }
}

window.addEventListener('resize', updateViewportHeight);
window.addEventListener('orientationchange', updateViewportHeight);
updateViewportHeight(); // Call on load

window.addEventListener('load', () => {
  setTimeout(() => window.scrollTo(0, 1), 100);
});

// Initialize view
goTo("home");
