const grid = document.getElementById("grid");
const viewport = document.getElementById("viewport");

// Map section names to 5x2 grid positions
const positions = {
  home: { row: 0, col: 0 },
  filler1: { row: 0, col: 1 },
  portfolio: { row: 0, col: 2 },
  filler2: { row: 0, col: 3 },
  services: { row: 0, col: 4 },
  filler3: { row: 1, col: 0 },
  about: { row: 1, col: 1 },
  contact: { row: 1, col: 3 },
  filler5: { row: 1, col: 4 },
};

let currentSection = "home";

// Maps section names to their corresponding filler positions
const fillerPositions = {
  home: positions.filler3,
  portfolio: positions.filler2,
  services: positions.filler5,
  about: { row: positions.portfolio.row + 1, col: positions.portfolio.col },
  contact: positions.filler1,
};

// Move the grid to a specific row and column
function moveGridTo(row, col) {
  const xOffset = col * window.innerWidth;
  const yOffset = row * window.innerHeight;
  grid.style.transform = `translate(-${xOffset}px, -${yOffset}px)`;
}

// Navigate to a specific section
function goToSection(sectionName) {
  const section = sectionName.toLowerCase();
  const targetPos = positions[section];
  if (!targetPos) return;

  if (section === currentSection) return;

  // Enable scrolling only for portfolio section
  viewport.style.overflowY = section === "portfolio" ? "auto" : "hidden";

  // Scroll to top if leaving portfolio
  if (currentSection === "portfolio") {
    viewport.scrollTo({ top: 0, behavior: "smooth" });

    // Wait for scroll to finish before moving the grid
    setTimeout(() => {
      // Move to intermediate filler position first (for transition effect)
      const intermediatePos = fillerPositions[section];
      if (intermediatePos) {
        moveGridTo(intermediatePos.row, intermediatePos.col);
      }

      // Move to the final target section after a delay
      setTimeout(() => {
        moveGridTo(targetPos.row, targetPos.col);
      }, 1250);

      currentSection = section;
    }, 500); // 500ms delay for smooth scroll
    return;
  }

  // Move to intermediate filler position first (for transition effect)
  const intermediatePos = fillerPositions[section];
  if (intermediatePos) {
    moveGridTo(intermediatePos.row, intermediatePos.col);
  }

  // Move to the final target section after a delay
  setTimeout(() => {
    moveGridTo(targetPos.row, targetPos.col);
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
