const grid = document.getElementById("grid");

// Map section names to 5x2 grid positions
const positions = {
  home: { row: 0, col: 0 },
  filler1: { row: 0, col: 1 },
  portfolio: { row: 0, col: 2 },
  filler2: { row: 0, col: 3 },
  services: { row: 0, col: 4 },
  filler3: { row: 1, col: 0 },
  about: { row: 1, col: 1 },
  filler4: { row: 1, col: 2 },
  contact: { row: 1, col: 3 },
  filler5: { row: 1, col: 4 },
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
  switch (section.toLowerCase()) {
    case "home":
      if (currentSection === "home") return;
      moveGrid(positions.filler3.row, positions.filler3.col);
      break;
    case "portfolio":
      if (currentSection === "portfolio") return;
      moveGrid(positions.filler2.row, positions.filler2.col);
      break;
    case "services":
      if (currentSection === "services") return;
      moveGrid(positions.filler5.row, positions.filler5.col);
      break;
    case "about":
      if (currentSection === "about") return;
      moveGrid(positions.filler4.row, positions.filler4.col);
      break;
    case "contact":
      if (currentSection === "contact") return;
      moveGrid(positions.filler1.row, positions.filler1.col);
      break;
  }
  setTimeout(() => {
    moveGrid(pos.row, pos.col);
  }, 1250);
  currentSection = section;
}

function updateViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  // Realign grid to current section with new dimensions
  const pos = positions[currentSection.toLowerCase()];
  if (pos) {
    moveGrid(pos.row, pos.col);
  }
}

window.addEventListener("resize", updateViewportHeight);
window.addEventListener("orientationchange", updateViewportHeight);
updateViewportHeight(); // Call on load

window.addEventListener("load", () => {
  setTimeout(() => window.scrollTo(0, 1), 100);
});

// Initial grid position based on current section
moveGrid(positions.home.row, positions.home.col);

// Responsive menu slide-in/out for mobile
document.addEventListener("DOMContentLoaded", () => {
  const navMenu = document.querySelector(".navigation-menu");
  if (!navMenu) return;
  const menuTab = navMenu.querySelector(".menu-tab");

  // Toggle menu when clicking the tab
  if (menuTab) {
    menuTab.addEventListener("click", function (e) {
      e.stopPropagation();
      navMenu.classList.toggle("menu-visible");
      document.getElementById("pen-obj").classList.toggle("menu-visible");
    });
  }

  // Show menu when clicking the menu itself (if hidden)
  navMenu.addEventListener("click", function (e) {
    if (!navMenu.classList.contains("menu-visible")) {
      navMenu.classList.add("menu-visible");
      document.getElementById("pen-obj").classList.add("menu-visible");
      e.stopPropagation();
    } else {
      // Hide menu after delay if menu item clicked
      if (e.target.tagName === "LI" || e.target.closest("li")) {
        setTimeout(() => {
          navMenu.classList.remove("menu-visible");
          document.getElementById("pen-obj").classList.remove("menu-visible");
        }, 800);
      }
    }
  });

  // Optional: clicking outside the menu also hides it
  document.addEventListener("click", function (e) {
    if (
      navMenu.classList.contains("menu-visible") &&
      !navMenu.contains(e.target)
    ) {
      navMenu.classList.remove("menu-visible");
      document.getElementById("pen-obj").classList.remove("menu-visible");
    }
  });
});
