$(document).ready(function() {
    // Preloader
    setTimeout(function() {
        $('.preloader').fadeOut(500);
    }, 1000);
    
    // Initialize Slick Slider with enhanced settings
    $('.gallery-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        arrows: true,
        centerMode: true,
        centerPadding: '0',
        prevArrow: '<button class="slick-prev" aria-label="Previous" type="button"><i class="fas fa-chevron-left"></i></button>',
        nextArrow: '<button class="slick-next" aria-label="Next" type="button"><i class="fas fa-chevron-right"></i></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    centerMode: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: '40px'
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: '20px'
                }
            }
        ]
    });

    // Mobile Menu Toggle with smooth animation
    $('.hamburger').click(function() {
        $(this).toggleClass('active');
        $('nav').toggleClass('active');
        $('body').toggleClass('menu-open');
    });

    // Close mobile menu when clicking a nav item
    $('nav ul li a').click(function() {
        $('.hamburger').removeClass('active');
        $('nav').removeClass('active');
        $('body').removeClass('menu-open');
    });

    // Scroll to sections with smooth animation
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        var target = $(this.getAttribute('href'));
        
        if(target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 70
            }, 800, 'easeInOutQuart');
        }
    });

    // Add easing functions if not provided by jQuery UI
    if (typeof $.easing.easeInOutQuart === 'undefined') {
        $.extend($.easing, {
            easeInOutQuart: function (x, t, b, c, d) {
                if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
                return -c/2 * ((t-=2)*t*t*t - 2) + b;
            }
        });
    }

    // Back to Top Button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').addClass('active');
        } else {
            $('.back-to-top').removeClass('active');
        }
        
        // Add .active class to nav items based on scroll position
        activateMenuByScroll();
        
        // Animate elements on scroll
        animateOnScroll();
    });

    // Activate menu items based on scroll position
    function activateMenuByScroll() {
        var scrollPosition = $(document).scrollTop() + 80;
        
        // Activate menu item
        $('nav ul li a').each(function() {
            var currentLink = $(this);
            var refElement = $(currentLink.attr("href"));
            
            if (refElement.length && refElement.position().top <= scrollPosition && refElement.position().top + refElement.height() > scrollPosition) {
                $('nav ul li a').removeClass("active");
                currentLink.addClass("active");
            } else {
                currentLink.removeClass("active");
            }
        });
    }

    // Animate elements when they come into view
    function animateOnScroll() {
        $('.fade-in').each(function() {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('appear');
            }
        });
    }

    // Add fade-in class to elements for animation
    $('.section-header, .about-image, .about-text, .service-card, .slide, .contact-info-card, .social-media-buttons').addClass('fade-in');
    
    // Trigger initial animation
    setTimeout(function() {
        animateOnScroll();
    }, 100);

    // Add smooth hover effect to service cards
    $('.service-card').hover(
        function() {
            $(this).find('.service-icon i').addClass('animated');
        },
        function() {
            $(this).find('.service-icon i').removeClass('animated');
        }
    );

    // WhatsApp popup engagement reminder
    setTimeout(function() {
        $('.whatsapp-popup').addClass('pulse-attention');
        setTimeout(function() {
            $('.whatsapp-popup').removeClass('pulse-attention');
        }, 2000);
    }, 5000);
}); 