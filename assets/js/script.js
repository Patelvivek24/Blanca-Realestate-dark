/*-----------------------------------------------------------------------------------
    Template Name: Arinde - Architecture and Interiors HTML Template
    Template URI: https://arindehtml.lohatheme.com
    Author: Lohatheme
    Author URI:  https://lohatheme.com
    Version: 1.0

    Note: This is Main JS File.
-----------------------------------------------------------------------------------
    CSS INDEX
    ===================
    ## Header Style
    ## Dropdown menu
    ## Submenu
    ## Video Popup
    ## Hero Search
    ## Hero 2 Slider
    ## Project Filtering
    ## Timeline Images
    ## Timeline Content
    ## Service area slider
    ## Interior Area Slider
    ## Team slider
    ## Testimonials Slider
    ## Achievements Counter
    ## Before and After
    ## Scroll to Top
    ## WOW Animation
    ## Preloader
    
-----------------------------------------------------------------------------------*/

(function ($) {

    "use strict";

    $(document).ready(function () {
        
        // ## Header Style and Scroll to Top
        function headerStyle() {
            if ($('.main-header').length) {
                var windowpos = $(window).scrollTop();
                var siteHeader = $('.main-header');
                var scrollLink = $('.scroll-top');
                if (windowpos >= 250) {
                    siteHeader.addClass('fixed-header');
                    scrollLink.fadeIn(300);
                } else {
                    siteHeader.removeClass('fixed-header');
                    scrollLink.fadeOut(300);
                }
            }
        }
        headerStyle();

        // ## Active Navigation on Click and Scroll
        var $navLinks = $('.main-header .navigation a[href^="#"]');

        function setActiveNav(hash) {
            if (!hash) {
                return;
            }
            $navLinks.closest('li').removeClass('current current-menu-item');
            $navLinks.filter('[href="' + hash + '"]').closest('li')
                .addClass('current current-menu-item');
        }

        function updateActiveNav() {
            if (!$navLinks.length) {
                return;
            }
            var scrollPos = $(window).scrollTop() + 140;
            var activeHash = null;

            $navLinks.each(function () {
                var target = $(this).attr('href');
                if (!target || target.charAt(0) !== '#') {
                    return;
                }
                var $section = $(target);
                if (!$section.length) {
                    return;
                }
                var sectionTop = $section.offset().top;
                var sectionBottom = sectionTop + $section.outerHeight(true);
                if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                    activeHash = target;
                    return false;
                }
            });

            if (activeHash) {
                setActiveNav(activeHash);
            }
        }

        $navLinks.on('click', function () {
            var target = $(this).attr('href');
            if (target && target.charAt(0) === '#') {
                setActiveNav(target);
            }
        });

        updateActiveNav();
        $(window).on('scroll', updateActiveNav);

        // ## Header desktop dropdowns (click to open)
        var $headerDropdowns = $('.header-desktop-nav .header-link.has-submenu');

        if ($headerDropdowns.length) {
            $headerDropdowns.on('click', '> a', function (e) {
                e.preventDefault();
                e.stopPropagation();
                var $item = $(this).parent();
                $headerDropdowns.not($item).removeClass('is-open');
                $item.toggleClass('is-open');
            });

            $headerDropdowns.on('click', '.header-submenu a', function () {
                $headerDropdowns.removeClass('is-open');
            });

            $(document).on('click', function () {
                $headerDropdowns.removeClass('is-open');
            });

            $(document).on('keydown', function (e) {
                if (e.key === 'Escape') {
                    $headerDropdowns.removeClass('is-open');
                }
            });
        }

        // ## Dropdown menu
        var mobileWidth = 992;
        var navcollapse = $('.navigation li.dropdown');

        navcollapse.on('hover', function () {
            if ($(window).innerWidth() >= mobileWidth) {
                $(this).children('ul').stop(true, false, true).slideToggle(300);
                $(this).children('.megamenu').stop(true, false, true).slideToggle(300);
            }
        });

        // ## Submenu Dropdown Toggle
        if ($('.main-header .navigation li.dropdown ul').length) {
            $('.main-header .navigation li.dropdown').append('<div class="dropdown-btn"><span class="fas fa-chevron-down"></span></div>');

            //Dropdown Button
            $('.main-header .navigation li.dropdown .dropdown-btn').on('click', function () {
                $(this).prev('ul').slideToggle(500);
                $(this).prev('.megamenu').slideToggle(800);
            });

            //Disable dropdown parent link
            $('.navigation li.dropdown > a').on('click', function (e) {
                e.preventDefault();
            });
        }

        //Submenu Dropdown Toggle
        if ($('.main-header .main-menu').length) {
            $('.main-header .main-menu .navbar-toggle').on('click', function () {
                $(this).prev().prev().next().next().children('li.dropdown').hide();
            });
        }


        // ## Video Popup
        if ($('.video-play').length) {
            $('.video-play').magnificPopup({
              type: 'iframe',
              mainClass: 'mfp-fade',
              removalDelay: 160,
              preloader: false,
              iframe:{
                patterns:{
                  youtube:{
                  index: 'youtube.com',
                  id: 'v=',
                  src: 'https://www.youtube.com/embed/%id%'
                },
              },
              srcAction:'iframe_src',
            },
              fixedContentPos: false
            });
        }


        // ## Hero Search
        $(".header-inner .search-btns").on('click', function () {  
            if (document.getElementById("project-search").classList.contains("current")) {
                $(".search-project.search-form").removeClass("current");
            } else{
                $(".search-project.search-form").addClass("current");
            }
        });

        // Hero 2 Slider
        if ($('.hero-2-slider').length) {
            $('.hero-2-slider').slick({
                infinite: true,
                arrows: true,
                dots: true,
                fade: true,
                autoplay: true,
                prevArrow: '<button class="prev"><span class="carousel-control-prev-icon"><i class="fa fa-long-arrow-left"></i></span></button>',
                nextArrow: '<button class="next"><span class="carousel-control-next-icon"><i class="fa fa-long-arrow-right"></i></span></button>',
                autoplaySpeed: 8000,
                pauseOnHover: false,
                slidesToScroll: 1,
                slidesToShow: 1,
            });
        }

        // ## Project Filtering
        $(".project-filter li").on('click', function () {
            $(".project-filter li").removeClass("current");
            $(this).addClass("current");

            var selector = $(this).attr('data-filter');
            $('.project-active').imagesLoaded(function () {
                $(".project-active").isotope({
                    itemSelector: '.item',
                    filter: selector,
                }); 
            });

        });
        if ($('.project-active').length) {
            $(this).imagesLoaded(function () {
                $('.project-active').isotope({
                    // options
                    itemSelector: '.item',
                });
            });
        }

        // ## Timeline Images
        if ($('.timeline-images').length) {
            $('.timeline-images').slick({
                dots: false,
                infinite: true,
                autoplay: false,
                autoplaySpeed: 5000,
                arrows: false,
                vertical: false,
                speed: 1000,
                fade: true,
                asNavFor: '.timeline-content',
                variableWidth: false,
                focusOnSelect: false,
                slidesToShow: 1,
                slidesToScroll: 1,
            });
        }

        // ## Timeline Content Slider
        if ($('.timeline-content').length) {
            $('.timeline-content').slick({
                dots: false,
                infinite: true,
                autoplay: false,
                autoplaySpeed: 5000,
                arrows: false,
                vertical: true,
                speed: 1000,
                asNavFor: '.timeline-images',
                variableWidth: false,
                focusOnSelect: true,
                slidesToShow: 4,
                slidesToScroll: 1,
            });
        }

        // ## Service area slider
        if ($('#servicerecipeCarousel .carousel-item').length) {
            let serviceitems = document.querySelectorAll('#servicerecipeCarousel .carousel-item')
            serviceitems.forEach((el) => {
                const minPerSlide = 4
                let next = el.nextElementSibling            
                for (var i=1; i<minPerSlide; i++) {
                    if (!next) {
                        next = serviceitems[0]
                    }   
                    let cloneChild = next.cloneNode(true)
                    el.appendChild(cloneChild.children[0])
                    next = next.nextElementSibling
                }
            })
        }
        
        if ($('#service2Carousel .carousel-item').length) {
            let items = document.querySelectorAll('#service2Carousel .carousel-item')
            items.forEach((el) => {
                const minPerSlide = 3
                let next = el.nextElementSibling            
                for (var i=1; i<minPerSlide; i++) {
                    if (!next) {
                        next = items[0]
                    }   
                    let cloneChild = next.cloneNode(true)
                    el.appendChild(cloneChild.children[0])
                    next = next.nextElementSibling
                }
            })
        }
        
        // ## Interior Area Slider
        if ($('.interior-area .carousel-item').length) {
            let numbernavs = document.getElementsByClassName("interior-nav").length;            
            for(var d=1;d<=numbernavs;d++){
                let interitems = document.querySelectorAll('#interiorrecipeCarousel'+d+' .carousel-item')
                interitems.forEach((el) => {
                    const minPerSlide = 3
                    let next = el.nextElementSibling            
                    for (var i=1; i<minPerSlide; i++) {
                        if (!next) {
                            next = interitems[0]
                        }   
                        let cloneChild = next.cloneNode(true)
                        el.appendChild(cloneChild.children[0])
                        next = next.nextElementSibling
                    }
                })
            }
        }

        // ## Future Projects Parallax Cards
        const parallaxCards = document.querySelectorAll('#future-projects .project-parallax-card');
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

        if (parallaxCards.length && !prefersReducedMotion && supportsHover) {
            parallaxCards.forEach((card) => {
                const image = card.querySelector('img');
                const caption = card.querySelector('.carousel-caption');
                const maxTilt = 10;
                const maxShift = 16;
                let bounds = null;
                let rafId = null;
                let isActive = false;

                const updateCard = (clientX, clientY) => {
                    if (!bounds) {
                        bounds = card.getBoundingClientRect();
                    }
                    const relX = (clientX - bounds.left) / bounds.width;
                    const relY = (clientY - bounds.top) / bounds.height;
                    const rotateX = (0.5 - relY) * maxTilt;
                    const rotateY = (relX - 0.5) * (maxTilt + 2);
                    const shiftX = (relX - 0.5) * maxShift;
                    const shiftY = (relY - 0.5) * maxShift;

                    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                    if (image) {
                        image.style.transform = `translate3d(${shiftX}px, ${shiftY}px, 18px) scale(1.03)`;
                    }
                    if (caption) {
                        caption.style.transform = `translate3d(${-shiftX * 0.6}px, ${-shiftY * 0.6}px, 36px)`;
                    }
                };

                const onMove = (event) => {
                    if (!isActive) {
                        return;
                    }
                    const { clientX, clientY } = event;
                    if (rafId) {
                        return;
                    }
                    rafId = requestAnimationFrame(() => {
                        if (isActive) {
                            updateCard(clientX, clientY);
                        }
                        rafId = null;
                    });
                };

                const onEnter = () => {
                    isActive = true;
                    bounds = card.getBoundingClientRect();
                };

                const onLeave = () => {
                    isActive = false;
                    bounds = null;
                    if (rafId) {
                        cancelAnimationFrame(rafId);
                        rafId = null;
                    }
                    card.style.transform = 'rotateX(0deg) rotateY(0deg)';
                    if (image) {
                        image.style.transform = 'translate3d(0, 0, 0) scale(1)';
                    }
                    if (caption) {
                        caption.style.transform = 'translate3d(0, 0, 0)';
                    }
                };

                card.addEventListener('mouseenter', onEnter);
                card.addEventListener('mousemove', onMove);
                card.addEventListener('mouseleave', onLeave);
                window.addEventListener('resize', () => {
                    bounds = null;
                });
            });
        }

        // ## Team slider
        if ($('#teamCarousel .carousel-item').length) {
            let items = document.querySelectorAll('#teamCarousel .carousel-item')
            items.forEach((el) => {
                const minPerSlide = 3
                let next = el.nextElementSibling            
                for (var i=1; i<minPerSlide; i++) {
                    if (!next) {
                        next = items[0]
                    }   
                    let cloneChild = next.cloneNode(true)
                    el.appendChild(cloneChild.children[0])
                    next = next.nextElementSibling
                }
            })
        }


        // Testimonials Slider
        if ($('#testiCarousel .carousel-item').length) {
            let items = document.querySelectorAll('#testiCarousel .carousel-item')
            items.forEach((el) => {
                const minPerSlide = 1
                let next = el.nextElementSibling            
                for (var i=1; i<minPerSlide; i++) {
                    if (!next) {
                        next = items[0]
                    }   
                    let cloneChild = next.cloneNode(true)
                    el.appendChild(cloneChild.children[0])
                    next = next.nextElementSibling
                }
            })
        }
        if ($('#testi2Carousel .carousel-item').length) {
            let items = document.querySelectorAll('#testi2Carousel .carousel-item')
            items.forEach((el) => {
                const minPerSlide = 3
                let next = el.nextElementSibling            
                for (var i=1; i<minPerSlide; i++) {
                    if (!next) {
                        next = items[0]
                    }   
                    let cloneChild = next.cloneNode(true)
                    el.appendChild(cloneChild.children[0])
                    next = next.nextElementSibling
                }
            })
        }

        /* ## Achievements Counter */
        if ($('.counter-text-wrap').length) {
            $('.counter-text-wrap').appear(function () {

                var $t = $(this),
                    n = $t.find(".count-text").attr("data-stop"),
                    r = parseInt($t.find(".count-text").attr("data-speed"), 10);

                if (!$t.hasClass("counted")) {
                    $t.addClass("counted");
                    $({
                        countNum: $t.find(".count-text").text()
                    }).animate({
                        countNum: n
                    }, {
                        duration: r,
                        easing: "linear",
                        step: function () {
                            $t.find(".count-text").text(Math.floor(this.countNum));
                        },
                        complete: function () {
                            $t.find(".count-text").text(this.countNum);
                        }
                    });
                }

            }, {
                accY: 0
            });
        }

        /* ## Why Choose Us Stats Counter */
        if ($('.stat-number').length) {
            $('.stat-number').appear(function () {
                var $t = $(this),
                    n = parseInt($t.attr("data-count"), 10),
                    duration = 2000;

                if (!$t.hasClass("counted")) {
                    $t.addClass("counted");
                    $({
                        countNum: 0
                    }).animate({
                        countNum: n
                    }, {
                        duration: duration,
                        easing: "swing",
                        step: function () {
                            $t.text(Math.floor(this.countNum));
                        },
                        complete: function () {
                            $t.text(this.countNum);
                        }
                    });
                }
            }, {
                accY: 0
            });
        }


        // ## Before and After 
        if ($('.projects-02 .tab-content  .pro-02-images').length) {
            let pro02items = $('.projects-02 .tab-content  .pro-02-images').length;    
            for(var cout=1;cout<=pro02items;cout++){
                let imgcontainer = document.querySelector('.pro-02-images-'+cout);
                document.querySelector('.buttonslider'+cout).addEventListener('input', (e) => {
                  imgcontainer.style.setProperty('--position', `${e.target.value}%`);
                })
            }
        }
    
        // ## Scroll to Top
        if ($('.scroll-to-target').length) {
            $(".scroll-to-target").on('click', function () {
                var target = $(this).attr('data-target');
                // animate
                $('html, body').animate({
                    scrollTop: $(target).offset().top
                }, 1000);

            });
        }

        // ## WOW Animation
        if ($('.wow').length) {
            var wow = new WOW({
                boxClass: 'wow', // animated element css class (default is wow)
                animateClass: 'animated', // animation css class (default is animated)
                offset: 0, // distance to the element when triggering the animation (default is 0)
                mobile: false, // trigger animations on mobile devices (default is true)
                live: true // act on asynchronously loaded content (default is true)
            });
            wow.init();
        }

        // ## Footer Water Ripple Effect
        if ($('.modern-footer').length && $.fn.ripples) {
            try {
                $('.modern-footer').ripples({
                    resolution: 512,
                    dropRadius: 20,
                    perturbance: 0.04,
                    interactive: true,
                    crossOrigin: ''
                });
            } catch(e) {
                console.log('Ripples effect initialization error:', e);
            }
        }
        


    });


    /* ==========================================================================
       When document is resize, do
       ========================================================================== */

    $(window).on('resize', function () {
        var mobileWidth = 992;
        var navcollapse = $('.navigation li.dropdown');
        navcollapse.children('ul').hide();
        navcollapse.children('.megamenu').hide();

    });


    /* ==========================================================================
       When document is scroll, do
       ========================================================================== */

    $(window).on('scroll', function () {

        // Header Style and Scroll to Top
        function headerStyle() {
            if ($('.main-header').length) {
                var windowpos = $(window).scrollTop();
                var siteHeader = $('.main-header');
                var scrollLink = $('.scroll-top');
                if (windowpos >= 100) {
                    siteHeader.addClass('fixed-header');
                    scrollLink.fadeIn(300);
                } else {
                    siteHeader.removeClass('fixed-header');
                    scrollLink.fadeOut(300);
                }
            }
        }

        headerStyle();

    });

    /* ==========================================================================
       When document is loaded, do
       ========================================================================== */

    $(window).on('load', function () {

        // ## Preloader
        function handlePreloader() {
            if ($('.preloader').length) {
                $('.preloader').delay(200).fadeOut(500);
            }
        }
        handlePreloader();

    });



})(window.jQuery);



    



