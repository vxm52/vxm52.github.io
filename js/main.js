
// Autotyping Text
var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 150 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  // css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};
// End of Autotyping Text




$(document).ready(function() {

  // Projects area - Filter (using Isotope package)
  let $btns = $('.project-area .button-group button');
  $btns.click(function(e) {
    $('.project-area .button-group button').removeClass('active');
    e.target.classList.add('active');
    
    let selector = $(e.target).attr('data-filter');
    $('.project-area .grid').isotope({
      filter : selector
    });

    return false;
  });
  
  $('.project-area .button-group #btn1').trigger('click');
  $('.project-area .grid .test-popup-link').magnificPopup({
    type: 'image',
    gallery:{enabled:true}
  });


  // Collapsed Navbar close-on-click outside
  
  // $(document).click(function(e) {
  //   var clickOutside = $(e.target);
  //   var _opened = $(".navbar-collapse").hasClass("navbar-collapse");
  //   if (_opened && !clickOutside.hasClass("navbar-toggler") && window.matchMedia("(max-width: 767px)").matches) {
  //     $("button.navbar-toggler").click();
  //   }
  // });
});


// Sticky navigation menu
let nav_offset_top = $('.header_area').height() + 600;
function navbarFixed() {
  if ($('.header_area').length) {
    $(window).scroll(function() {
      let scroll = $(window).scrollTop();
      if (scroll >= nav_offset_top) {
        $('.header_area .main-menu').addClass('navbar_fixed');
      } else {
        $('.header_area .main-menu').removeClass('navbar_fixed');
      }
    })
  }
}

navbarFixed();
