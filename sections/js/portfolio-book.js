// portfolio-book.js
function flipBook(elBook) {
  elBook.style.setProperty("--c", 1);

  elBook.querySelectorAll(".page").forEach((page, idx) => {
    page.style.setProperty("--i", idx);

    page.addEventListener("click", (evt) => {
      if (evt.target.closest("a")) return;

      const curr = evt.target.closest(".back") ? idx : idx + 1;
      elBook.style.setProperty("--c", curr);
    });
  });
}

// Auto-initialize if the page already has book elements
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".book").forEach(flipBook);
});

// Expose it globally for use in main.js after dynamic HTML loading
window.flipBook = flipBook;
