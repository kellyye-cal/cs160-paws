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
    } else {
      $(this).attr("src", original);
      if ($(this).attr("id").charAt(2) == "m") {
        $("#amount-change").slideUp("slow");
        $("#are-you-sure").slideUp("slow");
      }
      if ($(this).attr("id").charAt(2) == "a") {
        $("#amount-add").slideUp("slow");
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

});