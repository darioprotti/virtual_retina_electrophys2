$(document).ready(function() {
  $("#cf7_controls").on('click', 'button', function() {
    $("#cf7 img").removeClass("opaque");

    var newImage = $(this).index();

    $("#cf7 img").eq(newImage).addClass("opaque");

    $("#cf7_controls button").removeClass("selected");
    $(this).addClass("selected");
  });
});