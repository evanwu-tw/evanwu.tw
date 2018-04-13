const $ = require('jquery');
window.jQuery = $;
const Parallax = require('parallax-js')
require('@fancyapps/fancybox');
require('@fancyapps/fancybox/dist/jquery.fancybox.min.css');
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
  $('.nav-ctrl-btn').on('click', () => {
    $('.burg').toggleClass('activeBurg');
    $('.header').toggleClass('open-menu');
  });
}

function heroParallax() {
  const parallaxInstance = new Parallax($('.hero-bg')[0]);

  // Disable parallax effect if scroll till half hero's height
  $(window).scroll(() => {
    if ($(window).scrollTop() > $('.hero-bg')[0].clientHeight / 2) {
      parallaxInstance.disable();
    } else {
      parallaxInstance.enable();
    }
  });
}

// docmuent ready
$(document).ready(() => {
  headScroll();
  navCollapse();
  heroParallax();
});
