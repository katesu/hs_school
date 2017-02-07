$(document).ready(function() {

    //---------------------//
    //	generic variebles  //
    //---------------------//
    var $mainNav = $('.js-main-nav');
    var $navItemLevels = $('.js-nav__item--levels');
    var $navLink = $('.js-nav__link');
    var $subNav = $('.js-sub-nav');
    var $subNavitem = $('.js-sub-nav__item');

    var navItemLevels = '.js-nav__item--levels';




    //-------------------------//
    //	hover bar on main nav  //
    //-------------------------//

    //	settings of hover bar on main nav
    function navBarAni($ref_width, $ref_left, speed) {
        $('.js-nav-hover-bar')
            .stop()
            .css({
                'width': $ref_width * 0.8 + 'px',
                'margin-left': $ref_width * 0.2 / 2 + 'px'
            })
            .animate({
                'left': $ref_left + 'px',
            }, speed);
    }

    /*
     *when mouse enters a main nav item,
     *hover bar goes to current target position
     */
    function navbar_enter() {
        var $mainNavItem_width = $(this).width();
        var $mainNavItem_left = $(this).position().left;

        navBarAni($mainNavItem_width, $mainNavItem_left, 450);
    }

    /*
     *when mouse leaves out tha main nav,
     *hover bar goes to first item positon
     */
    function navbar_leave() {
        var $activeNavItem_width = $('.js-main-nav__item.is-active').width();
        var $activeNavItem_left = $('.js-main-nav__item.is-active').position().left;

        navBarAni($activeNavItem_width, $activeNavItem_left, 400);

        $(window).on('load resize', navbar_leave);
    }


    $('.js-main-nav__item')
        .mouseenter(navbar_enter)
        .mouseleave(navbar_leave)




    //----------------------//
    //	nav-btn on mobile	//
    //----------------------//
    $('.js-m-nav-btn').click(function(e) {
        e.preventDefault();
        $('body').toggleClass('show');
    });




    //-----------------------------------//
    //	the sub menu slides down and up  //
    //-----------------------------------//

    /*
     *iphone up only --
     *suv menu slides up after a click on a suv menu item
     *meanwhile hover bar goes to first item positon
     */
    function Nav_slideUp_mUp() {
        $(this)
        	.closest(navItemLevels)
        	.removeClass('nav__item--show-sub');
        navbar_leave();
    };

    /*
     *phone down onlu --
     *suv menu and main nav slide up after a click on a suv menu item
     */
    function Navs_slideUp_mDn(e) {
        var main_nav__close = function() {
            setTimeout(function() {
                $('body').removeClass('show');
            }, 200);
        };
        e.stopPropagation();
        $(this)
        	.closest(navItemLevels)
        	.removeClass('nav__item--show-sub');
        main_nav__close();
        clearTimeout(main_nav__close);

    };

    // sub menu slides down
    function subNav_slideDown() {
        $(this).addClass('nav__item--show-sub');
    };

    // sub menu slides up
    function subNav_slideUp(e) {
        $(this).removeClass('nav__item--show-sub');
    };

    // sub menu slides up and down
    function subNav_slideToggle() {
        $(this).toggleClass('nav__item--show-sub');
    };


     $(window).on('ready load resize', function() {
        var $viewport = $(window).width();
        var isIphoneUp = $viewport > 568;

        /*
         *iphone up --show a sub menu by
         *hovering a main nav item which has one,
         *and close the sub menu by clicking items in it
         */
        if (isIphoneUp) {
        	$navItemLevels
        		.unbind('mousedown', subNav_slideToggle)
        	    .bind('mouseover', subNav_slideDown)
        	    .bind('mouseleave', subNav_slideUp);
            $subNavitem
                .unbind('click', Navs_slideUp_mDn)
                .bind('click', Nav_slideUp_mUp);

            /*
             *iphone down --stop hovering the main nav items,
             *and clicking a sub menu item triggers main nav slides up
             */
        } else {
            $navItemLevels
            	.bind('mousedown', subNav_slideToggle)
                .unbind('mouseover', subNav_slideDown)
                .unbind('mouseleave', subNav_slideUp);
            $subNavitem
                .unbind('click', Nav_slideUp_mUp)
                .bind('click', Navs_slideUp_mDn);
        };
    });




    //-----------------------------------//
    //	banner--settings of nivo slider  //
    //-----------------------------------//
    $(window).on('load', function() {
        $('#slider').nivoSlider({
            effect: 'fade,sliceUp,boxRainReverse', // Specify sets like: 'fold,fade,sliceDown'
            slices: 15, // For slice animations
            boxCols: 8, // For box animations
            boxRows: 4, // For box animations
            animSpeed: 500, // Slide transition speed
            pauseTime: 3000, // How long each slide will show
            startSlide: 0, // Set starting Slide (0 index)
            directionNav: true, // Next & Prev navigation
            controlNav: true, // 1,2,3... navigation
            controlNavThumbs: false, // Use thumbnails for Control Nav
            pauseOnHover: true, // Stop animation while hovering
            manualAdvance: false, // Force manual transitions
            prevText: 'Prev', // Prev directionNav text
            nextText: 'Next', // Next directionNav text
            randomStart: false, // Start on a random slide
            beforeChange: function() {}, // Triggers before a slide transition
            afterChange: function() {}, // Triggers after a slide transition
            slideshowEnd: function() {}, // Triggers after all slides have been shown
            lastSlide: function() {}, // Triggers when last slide is shown
            afterLoad: function() {} // Triggers when slider has loaded
        });
    });




    //-------------------------------------------//
    //	img in featured list--lightbox effect    //
    //-------------------------------------------//
    lightbox.option({
        'resizeDuration': 700,
        'wrapAround': true
    });





    //---------------------//
    //	go top button      //
    //---------------------//
    $('.js-go-top').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 900);
    });


});
