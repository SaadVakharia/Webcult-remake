let swatchbook; // Declare in global scope

function initContactSwatches() {
  const container = document.getElementById("sb-container");
  if (!container) return;
  // Use jQuery plugin instead of SwatchBook constructor
  swatchbook = $(container).swatchbook({
    // number of degrees that is between each item
    angleInc: -10,
    // amount in degrees for the opened item's next sibling
    proximity: -100,
    neighbor: -20,
    // index of the element that when clicked, triggers the open/close function
    // by default there is no such element
    closeIdx: 11,
  });
}

window.swatchbook = swatchbook;
document.addEventListener("DOMContentLoaded", function () {
  initContactSwatches();
});
