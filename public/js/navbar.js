$(document).ready(function(){
  $(document.body).on('click', "#info-page", function() {
    window.location.replace("../profile/profile.html");
  });
  $(document.body).on('click', "#moments-page", function() {
    window.location.replace("../moments/moments.html");
  });
  $(document.body).on('click', "#health-page", function() {
    window.location.replace("../health/health.html");
  });
  $(document.body).on('click', "#food-page", function() {
    window.location.replace("../food/main.html");
  });
});