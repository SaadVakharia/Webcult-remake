let swatchbook;

document.addEventListener("DOMContentLoaded", function () {
  initContactSwatches();
  initContactForm();
});

function initContactSwatches() {
  const container = document.getElementById("sb-container");
  if (!container) {
    console.warn("Swatchbook container not found");
    return;
  }

  const swatches = Array.from(container.querySelectorAll("div"));
  let current = -1;
  let zCounter = 100;

  const angleInc = 10;   // spacing between default cards
  const center = 2;      // index of centered card
  const proximity = 90;  // gap when opening neighbors
  const neighbor = 8;    // spacing for further neighbors

  // Arrange cards initially
  swatches.forEach((swatch, i) => {
    const angle = angleInc * (i - center);
    swatch.style.transform = `rotate(${angle}deg)`;
    swatch.style.zIndex = i;
    swatch.style.transition = "transform 0.7s ease, box-shadow 0.3s ease";
    swatch.style.transformOrigin = "bottom center";
  });

  function openSwatch(swatch) {
    const idx = swatches.indexOf(swatch);

    if (idx === current) {
      // second click → open link
      const url = swatch.getAttribute("data-url");
      if (url) window.open(url, "_blank");
      return;
    }

    // first click → open this swatch
    setCurrent(swatch);
    swatch.style.transform = "rotate(0deg)";
    swatch.style.zIndex = ++zCounter;
    rotateSiblings(idx);
  }

  function rotateSiblings(idx) {
    swatches.forEach((swatch, i) => {
      if (i === idx) return;

      let angle;
      if (i < idx) {
        angle = angleInc * (i - idx);
      } else if (i - idx === 1) {
        angle = proximity;
      } else {
        angle = proximity + (i - idx - 1) * neighbor;
      }
      swatch.style.transform = `rotate(${angle}deg)`;
    });
  }

  function setCurrent(swatch) {
    swatches.forEach(s => s.classList.remove("active"));
    if (swatch) {
      swatch.classList.add("active");
      current = swatches.indexOf(swatch);
    } else {
      current = -1;
    }
  }

  // Bind clicks
  swatches.forEach(swatch => {
    swatch.addEventListener("click", e => {
      e.preventDefault();
      openSwatch(swatch);
    });
  });

  // Store instance if needed
  swatchbook = { openSwatch, rotateSiblings };
}

/* ------------------------------
   CONTACT FORM LOGIC
--------------------------------*/
function initContactForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("contact_results");
  const contactBody = document.getElementById("contact_body");

  if (!form || !status) {
    console.warn("Contact form or status element not found.");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    status.textContent = "";
    status.className = "";

    const name = form.querySelector("[name='name']").value.trim();
    const email = form.querySelector("[name='email']").value.trim();
    const subject = form.querySelector("[name='subject']").value.trim();
    const message = form.querySelector("[name='message']").value.trim();

    if (!name || !email || !subject || !message) {
      status.textContent = "All fields are required.";
      status.className = "error";
      status.style.display = "block";
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      status.textContent = "Please enter a valid email address.";
      status.className = "error";
      status.style.display = "block";
      return;
    }

    if (contactBody) contactBody.style.display = "none";

    status.textContent = "Sending...";
    status.className = "loading";
    status.style.display = "block";

    const formData = new FormData(form);

    fetch("contact.php", {
      method: "POST",
      body: formData,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.type === "message") {
          status.textContent = data.text;
          status.className = "success";
          form.reset();
        } else {
          status.textContent =
            data.text || "Something went wrong. Please try again.";
          status.className = "error";
        }
        status.style.display = "block";
        if (contactBody) contactBody.style.display = "block";
      })
      .catch((err) => {
        console.error("Error sending contact form:", err);
        status.textContent = "Something went wrong. Please try again.";
        status.className = "error";
        status.style.display = "block";
        if (contactBody) contactBody.style.display = "block";
      });
  });
}
