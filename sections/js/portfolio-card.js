document.addEventListener("DOMContentLoaded", function () {
  initPortfolioCards();
});

function initPortfolioCards() {
  const cards = document.querySelectorAll(".item-container.card");
  let activeCard = null;

  // Define links for each card in order
  const cardLinks = [
    "https://theghilafstore.com/",
    "https://dawnlubricants.com/",
    "https://smilearch.in/",
    "https://drmohsinthanawala.com/",
    "https://mirchandanigroup.com/",
    "https://kalagroup.in/",
    "https://hindwallcare.com/"
  ];

  cards.forEach((card, idx) => {
    card.addEventListener("click", function (e) {
      // If this card is already active, go to the link
      if (activeCard === card) {
        window.open(cardLinks[idx], "_blank");
        return;
      }

      // Remove active state from previous card
      if (activeCard) {
        activeCard.classList.remove("active-center");
        activeCard.style.zIndex = activeCard.dataset.originalZ || "";
        activeCard.style.transform = activeCard.dataset.originalTransform || "";
        activeCard.style.left = activeCard.dataset.originalLeft || "";
        activeCard.style.top = activeCard.dataset.originalTop || "";
      }

      // Save original styles
      card.dataset.originalZ = card.style.zIndex;
      card.dataset.originalTransform = card.style.transform;
      card.dataset.originalLeft = card.style.left;
      card.dataset.originalTop = card.style.top;

      // Center and scale the card
      card.classList.add("active-center");
      card.style.zIndex = "999";
      card.style.transform = "translate(-50%, -50%) scale(1.5)";
      card.style.left = "50vw";
      card.style.top = "50vh";

      activeCard = card;
    });
  });
}