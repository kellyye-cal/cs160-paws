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

let foodNames = ["Water","Meat","Apple","Carrot","Chicken","Banana","Milk","Fish"];
let foodAmounts = [400,200,100,0,0,0,0,0];
let suggestionAmounts = [0,0,0,0,0,0,0,0];

let nutrientMinimums = [425.25, 461, 5.5, 10];
let nutrientMaximums = [1275.74, 1383, 25, 40];

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

// 50lb 22.68kg (Large)
// water: 1417.48g (708.74-2126.22)
// calories: 1353 kcal (676.5-2029.5)
// fat: 5.5% - 25%
// proteins: 10% - 40%

// 30lb 13.60kg (Medium)
// water: 850.49g (425.25-1275.74)
// calories: 922 kcal (461-1383)
// fat: 5.5% - 25%
// proteins: 10% - 40%

let nutrientItems = ["Water", "Calories", "Fats", "Proteins"];
let nutrientUnits = ["g", "kcal", "%", "%"];

function okOverview(index) {
  return '<div class="row mt-3">' +
          '<div class="col-4 nutrition-name">' +
          nutrientItems[index] +
          '</div>' +
          '<div class="col-8">' +
          '<div class="text-success">' +
          'OK' +
          '</div>' +
          '<div>' +
          'It has the right amount!' +
          '</div>' +
          '</div>' +
          '</div>'
}

function tooLittleOverview(index, value) {
  let diff = (nutrientMinimums[index] - value).toFixed(2);
  return '<div class="row mt-3">' +
          '<div class="col-4 nutrition-name">' +
          nutrientItems[index] +
          '</div>' +
          '<div class="col-8">' +
          '<div class="text-danger">' +
          'Too little' +
          '</div>' +
          '<div>' +
          'Need at least ' + diff + nutrientUnits[index] + ' more.' +
          '</div>' +
          '</div>' +
          '</div>'
}

function tooMuchOverview(index) {
  return '<div class="row mt-3">' +
          '<div class="col-4 nutrition-name">' +
          nutrientItems[index] +
          '</div>' +
          '<div class="col-8">' +
          '<div class="text-danger">' +
          'Too much' +
          '</div>' +
          '<div>' +
          'Try to balance the meal.' +
          '</div>' +
          '</div>' +
          '</div>'
}

function generateAnalysis(index, value, judge) {
  let percentage = 25.0;
  let minVal = nutrientMinimums[index];
  let maxVal = nutrientMaximums[index];
  percentage += ((value - minVal) * 1.0) / (maxVal - minVal) * 50;

  if (percentage < 0.0) {
    percentage = 0.0;
  }
  if (percentage > 100.0) {
    percentage = 100.0;
  }

  let translate = 'translate(' + (7 + (64 - 7) * percentage / 100.0).toFixed(2) + '%)';
  $(".axis-shift-" + (index+1)).css('transform', translate);
  return '<div class="row mt-3">' +
          '<div class="col-4"></div>' +
          '<div class="col-3 axis-value text-start">' +
          'Too little' +
          '</div>' +
          '<div class="col-2 axis-value text-center">' +
          'OK' +
          '</div>' + 
          '<div class="col-3 axis-value text-end">' +
          'Too much' +
          '</div>' +
          '</div>' +
          '<div class="row">' +
          '<div class="col-4 nutrition-name">' +
          nutrientItems[index] +
          '</div>' +
          '<div class="col-8">' +
          '<img src="../images/axis_new.png" class="axis">' +
          '</div>' +
          '</div>' +
          '<div class="row" style="transform: ' + translate + ';">' +
          '<div class="col-3 text-end">' +
          '<div class="nutrition-amount text-center">' + value + nutrientUnits[index] + '</div>' +
          '</div>' +
          '<div class="col-2">' +
          '<img src="../images/axis_pointer.png" class="axis-pointer">' +
          '</div>' +
          '<div class="col-3 value-highlight-' + judge + '">' +
          '</div>' +
          '</div>';
}

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

function foodItemInSuggestions(index, value) {
  suggestionAmounts[index-1] = value;
  return '<div class="col-3 justify-content-center">' +
          '<div class="row">' +
          '<img src="../images/food_item_' + index + '.png" id="' + index + '-s" class="food-item">' +
          '</div>' +
          '<div class="row food-name justify-content-center">' +
          foodNames[index-1] +
          '</div>' +
          '<div class="row food-amount justify-content-center">' + 
          value + 'g' +
          '</div>' +
          '</div>';
}

$(document).ready(function(){
  $("#add-menu").hide();
  $("#amount-change").hide();
  $("#amount-add").hide();
  $("#amount-confirm").hide();
  $("#are-you-sure").hide();

  $("#amount-add-number").val("");
  $("#amount-change-number").val("");

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

    // Calculate Nutrients
    for (let i = 0; i < 8; i++) {
      foodAmounts[i] = parseFloat(foodAmounts[i]);
    }
    let foodTotalWeight = foodAmounts.reduce((partialSum, a) => partialSum + a, 0);
    let res = [0.0, 0.0, 0.0, 0.0];

    for (let i = 0; i < 8; i++) {
      res[0] += nutrients[i][0] * (foodAmounts[i] * 1.0 / 100.0);
      res[1] += nutrients[i][1] * (foodAmounts[i] * 1.0 / 100.0);
      res[2] += nutrients[i][2] * (foodAmounts[i] * 1.0 / 100.0);
      res[3] += nutrients[i][3] * (foodAmounts[i] * 1.0 / 100.0);
    }

    res[2] = (res[2] / (foodTotalWeight - res[0]) * 100.0).toFixed(2);
    res[3] = (res[3] / (foodTotalWeight - res[0]) * 100.0).toFixed(2);

    // Initialize nutrients overview
    $("#nutrition-overview").empty();

    for (let i = 0; i < 4; i++) {
      if (res[i] < nutrientMinimums[i]) {
        $("#nutrition-overview").append(tooLittleOverview(i, res[i]));
      } else if (res[i] > nutrientMaximums[i]) {
        $("#nutrition-overview").append(tooMuchOverview(i));
      } else {
        $("#nutrition-overview").append(okOverview(i));
      }
    }

    // Initialize nutrients analysis
    $("#nutrition-analysis").empty();

    for (let i = 0; i < 4; i++) {
      if (res[i] < nutrientMinimums[i] || res[i] > nutrientMaximums[i]) {
        $("#nutrition-analysis").append(generateAnalysis(i, res[i], "wrong"));
      } else {
        $("#nutrition-analysis").append(generateAnalysis(i, res[i], "right"));
      }
    }

    // Initialize suggestions list
    $("#suggestions").empty();

    let haveSuggestions = false;
    for (let i = 0; i < 4; i++) {
      if (res[i] < nutrientMinimums[i] || res[i] > nutrientMaximums[i]) {
        haveSuggestions = true;
      }
    }
    if (haveSuggestions) {
      $("#have-suggestions").show();
      $("#no-suggestions").hide();

      // Linear Programming
      //
      // Current nutrient amounts: C1, C2, C3, C4
      // Food nutrient amounts per 100g: x1, x2, x3, x4
      // Nutrient min and max values: a1, b1, a2, b2, ...
      //
      // minimize t
      // s.t. t > 0
      // a1 <= C1 + t * x1 / 100 <= b1
      // ... (for 2, 3, and 4)

      for (let i = 1; i <= 8; i++) {
        // let a = nutrientMinimums;
        // let b = nutrientMaximums;
        // let c = [parseFloat(res[0]), parseFloat(res[1]), parseFloat(res[2]), parseFloat(res[3])];
        // let x = nutrients[i-1];

        // let a0 = 100.0 / x[0] * (a[0] - c[0]);
        // let a1 = 100.0 / x[1] * (a[1] - c[1]);
        // let a2 = (a[2] * 1.0 / 100 * (c[1] + c[2] + c[3]) * 1.0 - c[2]) / (x[2] * 1.0 / 100 - a[2] * 1.0 / 100 * (x[1] * 1.0 / 100 + x[2] * 1.0 / 100 + x[3] * 1.0 / 100));
        // let a3 = (a[3] * 1.0 / 100 * (c[1] + c[2] + c[3]) * 1.0 - c[3]) / (x[3] * 1.0 / 100 - a[3] * 1.0 / 100 * (x[1] * 1.0 / 100 + x[2] * 1.0 / 100 + x[3] * 1.0 / 100));
        // let b0 = 100.0 / x[0] * (b[0] - c[0]);
        // let b1 = 100.0 / x[1] * (b[1] - c[1]);
        // let b2 = (b[2] * 1.0 / 100 * (c[1] + c[2] + c[3]) * 1.0 - c[2]) / (x[2] * 1.0 / 100 - b[2] * 1.0 / 100 * (x[1] * 1.0 / 100 + x[2] * 1.0 / 100 + x[3] * 1.0 / 100));
        // let b3 = (b[3] * 1.0 / 100 * (c[1] + c[2] + c[3]) * 1.0 - c[3]) / (x[3] * 1.0 / 100 - b[3] * 1.0 / 100 * (x[1] * 1.0 / 100 + x[2] * 1.0 / 100 + x[3] * 1.0 / 100));
        
        // let minBoundary = [a0, a1];
        // let maxBoundary = [b0, b1];
        // if (x[2] * 1.0 / 100 - a[2] * 1.0 / 100 * (x[1] * 1.0 / 100 + x[2] * 1.0 / 100 + x[3] * 1.0 / 100) < 0.0) {
        //   maxBoundary.push(a2);
        // } else {
        //   minBoundary.push(a2);
        // }
        // if (x[3] * 1.0 / 100 - a[3] * 1.0 / 100 * (x[1] * 1.0 / 100 + x[2] * 1.0 / 100 + x[3] * 1.0 / 100) < 0.0) {
        //   maxBoundary.push(a3);
        // } else {
        //   minBoundary.push(a3);
        // }
        // if (x[2] * 1.0 / 100 - b[2] * 1.0 / 100 * (x[1] * 1.0 / 100 + x[2] * 1.0 / 100 + x[3] * 1.0 / 100) < 0.0) {
        //   minBoundary.push(b2);
        // } else {
        //   maxBoundary.push(b2);
        // }
        // if (x[3] * 1.0 / 100 - b[3] * 1.0 / 100 * (x[1] * 1.0 / 100 + x[2] * 1.0 / 100 + x[3] * 1.0 / 100) < 0.0) {
        //   minBoundary.push(b3);
        // } else {
        //   maxBoundary.push(b3);
        // }

        // if (maxBoundary >= minBoundary) {
        //   alert(minBoundary);
        //   $("#suggestions").append(foodItemInSuggestions(i));
        // }
        
        $("#suggestions").append(foodItemInSuggestions(i, 100));
      }
  
      if ($("#suggestions").children().length <= 4) {
        $("#scroll-suggestion-hint").hide();
      } else {
        $("#scroll-suggestion-hint").show();
      }
    } else {
      $("#have-suggestions").hide();
      $("#no-suggestions").show();
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
        $("#amount-confirm-number").val(suggestionAmounts[index-1]);
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
        foodAmounts[selectedId-1] = parseFloat(foodAmounts[selectedId-1]) + parseFloat(amount);
        $(this).attr("src", "../images/food_item_" + $(this).attr("src")[20] + ".png");
      }
    });
    initialize();
    $(window).scrollTop(0);
    $(window).scrollTop(0);
  });

});