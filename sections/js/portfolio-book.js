const flipBook = (elBook) => {
  // Initialize current page to 0
  elBook.style.setProperty("--c", 0);

  // Loop through each page and set its index
  elBook.querySelectorAll(".page").forEach((page, idx) => {
    page.style.setProperty("--i", idx);

    // Add click event to flip pages
    page.addEventListener("click", (evt) => {
      // Don't flip if a link was clicked
      if (evt.target.closest("a")) return;

      // Determine current page index based on which side is clicked
      const curr = evt.target.closest(".back") ? idx : idx + 1;

      // Set the --c CSS variable to flip the book
      elBook.style.setProperty("--c", curr);
    });
  });
};

// Initialize flipbook for each .book element on the page
document.querySelectorAll(".book").forEach(flipBook);
