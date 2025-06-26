$(document).ready(function () {
  $("a.panel").click(function (e) {
    e.preventDefault();

    $("a.panel").removeClass("selected");
    $(this).addClass("selected");

    const section = $(this).text().trim().toLowerCase().replace(/\s+/g, "");

    // Reset all borders
    $(".borderblue, .borderred").css("width", "0%");

    // Animate pen and border based on section
    switch (section) {
      case "home":
        $("#menupen").transition({ x: "-30%", y: "-45%" });
        $("#menupen").transition({ rotate: "80deg" });
        $("#menupen").transition({ x: "8%", duration: "500" });
        $("#menupen").transition({ rotate: "-45deg" });
        $("#menupen").transition({ x: "0px", y: "0px" });
        $("#homeborder")
          .delay(800)
          .animate({ width: "100%", opacity: "1" }, 300, "linear");
        break;
      case "portfolio":
        $("#menupen").transition({ x: "-30%", y: "16%" });
        $("#menupen").transition({ rotate: "80deg" });
        $("#menupen").transition({ x: "10%", duration: "500" });
        $("#menupen").transition({ rotate: "-45deg" });
        $("#menupen").transition({ x: "0px", y: "0px" });
        $("#portfolioborder")
          .delay(800)
          .animate({ width: "100%", opacity: "1" }, 300, "linear");
        break;
      case "services":
        $("#menupen").transition({ x: "-30%", y: "80%" });
        $("#menupen").transition({ rotate: "80deg" });
        $("#menupen").transition({ x: "12%", duration: "500" });
        $("#menupen").transition({ rotate: "-45deg" });
        $("#menupen").transition({ x: "0px", y: "0px" });
        $("#servicesborder")
          .delay(800)
          .animate({ width: "100%", opacity: "1" }, 300, "linear");
        break;
      case "contactus":
        $("#menupen").transition({ x: "-30%", y: "140%" });
        $("#menupen").transition({ rotate: "80deg" });
        $("#menupen").transition({ x: "14%", duration: "500" });
        $("#menupen").transition({ rotate: "-45deg" });
        $("#menupen").transition({ x: "0px", y: "0px" });
        $("#contactusborder")
          .delay(800)
          .animate({ width: "100%", opacity: "1" }, 300, "linear");
        break;
      case "aboutus":
        $("#menupen").transition({ x: "-30%", y: "204%" });
        $("#menupen").transition({ rotate: "80deg" });
        $("#menupen").transition({ x: "16%", duration: "500" });
        $("#menupen").transition({ rotate: "-45deg" });
        $("#menupen").transition({ x: "0px", y: "0px" });
        $("#aboutusborder")
          .delay(800)
          .animate({ width: "100%", opacity: "1" }, 300, "linear");
        break;
      default:
        break;
    }
  });

  function resizePanel() {
	const panelWidth = $(window).width() / 5;
	$(".panel").css("width", panelWidth + "px");
	$(".panel").css("height", $(window).height() + "px");

	// Adjust the position of the pen
	$("#menupen").css({
	  left: panelWidth / 2 - 20 + "px",
	  top: $(window).height() / 2 - 20 + "px"
	});
  }

  $(window).resize(function () {
    resizePanel();
  });
});
