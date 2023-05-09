let app_data = [
  ["Leg Surgery Follow-Up", "2023-04-13", "16:00", "Jiang"],
  ["Yearly Vaccinatins", "2023-05-20", "12:00", "Zhou"]
];
let app_length = 2;
const month_name = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const day_name = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th",
"11th", "12th", "13th", "14th", "15th", "16th", "17th", "18th", "19th", "20th",
"21st", "22nd", "23rd", "24th", "25th", "26th", "27th", "28th", "29th", "30th", "31st"];

let log_data = [
  ["2023-04-19", 7, 0, "Barney was good all day."],
  ["2023-04-18", 7, 1, "Barney was a bit uncomfortable."],
  ["2023-04-17", 7, 0, "Barney was good all day."],
  ["2023-04-16", 7, 0, "Barney was good all day."],
  ["2023-04-15", 7, 1, "Barney was a bit uncomfortable."],
  ["2023-04-14", 5, 0, "Barney was good all day."], 
  ["2023-04-13", 7, 0, "Barney was good all day."], 
  ["2023-04-12", 7, 0, "Barney was good all day."]
];
let log_data_filtered = [
];
let current_filter = 0;

let log_length = 8;
const pain_map = ["happy", "mild", "sad"];
const medication_map = ["Took no medication today",
"Only took arthritis",
"Only took aspirin AM",
"Did not take aspirin PM",
"Only took aspirin PM",
"Did not take aspirin AM",
"Did not take arthritis",
"Took all medications"];

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

function addLog(date, medication, pain, notes, index){
  let array = date.split("-");
  let year = parseInt(array[0]);
  let month = parseInt(array[1]);
  let day = parseInt(array[2]);
  return '<div class="horizontal-space gray-bg logs" style="align-items: center;" id="log-' + index + '">' +
          '<div class="log">' + 
          '<img src="/images/' + pain_map[pain] + '.png" class="face">' +
          '<div>' + 
          '<b class="appt-name">' + month_name[month-1] + '. ' + day_name[day-1] + ', ' + year + '</b>' +
          '<p class="appt-details"> ' + medication_map[medication] + ' </p>' +
          '</div>' +
          '</div>' +
          '<p class="view-notes" id="view-notes-' + index + '"> View Notes </p>' +
          '</div>' +
          '<div class="horizontal-space gray-bg logs note" style="align-items: center;" id="note-' + index + '">' +
          notes +
          '</div>';
}

$(document).ready(function(){
  function updateFilter(selection) {
    log_data_filtered = [];
    // let index = $("#inputGroupSelect01").value;
    for (let i = 0; i < log_length; i++) {
      if (selection == 0) {
        log_data_filtered.push(log_data[i]);
      }
      if (selection == 1) {
        log_data_filtered.push(log_data[i]);
      }
      if (selection == 2) {
        if (log_data[i][1] == 1 || log_data[i][1] == 3 || log_data[i][1] == 5 || log_data[i][1] == 7) {
          log_data_filtered.push(log_data[i]);
        }
      }
      if (selection == 3) {
        if (log_data[i][1] == 2 || log_data[i][1] == 3 || log_data[i][1] == 6 || log_data[i][1] == 7) {
          log_data_filtered.push(log_data[i]);
        }
      }
      if (selection == 4) {
        if (log_data[i][1] == 4 || log_data[i][1] == 5 || log_data[i][1] == 6 || log_data[i][1] == 7) {
          log_data_filtered.push(log_data[i]);
        }
      }
      if (selection == 5) {
        if (log_data[i][2] == 0) {
          log_data_filtered.push(log_data[i]);
        }
      }
      if (selection == 6) {
        if (log_data[i][2] == 1) {
          log_data_filtered.push(log_data[i]);
        }
      }
      if (selection == 7) {
        if (log_data[i][2] == 2) {
          log_data_filtered.push(log_data[i]);
        }
      }
    }
  }

  function initialize() {
    updateFilter(current_filter);

    if ($("#happy").is(":checked")) {
      $("#mild").prop('checked', false);
      $("#sad").prop('checked', false);
    }

    $("#app-list").empty();

    if (app_length == 0) {
      $("#no-app").show();
    } else {
      $("#no-app").hide();
      for (let i = 0; i < app_length; i++) {
        $("#app-list").append(addApp(app_data[i][0], app_data[i][1], app_data[i][2], app_data[i][3], i+1));
      }
    }

    $("#log-list").empty();

    if (log_data_filtered.length == 0) {
      $("#no-log").show();
    } else {
      $("#no-log").hide();
      for (let i = 0; i < log_data_filtered.length; i++) {
        $("#log-list").append(addLog(log_data_filtered[i][0], log_data_filtered[i][1], log_data_filtered[i][2], log_data_filtered[i][3], i+1));
      }
    }
    $("#notes-box").val("");

    $(".note").hide();
    $(".app-add").hide();
    $(".app-edit").hide();
    $(".are-you-sure").hide();
    $(".filter").hide();
  }

  initialize();

  $(document.body).on('click', '#submit-log' ,function(){
    let medication = 0;
    let pain = 0;

    if ($('#med-1').is(":checked")){medication += 4;};
    if ($('#med-2').is(":checked")){medication += 2;};
    if ($('#med-3').is(":checked")){medication += 1;};

    if ($('#happy').is(":checked")){pain = 0;};
    if ($('#mild').is(":checked")){pain = 1;};
    if ($('#sad').is(":checked")){pain = 2;};

    let notes = $("#notes-box").val();
    if (notes == "") {
      notes = "- No data -";
    }

    let d = new Date();
    let month = d.getMonth()+1;
    let day = d.getDate();

    let date = d.getFullYear() + '-' +
        (month<10 ? '0' : '') + month + '-' +
        (day<10 ? '0' : '') + day;

    let day_log = [date, medication, pain, notes];
    log_data.unshift(day_log);
    log_length += 1;
    initialize();
    alert("Log added successfully!")
  });

  $(document.body).on('click', '.view-notes' ,function(){
    let array = $(this).attr("id").split("-");
    let index = array[array.length - 1];

    let note_index = "#note-" + index;
    let button_index = "#view-notes-" + index;

    if ( $(note_index).first().is( ":hidden" ) ) {
      $(note_index).slideDown("slow");
      $(button_index).text("Close Notes");
    } else {
      $(note_index).slideUp("slow");
      $(button_index).text("View Notes");
    }
  });
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

  // FILTER
  $(document.body).on('click', '#filter-button' ,function(){
    if ( $("#filter").first().is( ":hidden" ) ) {
      $("#filter").slideDown("slow");
    } else {
      $("#filter").slideUp("slow");
    }
  });

  $(document.body).on('click', '#confirm-filter' ,function(){
    current_filter = $("#inputGroupSelect01").first().val();

    $("#filter").slideUp("slow", function(){
      initialize();
    });
  });

});