// head scroll fix
function headScroll() {
  $(window).scroll(function () {
    if ($(window).scrollTop()) {
      $('.header').addClass('is-scroll');
    } else {
      $('.header').removeClass('is-scroll');
    }
  });
}

// docmuent ready
$(document).ready(function () {
  headScroll();
});