$(window).scroll(function () {
  // Get the current scroll position
  var scrollTop = $(this).scrollTop();
  // Calculate the opacity based on scroll position
  var opacity = 1 - scrollTop / 100; // Adjust 200 for quicker or slower fade

  // Check if opacity reaches 0, and add class
  if (opacity <= 0) {
    $("#navbar").addClass("navbar-fixed animate__animated animate__fadeInDown");
  } else {
    $("#navbar").removeClass(
      "navbar-fixed animate__animated animate__fadeInDown"
    );
  }
});

$("#search-btn").click(function (e) {
  if ($(".col-search.mobile").length === 0) {
    var clonedElement = $(".col-search").clone().addClass("mobile").hide();
    $(".col-search").after(clonedElement);
  }

  function toggleMobileSearch() {
    if ($(window).width() <= 768) {
      $(".col-search.mobile").slideToggle();
    } else {
      $(".col-search.mobile").hide();
    }
  }

  // Run on page load and window resize
  $(document).ready(toggleMobileSearch);
  $(window).resize(toggleMobileSearch);
});
