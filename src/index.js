const $ = require('jquery');
require('./scss/basic.scss');

// head scroll fix
function headScroll() {
  $(window).scroll(() => {
    if ($(window).scrollTop()) {
      $('.header').addClass('is-scroll');
    } else {
      $('.header').removeClass('is-scroll');
    }
  });
}

// docmuent ready
$(document).ready(() => {
  headScroll();
});
