$(document).ready(function(){
  $("#add-menu").hide();

  $("#add-button").click(function() {
    if ( $("#add-menu").first().is( ":hidden" ) ) {
      $("#add-menu").slideDown("slow");
      $("#add-image").attr("src", "../images/food_item_close.png");
      $("#add-text").text("Close");
    } else {
      $("#add-menu").slideUp("slow");
      $("#add-image").attr("src", "../images/food_item_add.png");
      $("#add-text").text("Add...");
    }
  });

  $(".food-item").click(function() {
    let index = $(this).attr("src")[20];
    let thisItem = $(this);

    $('.food-item').each(function(i, obj) {
      if (!(thisItem.is($(this)))) {
        if ($(this).attr("src")[21] == "_") {
          $(this).attr("src", "../images/food_item_" + $(this).attr("src")[20] + ".png");
        }
      }
    });

    let original = "../images/food_item_" + index + ".png";
    let selected = "../images/food_item_" + index + "_selected.png";

    if ( $(this).attr("src") == original){
      $(this).attr("src", selected);
    } else {
      $(this).attr("src", original);
    }
        
    // for (let i = 1; i <= 8; i++){
    //   let original = "../images/food_item_" + i + ".png";
    //   let selected = "../images/food_item_" + i + "_selected.png";

    //   if ( $(this).attr("src", original)){
    //     $(this).attr("src", selected);
    //   } else {
    //     $(this).attr("src", original);
    //   }
    // }
  });
});