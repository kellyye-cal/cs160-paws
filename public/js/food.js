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

// let all = [1,2,3,4,5,6,7,8];
// let meals = [1, 2, 3];
// let adds = all.filter(x => !meals.includes(x));

let foodNames = ["Water","Meat","Apple","Carrot","Chicken","Banana","Milk","Fish"];
let foodAmounts = [400,200,100,0,0,0,0,0];

// Water, Calories, Fats, Proteins
// Per 100g
// g, kCal, g, g
let nutrients = [
  [100, 0, 0, 0],
  [58, 293, 25, 17],
  [86, 52, 0.17, 0.26],
  [88, 41, 0.24, 0.93],
  [59, 239, 14, 27],
  [75, 89, 0.33, 1.1],
  [88, 61, 3.3, 3.2],
  [65, 206, 12, 22]
];

// Dog water need:
// 25-50ml/kg/24hrs
// A 10kg dog, like a Westie, would be expected to drink approximately 480ml (just under a pint) in 24 hours.
// average: 1 ounce of water (1/8 of a cup) per pound of body weight each day

// Dog calories need:
// 30 x weight in kg (or pounds divided by 2.2) + 70 = daily caloric needs

//  A minimum of approximately 5.5% of the diet should come from fats and 10% from protein.
// less than 25% fat
// less than 40% protein

// Dog average calories:
// 10lb: 404 kcal; 30lb: 922 kcal; 50lb: 1353 kcal; 70lb: 1740 kcal; 90lb: 2100 kcal

// 50lb 22.68kg
// water: 1417.48g (708.74-2126.22)
// calories: 1353 kcal (375.91-2029.5)
// fat: 5.5% - 25%
// proteins: 10% - 40%

function foodItemInMeals(index) {
  return '<div class="col-3 justify-content-center">' +
          '<div class="row">' +
          '<img src="../images/food_item_' + index + '.png" id="' + index + '-m" class="food-item">' +
          '</div>' +
          '<div class="row food-name justify-content-center">' +
          foodNames[index-1] +
          '</div>' +
          '<div class="row food-amount justify-content-center">' + 
          foodAmounts[index-1] + 'g' +
          '</div>' +
          '</div>';
}

function foodItemInAdds(index) {
  return '<div class="col-3 justify-content-center">' +
          '<div class="row">' +
          '<img src="../images/food_item_' + index + '.png" id="' + index + '-a" class="food-item">' +
          '</div>' +
          '<div class="row food-name justify-content-center">' +
          foodNames[index-1] +
          '</div>' +
          '</div>';
}

function foodItemInSuggestions(index) {
  return '<div class="col-3 justify-content-center">' +
          '<div class="row">' +
          '<img src="../images/food_item_' + index + '.png" id="' + index + '-s" class="food-item">' +
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
  $("#amount-change").hide();
  $("#amount-add").hide();
  $("#amount-confirm").hide();
  $("#are-you-sure").hide();

  function initialize() {
    // Initialize meals list
    $("#meals").empty();
    for (let i = 1; i <= 8; i++) {
      if (foodAmounts[i-1] != 0) {
        $("#meals").append(foodItemInMeals(i));
      }
    }

    $("#meals").append(addButton); 
    
    if ($("#meals").children().length <= 4) {
      $("#scroll-hint").hide();
    } else {
      $("#scroll-hint").show();
    }

    // Initialize add items list
    $("#adds").empty();
    for (let i = 1; i <= 8; i++) {
      if (foodAmounts[i-1] == 0) {
        $("#adds").append(foodItemInAdds(i));
      }
    }

    if ($("#adds").children().length <= 4) {
      $("#scroll-add-hint").hide();
    } else {
      $("#scroll-add-hint").show();
    }

    // Initialize suggestions list
    $("#suggestions").empty();
    for (let i = 1; i <= 8; i++) {
      if (foodAmounts[i-1] == 0) {
        $("#suggestions").append(foodItemInSuggestions(i));
      }
    }

    if ($("#suggestions").children().length <= 4) {
      $("#scroll-suggestion-hint").hide();
    } else {
      $("#scroll-suggestion-hint").show();
    }

  }

  initialize();

  // Add button
  $(document.body).on('click', "#add-button", function() {
    $("#amount-change").slideUp("slow");
    $("#amount-add").slideUp("slow");
    $("#are-you-sure").slideUp("slow");
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

  // Food item
  // $(".food-item").on("click", function() {
  $(document.body).on('click', '.food-item' ,function(){
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
      if ($(this).attr("id").charAt(2) == "m") {
        $("#amount-change-number").val(foodAmounts[index-1]);
        $("#amount-change").slideDown("slow");
      }
      if ($(this).attr("id").charAt(2) == "a") {
        $("#amount-add").slideDown("slow");
      }
      if ($(this).attr("id").charAt(2) == "s") {
        $("#amount-confirm-number").val(foodAmounts[index-1]);
        $("#amount-confirm").slideDown("slow");
      }
    } else {
      $(this).attr("src", original);
      if ($(this).attr("id").charAt(2) == "m") {
        $("#amount-change").slideUp("slow");
        $("#are-you-sure").slideUp("slow");
      }
      if ($(this).attr("id").charAt(2) == "a") {
        $("#amount-add").slideUp("slow");
      }
      if ($(this).attr("id").charAt(2) == "s") {
        $("#amount-confirm").slideUp("slow");
      }
    }
  });

  // AMOUNT ADD screen
  $("#confirm-add-item").click(function() {
    let amount = $("#amount-add-number").val();

    if ((amount.trim() != "") && (!isNaN(amount)) && (parseFloat(amount) >= 0)){
      $("#amount-add").slideUp("slow");
      $('.food-item').each(function(i, obj) {
        if ($(this).attr("src")[21] == "_") {
          let selectedId = parseInt($(this).attr("id")[0]);
          foodAmounts[selectedId-1] = amount;
          $(this).attr("src", "../images/food_item_" + $(this).attr("src")[20] + ".png");
        }
      });
      initialize();
      $("#add-menu").slideUp("slow");
      $("#add-image").attr("src", "../images/food_item_add.png");
      $("#add-text").text("Add...");
      $(window).scrollTop(0);
    } else {
      alert("Please enter a positive number.");
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
    let amount = $("#amount-change-number").val();

    if ((amount.trim() != "") && (!isNaN(amount)) && (parseFloat(amount) >= 0)){
      if (! $("#are-you-sure").first().is( ":hidden" ) ) {
        $("#are-you-sure").slideUp("slow");
      }
      $("#amount-change").slideUp("slow");
      $('.food-item').each(function(i, obj) {
        if ($(this).attr("src")[21] == "_") {
          let selectedId = parseInt($(this).attr("id")[0]);
          foodAmounts[selectedId-1] = amount;
          $(this).attr("src", "../images/food_item_" + $(this).attr("src")[20] + ".png");
        }
      });
      initialize();
      $(window).scrollTop(0);
    } else {
      alert("Please enter a positive number.");
    }
  });

  // ARE YOU SURE? screen
  $("#discard-confirm").click(function() {
    $("#amount-change").slideUp("slow");
    $("#are-you-sure").slideUp("slow");
    $('.food-item').each(function(i, obj) {
      if ($(this).attr("src")[21] == "_") {
        let selectedId = parseInt($(this).attr("id")[0]);
        foodAmounts[selectedId-1] = 0;
        $(this).attr("src", "../images/food_item_" + $(this).attr("src")[20] + ".png");
      }
    });
    initialize();
  });
  $("#discard-cancel").click(function() {
    $("#are-you-sure").slideUp("slow");
  });

  // CONFIRM screen
  $("#confirm-suggestion").click(function() {
    let amount = $("#amount-confirm-number").val();

    $("#amount-confirm").slideUp("slow");
    $('.food-item').each(function(i, obj) {
      if ($(this).attr("src")[21] == "_") {
        let selectedId = parseInt($(this).attr("id")[0]);
        foodAmounts[selectedId-1] = amount;
        $(this).attr("src", "../images/food_item_" + $(this).attr("src")[20] + ".png");
      }
    });
    initialize();
    $(window).scrollTop(0);
  });

});