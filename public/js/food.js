let addButton = '<div class="col-3 justify-content-center">' +
                '<div id="add-button">' +
                '<div class="row">' +
                '<img src="../images/food_item_add.png" class="food-item" id="add-image">' +
                '</div>' +
                '<div class="row food-name justify-content-center" id="add-text">' +
                'Add...' +
                '</div>' +
                '</div>' +
                '</div>';

let all = [1,2,3,4,5,6,7,8];
let meals = [1, 2, 3];
let adds = all.filter(x => !meals.includes(x));

let foodNames = ["Water","Meat","Apple","Carrot","Chicken","Banana","Milk","Fish"];
let foodAmounts = [400,200,100,0,0,0,0,0];

function foodItemInMeals(index) {
  return '<div class="col-3 justify-content-center">' +
          '<div class="row">' +
          '<img src="../images/food_item_' + index + '.png" class="food-item">' +
          '</div>' +
          '<div class="row food-name justify-content-center">' +
          foodNames[index-1] +
          '</div>' +
          '<div class="row food-amount justify-content-center">' + 
          foodAmounts[index-1] + 'g' +
          '</div>' +
          '</div>';
}


$(document).ready(function(){
  $("#add-menu").hide();
  $("#amount-enter").hide();
  $("#are-you-sure").hide();

  if ($("#meals").children().length <= 4) {
    $("#scroll-hint").hide();
  } else {
    $("#scroll-hint").show();
  }

  $("#meals").empty();
  for (let i = 1; i <= 8; i++) {
    $("#meals").append(foodItemInMeals(i));
  }


  $("#add-button").click(function() {
    // $("#meals").empty();
    // let newItem = '<div class="col-3 justify-content-center">' +
    //               '<div class="row">' + 
    //               '<img src="../images/food_item_1.png" class="food-item">' +
    //               '</div>' +
    //               '<div class="row food-name justify-content-center">' +
    //               'Water' +
    //               '</div>' +
    //               '<div class="row food-amount justify-content-center">' +
    //               '400g' +
    //               '</div>' +
    //               '</div>';
    // $("#meals").append(newItem);
    // $("#meals").append(addButton);
    // $("#meals").append(add);

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