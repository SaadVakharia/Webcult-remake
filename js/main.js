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
            break;
          case "services":
            // Initialize services section if needed
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

  Promise.all(fetchPromises).then(() => {
    document.getElementById("loader").style.display = "none";
  });
});
