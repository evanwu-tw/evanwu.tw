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

// nav-collapse
function navCollapse() {
  var burgerIcon = $('.burg');
  var container = $('.header');
  var navBtn = $('.nav-ctrl-btn');

  navBtn.on('click', function () {
    burgerIcon.toggleClass('activeBurg');
    container.toggleClass('open-menu');
  });
}

// docmuent ready
$(document).ready(() => {
  headScroll();
  navCollapse();
});
