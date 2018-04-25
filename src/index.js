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

  $('.nav__link').on('click', () => {
    $('.burg').removeClass('activeBurg');
    $('.header').removeClass('open-menu');
  });  
}

// smooth scroll
function smoothScroll() {
  $('a[href*="#"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top - 30
        }, 1000
      );
      }
    }
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
  smoothScroll();
});
