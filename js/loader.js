window.addEventListener("DOMContentLoaded", () => {
  const sections = ["home", "portfolio", "services", "about", "contact"];

  sections.forEach((section) => {
    fetch(`sections/html/${section}.html`)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load ${section}.html`);
        return res.text();
      })
      .then((data) => {
        document.getElementById(section).innerHTML = data;
        if (section === "home") startHomeAnimation();
        if (section === "portfolio") {
          // Initialize Swiper after portfolio HTML is loaded
          const swiper = new Swiper('.portfolio-swiper', {
            effect: 'cards',
            grabCursor: true,
            loop: true,
            navigation: false,
          });
          // Initialize flipbook after HTML is loaded
          document.querySelectorAll(".book").forEach(flipBook);
        }
      })
      .catch((err) => {
        console.error(err);
        document.getElementById(
          section
        ).innerHTML = `<p>Could not load ${section}</p>`;
      });
  });
});

window.addEventListener("load", function () {
  setTimeout(function () {
    document.getElementById("loader").style.display = "none";
  }, 0);
});