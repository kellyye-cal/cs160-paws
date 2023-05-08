let app_data = [
  ["Leg Surgery Follow-Up", "2023-04-13", "16:00", "Jiang"],
  ["Yearly Vaccinatins", "2023-05-20", "12:00", "Zhou"]
];
let app_length = 2;
const month_name = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function addApp(name, date, time, doctor, index) {
  let array = date.split("-");
  let month = parseInt(array[1]);
  let day = parseInt(array[2]);
  return  '<div class="horizontal-space" style="align-items: center" id="app-' + index + '">' +
          '<div class="appt">' +
          '<div class="calendar">' +
          '<p class="cal-month" id="app-month-' + index + '">' + month_name[month-1] + '</p> <p class="cal-day" id="app-day-' + index + '">' + day + '</p>' +
          '</div>' +
          '<div>' +
          '<b class="appt-name" id="app-name-' + index + '">' + name + '</b>' +
          '<p class="appt-details"><span id="app-time-' + index + '">' + time + '</span> &#x2022; <span id="app-doctor-' + index + '">Doctor ' + doctor + '</span></p>' +
          '</div>' +
          '</div>' +
          '<p class="app-edit-button" id="app-edit-button-' + index + '">Edit</p>' +
          '</div>' +
          '<div class="container rounded app-edit pt-2 pb-2" id="app-edit-' + index + '">' +
          '<div class="col-12 subtitle">' +
          'Edit Appointment' +
          '</div>' +
          '<div class="row align-items-center mt-3 mb-2">' +
          '<div class="col justify-content-center">' +
          '<form id="app-form-' + index + '">' +
          '<div class="row mt-2 mb-2">' +
          '<div class="col-4 my-auto text-black-bold">' +
          '<label for="app-edit-name-' + index + '">Name</label>' +
          '</div>' +
          '<div class="col-8 my-auto">' +
          '<input type="text" id="app-edit-name-' + index + '" required>' +
          '</div>' +
          '</div>' +
          '<div class="row mt-2 mb-2">' +
          '<div class="col-4 my-auto text-black-bold">' +
          '<label for="app-edit-date-' + index + '">Date</label>' +
          '</div>' +
          '<div class="col-8 my-auto">' +
          '<input type="date" id="app-edit-date-' + index + '" required>' +
          '</div>' +
          '</div>' +
          '<div class="row mt-2 mb-2">' +
          '<div class="col-4 my-auto text-black-bold">' +
          '<label for="app-edit-time-' + index + '">Time</label>' +
          '</div>' +
          '<div class="col-8 my-auto">' +
          '<input type="time" id="app-edit-time-' + index + '" required>' +
          '</div>' +
          '</div>' +
          '<div class="row mt-2 mb-2">' +
          '<div class="col-4 my-auto text-black-bold">' +
          '<label for="app-edit-doctor-' + index + '">Doctor</label>' +
          '</div>' +
          '<div class="col-8 my-auto">' +
          '<input type="text" id="app-edit-doctor-' + index + '" required>' +
          '</div>' +
          '</div>' +
          '</form>' + 
          '</div>' +
          '</div>' +
          '<div class="row">' +
          '<div class="col-6"></div>' +
          '<div class="col-3 justify-content-center">' +
          '<div class="row">' +
          '<img src="../images/food_discard.png" class="discard-app" id="discard-app-' + index + '">' +
          '</div>' +
          '</div>' +
          '<div class="col-3 justify-content-center">' +
          '<div class="row">' +
          '<img src="../images/food_confirm.png" class="confirm-app" id="confirm-app-' + index + '">' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '<div class="container rounded are-you-sure pt-2 pb-2 mb-2" id="are-you-sure-app-' + index + '">' +
          '<div class="col-12 subtitle">' +
          'Are you sure?' +
          '</div>' +
          '<div class="row align-items-center mt-3 mb-2">' +
          '<div class="col-6 justify-content-center are-you-sure-text">' +
          'Do you want to delete this moment?' +
          '</div>' +
          '<div class="col-3 justify-content-center">' +
          '<div class="row">' +
          '<img src="../images/food_confirm.png" class="confirm-delete-app" id="confirm-delete-app-' + index + '">' +
          '</div>' +
          '</div>' +
          '<div class="col-3 justify-content-center">' +
          '<div class="row">' +
          '<img src="../images/food_cancel.png" class="cancel-delete-app" id="cancel-delete-app-' + index + '">' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>';
};

$(document).ready(function(){

  function initialize() {
    $("#app-list").empty();

    if (app_length == 0) {
      $("#no-app").show();
    } else {
      $("#no-app").hide();
      for (let i = 0; i < app_length; i++) {
        $("#app-list").append(addApp(app_data[i][0], app_data[i][1], app_data[i][2], app_data[i][3], i+1));
      }
    }

    $(".app-add").hide();
    $(".app-edit").hide();
    $(".are-you-sure").hide();
  }

  initialize();

  $(document.body).on('click', '.app-edit-button' ,function(){
    let array = $(this).attr("id").split("-");
    let index = array[array.length - 1];

    let menu_index = "#app-edit-" + index;
    let name = "#app-edit-name-" + index;
    let date = "#app-edit-date-" + index;
    let time = "#app-edit-time-" + index;
    let doctor = "#app-edit-doctor-" + index;

    if ( $(menu_index).first().is( ":hidden" ) ) {
      $(name).val(app_data[parseInt(index) - 1][0].trim());
      $(date).val(app_data[parseInt(index) - 1][1].trim());
      $(time).val(app_data[parseInt(index) - 1][2].trim());
      $(doctor).val(app_data[parseInt(index) - 1][3].trim());
      $(menu_index).slideDown("slow");
    } else {
      $(menu_index).slideUp("slow");
    }
  });

    // ADD APPOINTMENT
    $(document.body).on('click', '#app-add-button' ,function(){    
      if ( $("#app-add").first().is( ":hidden" ) ) {
        $("#app-add").slideDown("slow");
      } else {
        $("#app-add").slideUp("slow");
      }
    });

    // CONFIRM ADD APPOINTMENT
    $(document.body).on('click', '#confirm-new-app' ,function(){    
      let name = "#app-add-name";
      let date = "#app-add-date";
      let time = "#app-add-time";
      let doctor = "#app-add-doctor";
  
      if ($("#app-form").valid()) {
        let new_app = [$(name).val(), $(date).val(), $(time).val(), $(doctor).val()];
        app_data.push(new_app);
        app_length += 1;
        $("#app-add").slideUp("slow");
        initialize();
      } else {
        alert("Do not leave blanks before submitting!");
      }
    });

  // DROP DOWN DELETE MENU
  $(document.body).on('click', '.discard-app' ,function(){
    let array = $(this).attr("id").split("-");
    let index = array[array.length - 1];

    let are_you_sure_index = "#are-you-sure-app-" + index;
    if ( $(are_you_sure_index).first().is( ":hidden" ) ) {
      $(are_you_sure_index).slideDown("slow");
    } else {
      $(are_you_sure_index).slideUp("slow");
    }
  });

    // CONFIRM CHANGE
    $(document.body).on('click', '.confirm-app' ,function(){
      let array = $(this).attr("id").split("-");
      let index = array[array.length - 1];
  
      let menu_index = "#app-edit-" + index;
      let form_index = "#app-form-" + index;
  
      let name = "#app-edit-name-" + index;
      let date = "#app-edit-date-" + index;
      let time = "#app-edit-time-" + index;
      let doctor = "#app-edit-doctor-" + index;
  
      if ($(form_index).valid()) {
        app_data[parseInt(index)-1][0] = $(name).val();
        app_data[parseInt(index)-1][1] = $(date).val();
        app_data[parseInt(index)-1][2] = $(time).val();
        app_data[parseInt(index)-1][3] = $(doctor).val();
        $(menu_index).slideUp("slow");
        initialize();
      } else {
        alert("Do not leave blanks before submitting!");
      }
    });

    // DELETE MOMENT MENU
    $(document.body).on('click', '.confirm-delete-app' ,function(){
      let array = $(this).attr("id").split("-");
      let index = array[array.length - 1];
  
      let menu_index = "#app-edit-" + index;
      let are_you_sure_index = "#are-you-sure-app-" + index;
  
      app_data.splice(parseInt(index-1), 1);
      app_length -= 1;
  
      $(menu_index).slideUp("slow");
      $(are_you_sure_index).slideUp("slow");
  
      initialize();
    });
    $(document.body).on('click', '.cancel-delete-app' ,function(){
      let array = $(this).attr("id").split("-");
      let index = array[array.length - 1];
  
      let are_you_sure_index = "#are-you-sure-app-" + index;
      $(are_you_sure_index).slideUp("slow");
    });

});