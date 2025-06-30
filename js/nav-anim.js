$(document).ready(function () {
  $("a.panel").click(function (e) {
    e.preventDefault();

    $("a.panel").removeClass("selected");
    $(this).addClass("selected");

    const section = $(this).text().trim().toLowerCase().replace(/\s+/g, "");

    // Reset all borders
    $(".border-blue, .border-red").css("width", "0%");

    switch (section) {
      case "home":
      case "aboutus":
      case "services":
      case "portfolio":
      case "contactus":
        const target = $(this).closest("li"); // The <li> of the clicked section
        const targetOffset = target.offset(); // Position of the <li>
        const penOffset = $("#menu-pen").offset(); // Current pen position

        const offsetAdjustX = -35;
        const offsetAdjustY = 20;
        let resetX = "0%";

        let deltaX = targetOffset.left - penOffset.left + offsetAdjustX;
        let deltaY = targetOffset.top - penOffset.top + offsetAdjustY;

        if ($(window).width() < 768) {
          const mobileOffsetAdjustX = -35;
          const mobileOffsetAdjustY = 20;
          resetX = "5%"; // Adjust how far to slide right on mobile

          deltaX += mobileOffsetAdjustX;
          deltaY += mobileOffsetAdjustY;
        }

        $("#menu-pen")
          .transition({ x: deltaX, y: deltaY, rotate: "80deg" })
          .transition({ x: resetX, duration: "500" })
          .transition({ rotate: "-45deg" })
          .transition({ x: 0, y: 0 }); // Optional: Reset to center if needed

        $(`#${section}-border`)
          .delay(500)
          .animate({ width: "100%", opacity: "1" }, 300, "linear");
        break;
    }
  });

  function resizePanel() {
    const panelWidth = $(window).width() / 5;
    $(".panel").css("width", panelWidth + "px");
    $(".panel").css("height", $(window).height() + "px");

    // Adjust the position of the pen
    $("#menu-pen").css({
      left: panelWidth / 2 - 20 + "px",
      top: $(window).height() / 2 - 20 + "px",
    });
  }

  $(window).resize(function () {
    resizePanel();
  });
});
