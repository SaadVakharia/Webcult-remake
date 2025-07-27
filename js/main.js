// main.js
window.addEventListener("DOMContentLoaded", () => {
  const sections = ["home", "portfolio", "services", "about", "contact"];
  const fetchPromises = sections.map((section) =>
    fetch(`sections/html/${section}.html`)
      .then((res) =>
        res.ok ? res.text() : Promise.reject(`Failed to load ${section}.html`)
      )
      .then((data) => {
        const el = document.getElementById(section);
        if (el) el.innerHTML = data;

        switch (section) {
          case "home":
            if (typeof startHomeAnimation === "function") startHomeAnimation();
            break;
          case "portfolio":
            if (typeof flipBook === "function") {
              document.querySelectorAll(".book").forEach(flipBook);
            }
            if (typeof initPortfolioCards === "function") {
              initPortfolioCards();
            }
            break;
          case "contact":
            if (typeof initContactSwatches === "function")
              initContactSwatches();
            if (typeof initContactForm === "function") initContactForm();
            break;
          case "services":
            if (typeof initServices === "function") initServices();
            break;
          case "about":
            // Initialize about section if needed
            break;
        }
      })
      .catch((err) => {
        console.error(err);
        const el = document.getElementById(section);
        if (el) el.innerHTML = `<p>Could not load ${section}</p>`;
      })
  );

  // Wait for HTML content to load first
  Promise.all(fetchPromises).then(() => {
    // Now wait for all images to load
    const images = document.querySelectorAll('img');
    const imagePromises = Array.from(images).map(img => {
      return new Promise((resolve) => {
        if (img.complete) {
          resolve();
        } else {
          img.onload = resolve;
          img.onerror = resolve; // Still resolve on error to avoid hanging
        }
      });
    });

    // Also wait for background images in CSS
    const elementsWithBgImages = document.querySelectorAll('[style*="background-image"], .cell, .mobile-screen, .bezel');
    const bgImagePromises = Array.from(elementsWithBgImages).map(el => {
      return new Promise((resolve) => {
        const computedStyle = window.getComputedStyle(el);
        const bgImage = computedStyle.backgroundImage;
        
        if (bgImage && bgImage !== 'none' && bgImage.includes('url(')) {
          const url = bgImage.slice(4, -1).replace(/["']/g, "");
          const img = new Image();
          img.onload = resolve;
          img.onerror = resolve;
          img.src = url;
        } else {
          resolve();
        }
      });
    });

    // Wait for all images and background images to load
    Promise.all([...imagePromises, ...bgImagePromises]).then(() => {
      // Add a small delay for smooth transition
      setTimeout(() => {
        document.getElementById("loader").style.display = "none";
      }, 500);
    });
  });

  // Add a keydown event listener to handle the Tab key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      e.preventDefault(); // Prevent default tab behavior (focus change)
    }
  });
});
