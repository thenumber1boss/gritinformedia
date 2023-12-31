jQuery(document).ready(function( $ ) {

  // Header fixed and Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
      $('#header').addClass('header-fixed');
    } else {
      $('.back-to-top').fadeOut('slow');
      $('#header').removeClass('header-fixed');
    }
  });
  $('.back-to-top').click(function(){
    $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
    return false;
  });

  // Initiate the wowjs
  new WOW().init();

  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
    animation: {opacity:'show'},
    speed: 400
  });

  // Mobile Navigation
  if( $('#nav-menu-container').length ) {
    var $mobile_nav = $('#nav-menu-container').clone().prop({ id: 'mobile-nav'});
    $mobile_nav.find('> ul').attr({ 'class' : '', 'id' : '' });
    $('body').append( $mobile_nav );
    $('body').prepend( '<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>' );
    $('body').append( '<div id="mobile-body-overly"></div>' );
    $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

    $(document).on('click', '.menu-has-children i', function(e){
      $(this).next().toggleClass('menu-item-active');
      $(this).nextAll('ul').eq(0).slideToggle();
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(document).on('click', '#mobile-nav-toggle', function(e){
      $('body').toggleClass('mobile-nav-active');
      $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
      $('#mobile-body-overly').toggle();
    });

    $(document).click(function (e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
       if ( $('body').hasClass('mobile-nav-active') ) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
      }
    });
  } else if ( $("#mobile-nav, #mobile-nav-toggle").length ) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // Smoth scroll on page hash links
  $('a[href*="#"]:not([href="#"])').on('click', function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {

      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if( $('#header').length ) {
          top_space = $('#header').outerHeight();

          if( ! $('#header').hasClass('header-fixed') ) {
            top_space = top_space - 20;
          }
        }

        $('html, body').animate({
          scrollTop: target.offset().top - top_space
        }, 1500, 'easeInOutExpo');

        if ( $(this).parents('.nav-menu').length ) {
          $('.nav-menu .menu-active').removeClass('menu-active');
          $(this).closest('li').addClass('menu-active');
        }

        if ( $('body').hasClass('mobile-nav-active') ) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
        return false;
      }
    }
  });


// custom code

});

//what-carousel
function autoSwipe() {
  const carousel = document.querySelector('.what-carousel');
  const carouselWidth = carousel.offsetWidth;
  const list = document.querySelector('.what-carousel ul');
  const listItems = document.querySelectorAll('.what-carousel li');
  const slideWidth = listItems[0].offsetWidth; // Width of a single slide
  const slidesToShow = 3; // Number of slides to show at a time

  let currentPosition = 0;
  let intervalId;

  function moveCarousel() {
    currentPosition -= slideWidth;
    if (window.innerWidth >= 768) { // Larger screens
      if (currentPosition <= -(slideWidth * (listItems.length - slidesToShow))) {
        currentPosition = 0;
      }
    } else { // Smaller screens
      if (currentPosition <= -(slideWidth * (listItems.length - 1))) {
        currentPosition = 0;
      }
    }
    list.style.transform = `translateX(${currentPosition}px)`;
  }

  function startAutoSwipe() {
    let swipeTime = 3000; // Default swipe time

    if (window.innerWidth < 480) { // Smaller screens
      swipeTime = 1000; // Adjusted swipe time for smaller screens
    }

    intervalId = setInterval(moveCarousel, swipeTime);
  }

  startAutoSwipe();
}

document.addEventListener('DOMContentLoaded', autoSwipe);


// Clients carousel

$(document).ready(function(){
  $('.carousel-client').slick({
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 556,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  });

      $('.carousel-client-controls .slick-prev').click(function() {
        $('.carousel-client').slick('slickPrev');
      });

      $('.carousel-client-controls .slick-next').click(function() {
        $('.carousel-client').slick('slickNext');
      });
    });


// Testimonial carousel
    $(document).ready(function() {
      $('.fact-carousel').slick({
        slidesToShow: 3, // Display 3 testimonials at once on laptop screen
        slidesToScroll: 1, // Scroll one testimonial at a time
       prevArrow: false, // Hide the previous button
      nextArrow: false, // Hide the next button
        responsive: [
          {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
          infinite: false
        }
        },
              {
                breakpoint: 768, // Smaller screen breakpoint
                settings: {
                  slidesToShow: 1, // Display 1 testimonial on smaller screens
                  slidesToScroll: 1, // Scroll one testimonial at a time
                  dots: true,
                  infinite: false
                }
              }
            ]
      });
    });

 //blog articles
    // Define the base URL or path to the folder containing the article files
    var articleBasePath = '/articles/'; // Relative path from the root folder

    $(document).ready(function () {
        $('.clickable-article').click(function () {
            if (!$('.inform-container').hasClass('active')) {
                var article = $(this).data('article');
                var articleURL = articleBasePath + article + '.html';

                // Use AJAX to fetch the article content from the separate file
                $.ajax({
                    url: articleURL,
                    type: 'GET',
                    dataType: 'html',
                    success: function (response) {
                        // Update the #article-content with the fetched content
                        $('#article-content').html(response);

                        // Show the article container
                        $('#article-container').removeClass('hidden').addClass('active');

                        // Add the overlay and make the main page inactive
                        $('body').addClass('main-page-inactive');
                        $('.inactive-overlay').addClass('active');
                    },
                    error: function () {
                        // Handle error if the article file cannot be loaded
                        console.error('Error loading article content.');
                    }
                });
            }
        });

        $('#close-button').click(function () {
            $('#article-container').addClass('hidden').removeClass('active');
            $('#article-content').html('');
            $('body').removeClass('main-page-inactive');
            $('.inactive-overlay').removeClass('active');
        });
    });
    


    // construction

const blocks = document.querySelectorAll('.block');

function startAnimation() {
  let delay = 0;
  blocks.forEach((block, index) => {
    block.style.animation = 'blockAnimation 2s infinite';
    block.style.animationDelay = `${delay}s`;
    delay += 0.2; // Adjust the delay to control the animation speed
  });
}

startAnimation();


//FAQ section


document.addEventListener("DOMContentLoaded", function () {
  const questionElements = document.querySelectorAll(".question");

  questionElements.forEach(function (question) {
    const toggleElement = question.querySelector(".toggle");
    const answerElement = question.nextElementSibling;

    // Initially hide the answer elements with small max-height
    answerElement.style.maxHeight = "1px";

    question.addEventListener("click", function () {
      if (answerElement.style.maxHeight === "1px") {
        // Show the answer with the sliding animation
        answerElement.style.maxHeight = answerElement.scrollHeight + "px";
        toggleElement.textContent = "-";
      } else {
        // Hide the answer with the sliding animation
        answerElement.style.maxHeight = "1px";
        toggleElement.textContent = "+";
      }
    });
  });
});


document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');

  form.addEventListener('submit', function (event) {
      // Flag to track if there are validation errors
      let hasErrors = false;

      // Validation function
      function validateField(field, rule, errorMsg) {
          const value = field.value.trim();

          if (rule === 'required' && value === '') {
              showError(field, errorMsg);
              hasErrors = true;
          } else if (rule === 'email' && !isValidEmail(value)) {
              showError(field, errorMsg);
              hasErrors = true;
          } else if (rule.startsWith('minlen:') && value.length < parseInt(rule.split(':')[1])) {
              showError(field, errorMsg);
              hasErrors = true;
          }
      }

      // Show error message and prevent form submission
      function showError(field, errorMsg) {
          const validationDiv = field.nextElementSibling;
          validationDiv.innerHTML = errorMsg;
          validationDiv.style.display = 'block';
      }

      // Check if the email is valid
      function isValidEmail(email) {
          // A simple email validation regex, you might want to use a more robust one
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(email);
      }

      // Reset error messages
      const errorMessages = document.querySelectorAll('.validation');
      errorMessages.forEach(message => message.style.display = 'none');

      // Validate each field
      validateField(form.elements['name'], 'required', 'Please enter your name.');
      validateField(form.elements['email'], 'email', 'Please enter a valid email address.');
      validateField(form.elements['subject'], 'minlen:4', 'Please enter a subject with at least 4 characters.');
      validateField(form.elements['message'], 'required', 'Please write something for us.');

      // Prevent form submission if there are validation errors
      if (hasErrors) {
          event.preventDefault();
      }
  });
});




 // footercurrent year
    var currentYear = new Date().getFullYear();
    
    // Update the content of the currentYear element
    document.getElementById("currentYear").textContent = currentYear;
