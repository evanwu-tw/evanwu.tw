// head scroll fix
function headScroll() {
  $(window).scroll(function () {
    console.log(2222);
    if ($(window).scrollTop()) {
      $('.header').addClass('is-scroll');
    } else {
      $('.header').removeClass('is-scroll');
    }
  });
}

// docmuent ready
$(document).ready(function () {
  console.log(1111);
  headScroll();
});
