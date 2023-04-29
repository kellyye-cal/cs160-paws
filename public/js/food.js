$(document).ready(function(){
  $("#add-menu").hide();

  $("#add-button").click(function() {
    if ( $("#add-menu").first().is( ":hidden" ) ) {
      $("#add-menu").slideDown("slow");
    } else {
      $("#add-menu").slideUP("slow");
    }
  });
});