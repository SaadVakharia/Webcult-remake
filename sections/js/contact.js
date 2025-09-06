let swatchbook;
document.addEventListener("DOMContentLoaded", function () {
  initContactSwatches();
  initContactForm();
});

function initContactSwatches() {
  const container = document.getElementById("sb-container");
  if (container && typeof $ === "function" && $.fn.swatchbook) {
    swatchbook = $(container).swatchbook();

    // Add click handlers for social media links
    container.querySelectorAll("div[data-url]").forEach((div) => {
      div.addEventListener("click", function (e) {
        // Check if this div is currently active (open)
        const isActive = this.classList.contains('ff-active');
        
        if (isActive) {
          // If the swatch is open, prevent swatchbook event and open link
          e.stopPropagation();
          
          const url = this.getAttribute("data-url");
          if (url) {
            window.open(url, "_blank");
          }
        }
        // If not active, let the swatchbook handle the click to open it
      });
    });
  } else {
    console.warn("Swatchbook plugin not found or container missing");
  }
}

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

    // Basic email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      status.textContent = "Please enter a valid email address.";
      status.className = "error";
      status.style.display = "block";
      return;
    }

    contactBody.style.display = "none";

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
      .then((res) => res.json()) // Parse JSON response
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
      })
      .catch((err) => {
        console.error("Error sending contact form:", err);
        status.textContent = "Something went wrong. Please try again.";
        status.className = "error";
        status.style.display = "block";
      });
  });
}
