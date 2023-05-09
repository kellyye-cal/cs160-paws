let moment_data = [
  ["Barney",
  "2023-01-01",
  "This is Barney!",
  "/images/pet_picture_1.png"
]
]
let moment_length = 1;

function addMoment(name, date, description, image, index) {
  return '<div class="moment-card">' + 
          '<div class="container-fluid rounded section-background pt-1 pb-1 mt-2">' +
          '<div class="row mt-2 mb-2">' +
          '<img src="' + image + '" class="d-inline-block align-text-top rounded" id="moment-image-' + index + '">' +
          '</div>' + 
          '<div class="horizontal-space mt-2"> <div class="subtitle" style="margin: 0">' +
          name + 
          '</div> <div class="edit-button rounded text-center" id="moment-edit-' + index + '">Edit</div></div>' +
          '<div class="row text-gray">' +
          '<div class="col" id="moment-date-' + index + '">' +
          date +
          '</div>' +
          '</div>' +
          '<br>' +
          '<div class="row text-black mb-2">' +
          '<div class="col" id="moment-description-' + index + '">' +
          description +
          '</div>' +
          '</div>' +
          '</div>' +
          '<div class="container rounded amount-change pt-2 pb-2 moment-change" id="moment-change-' + index + '">' +
          '<div class="col-12 subtitle">' +
          'Moment Change' +
          '</div>' +
          '<div class="row align-items-center mt-3 mb-2">' +
          '<form id="moments-form-' + index + '">' +
          '<div class="col justify-content-center">' +
          '<div class="row mt-2 mb-2">' +
          '<div class="col-4 my-auto text-black-bold">' +
          '<label for="moments-name-' + index + '">Name</label>' +
          '</div>' +
          '<div class="col-8 my-auto">' +
          '<input type="text" id="moments-name-' + index + '" required>' +
          '</div>' +
          '</div>' +
          '<div class="row mt-2 mb-2">' +
          '<div class="col-4 my-auto text-black-bold">' +
          '<label for="moments-date-' + index + '">Date</label>' +
          '</div>' +
          '<div class="col-8 my-auto">' +
          '<input type="date" id="moments-date-' + index + '" required>' +
          '</div>' +
          '</div>' +
          '<div class="row mt-2 mb-2">' +
          '<div class="col-4 my-auto text-black-bold">' +
          '<label for="moments-description-' + index + '">Description</label>' +
          '</div>' +
          '<div class="col-8 my-auto">' +
          '<input type="text" id="moments-description-' + index + '" required>' +
          '</div>' +
          '</div>' +
          '<div class="row mt-2 mb-2">' +
          '<div class="col-4 my-auto text-black-bold">' +
          '<label for="moments-image-' + index + '">Image</label>' +
          '</div>' +
          '<div class="col-8 my-auto">' +
          '<input type="file" id="moments-image-' + index + '">' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</form>' + 
          '</div>' +
          '<div class="row">' +
          '<div class="col-6"></div>' +
          '<div class="col-3 justify-content-center">' +
          '<div class="row">' +
          '<img src="../images/food_discard.png" class="discard-moment" id="discard-moment-' + index + '">' +
          '</div>' +
          '</div>' +
          '<div class="col-3 justify-content-center">' +
          '<div class="row">' +
          '<img src="../images/food_confirm.png" class="confirm-moment" id="confirm-moment-' + index + '">' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '<div class="container rounded are-you-sure pt-2 pb-2 mb-2" id="are-you-sure-' + index + '">' +
          '<div class="col-12 subtitle">' +
          'Are you sure?' +
          '</div>' +
          '<div class="row align-items-center mt-3 mb-2">' +
          '<div class="col-6 justify-content-center are-you-sure-text">' +
          'Do you want to delete this moment?' +
          '</div>' +
          '<div class="col-3 justify-content-center">' +
          '<div class="row">' +
          '<img src="../images/food_confirm.png" class="confirm-delete" id="confirm-delete-' + index + '">' +
          '</div>' +
          '</div>' +
          '<div class="col-3 justify-content-center">' +
          '<div class="row">' +
          '<img src="../images/food_cancel.png" class="cancel-delete" id="cancel-delete-' + index + '">' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>';
}

$(document).ready(function(){
  function initialize() {
    $("#moment-list").empty();
    if (moment_length == 0) {
      $("#no-moment").show();
    } else {
      $("#no-moment").hide();
      for (let i = 0; i < moment_length; i++) {
        $("#moment-list").append(addMoment(moment_data[i][0], moment_data[i][1], moment_data[i][2], moment_data[i][3], i+1));
      }
    }

    $(".moment-change").hide();
    $(".are-you-sure").hide();
  }

  initialize();

  // SUBMIT NEW MOMENT
  $(document.body).on('click', '#submit-moment' ,function(){
    if ($("#new-form").valid()) {
      if ($("#new-image").val() == "") {
        alert("Please select an image before submitting!");
      } else {
        let image_path = "/images/pet_picture_" + (moment_length+1).toString() + ".png";
        let res = [$("#new-name").val(), $("#new-date").val(), $("#new-description").val(), image_path];
        moment_data.push(res);
        moment_length += 1;
        initialize();
        $("#new-form").get(0).reset();
        alert("Moment added successfully!")
      }
    } else {
      alert("Do not leave blanks before submitting!");
    }
  });

  // MOMENT CHANGE MENU
  $(document.body).on('click', '.edit-button' ,function(){
    let array = $(this).attr("id").split("-");
    let index = array[array.length - 1];

    let menu_index = "#moment-change-" + index;
    let name = "#moments-name-" + index;
    let date = "#moments-date-" + index;
    let description = "#moments-description-" + index;
    // let image = "#moments-image-" + index;

    if ( $(menu_index).first().is( ":hidden" ) ) {
      $(name).val(moment_data[parseInt(index) - 1][0].trim());
      $(date).val(moment_data[parseInt(index) - 1][1].trim());
      $(description).val(moment_data[parseInt(index) - 1][2].trim());
      $(menu_index).slideDown("slow");
    } else {
      $(menu_index).slideUp("slow");
    }
  });

  // DROP DOWN DELETE MENU
  $(document.body).on('click', '.discard-moment' ,function(){
    let array = $(this).attr("id").split("-");
    let index = array[array.length - 1];

    let are_you_sure_index = "#are-you-sure-" + index;
    if ( $(are_you_sure_index).first().is( ":hidden" ) ) {
      $(are_you_sure_index).slideDown("slow");
    } else {
      $(are_you_sure_index).slideUp("slow");
    }
  });

  // CONFIRM CHANGE
  $(document.body).on('click', '.confirm-moment' ,function(){
    let array = $(this).attr("id").split("-");
    let index = array[array.length - 1];

    let menu_index = "#moment-change-" + index;
    let form_index = "#moments-form-" + index;

    let name = "#moments-name-" + index;
    let date = "#moments-date-" + index;
    let description = "#moments-description-" + index;
    let image = "#moments-image-" + index;

    if ($(form_index).valid()) {
      if ($(image).val() == "") {
        alert("Please select an image before submitting!");
      } else {

        // DEMO PURPOSE
        let image_path = "";
        if (index == "1") {
          image_path = "/images/pet_picture_2.png";
        } else {
          image_path = "/images/pet_picture_1.png";
        }

        moment_data[parseInt(index)-1][0] = $(name).val();
        moment_data[parseInt(index)-1][1] = $(date).val();
        moment_data[parseInt(index)-1][2] = $(description).val();
        moment_data[parseInt(index)-1][3] = image_path;
        $(menu_index).slideUp("slow");
        initialize();
      }
    } else {
      alert("Do not leave blanks before submitting!");
    }
  });

  // DELETE MOMENT MENU
  $(document.body).on('click', '.confirm-delete' ,function(){
    let array = $(this).attr("id").split("-");
    let index = array[array.length - 1];

    let menu_index = "#moment-change-" + index;
    let are_you_sure_index = "#are-you-sure-" + index;

    moment_data.splice(parseInt(index-1), 1);
    moment_length -= 1;

    $(menu_index).slideUp("slow");
    $(are_you_sure_index).slideUp("slow");

    initialize();
  });
  $(document.body).on('click', '.cancel-delete' ,function(){
    let array = $(this).attr("id").split("-");
    let index = array[array.length - 1];

    let are_you_sure_index = "#are-you-sure-" + index;
    $(are_you_sure_index).slideUp("slow");
  });
});