let info_selection = 0;

$(document).ready(function(){
  $("#info-change").hide();
  $("#are-you-sure-1").hide();

  $("#info-edit").click(function() {
    if ($("#info-change").first().is( ":hidden" ) ){
      $("#info-change").slideDown("slow");
    } else {
      $("#info-change").slideUp("slow");
    }
  });

  $("#inputGroupSelect01").change(function () {
       let index = this.value;
       info_selection = index;
       let id = "#info-" + index;
       let value = $(id).text().trim();
       if (value != "- No data -") {
        $("#info-change-val").val($(id).text().trim());
       } else {
        $("#info-change-val").val("");
       }
   });

  $("#confirm-info").click(function() {
    let index = info_selection;
    let id = "#info-" + index.toString();
    let value = $("#info-change-val").val().trim();
    if (value != "") {
      $(id).text(value);
      $(id).attr('class', 'col-6 text-black');
      $("#info-change").slideUp("slow");
    } else {
      if (id != "#info-0") {
        $("#are-you-sure-1").slideDown("slow");
      }
    }
  });

  $("#confirm-1").click(function() {
    let index = info_selection;
    let id = "#info-" + index.toString();

    $(id).text("- No data -");
    $(id).attr('class', 'col-6 text-gray');

    $("#info-change").slideUp("slow");
    $("#are-you-sure-1").slideUp("slow");
  });
  $("#cancel-1").click(function() {
    $("#are-you-sure-1").slideUp("slow");
  });

});