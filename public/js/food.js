$(document).ready(function(){
  $("#add-menu").hide();
  $("#amount-enter").hide();
  $("#are-you-sure").hide();

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
      $("#amount-enter").slideDown("slow");
    } else {
      $(this).attr("src", original);
      $("#amount-enter").slideUp("slow");
      $("#are-you-sure").slideUp("slow");
    }
  });

  // AMOUNT CHANGE screen
  $("#discard-item").click(function() {
    if ( $("#are-you-sure").first().is( ":hidden" ) ) {
      $("#are-you-sure").slideDown("slow");
    } else {
      $("#are-you-sure").slideUp("slow");
    }
  });
  $("#confirm-item").click(function() {
    if (! $("#are-you-sure").first().is( ":hidden" ) ) {
      $("#are-you-sure").slideUp("slow");
    }
    $("#amount-enter").slideUp("slow");
    $('.food-item').each(function(i, obj) {
      if ($(this).attr("src")[21] == "_") {
        $(this).attr("src", "../images/food_item_" + $(this).attr("src")[20] + ".png");
      }
    });
  });

  // ARE YOU SURE? screen
  $("#discard-confirm").click(function() {
    $("#amount-enter").slideUp("slow");
    $("#are-you-sure").slideUp("slow");
    $('.food-item').each(function(i, obj) {
      if ($(this).attr("src")[21] == "_") {
        $(this).attr("src", "../images/food_item_" + $(this).attr("src")[20] + ".png");
      }
    });
  });
  $("#discard-cancel").click(function() {
    $("#are-you-sure").slideUp("slow");
  });

});