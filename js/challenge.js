/*******************************************
 *  challenge.js
 *******************************************/

/*******************************************
 *  Helper Functions
 *******************************************/

// Handles flash of unstyled content.
function fouc() {
  $('html').removeClass('no-js').addClass('js');
}

// Add all scroll functions here
function scroll() {
	main_navigation_scroll();
};

// Optimize the scroll events.
function optimizeScroll() {
	var scrollWaiting = false, endScrollHandle;
	$(window).scroll(function () {
	  if (scrollWaiting) {
	    return;
	  }
	  scrollWaiting = true;

	  // clear previous scheduled endScrollHandle
	  clearTimeout(endScrollHandle);

	  scroll();

	  setTimeout(function () {
	    scrollWaiting = false;
	  }, 100);

	  // schedule an extra execution of scroll() after 200ms
	  // in case the scrolling stops in next 100ms
	  endScrollHandle = setTimeout(function () {
	    scroll();
	  }, 200);
	});
}

/*******************************************
 *  Custom Functions for the theme
 *******************************************/

function main_navigation_scroll() {

	var scrollTop = $(window).scrollTop();
	var $site_header = $(".site-header");
	var $site_header_spacer = $(".site-header__spacer");

	if (scrollTop > 0) {
		$site_header.removeClass("top");
		$site_header_spacer.removeClass("top");
	} else {
		$site_header.addClass("top");
		$site_header_spacer.addClass("top");
	}
}

// function match_heights_init() {
//   /**
//   * Match Height Calls
//   * use attr data-mh="group-name" to group
//   */
//   var matchHeightTitle  = $(".match-height-title");
//   var matchHeightContent = $(".match-height-content");
//
//   if( $(".match-height-row").length ) {
//     $(".match-height-row").matchHeight({
//         byRow: true
//     });
//   }
//
//   if( $(".match-height").length ) {
//     $(".match-height").matchHeight({
//         byRow: false
//     });
//   }
//
//   if( $(".match-height-rows").length ) {
//     $(".match-height-rows").matchHeight({
//         byRow: true
//     });
//   }
//
//   if( matchHeightTitle.length ) {
//     matchHeightTitle.matchHeight({
//         byRow: true
//     });
//   }
//
//   if( matchHeightContent.length ) {
//     matchHeightContent.matchHeight({
//         byRow: true
//     });
//   }
// }

function anchor_smooth_scrolling() {
  var spacing = 86;
  $('a[href*=\\#]:not([href=\\#])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') || location.hostname == this.hostname) {

          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
             if (target.length) {
               $('html,body').animate({
                   scrollTop: target.offset().top - spacing
              }, 1000);
              return false;
          }
      }
  });

  if(window.location.hash) {
    $('html,body').animate({
      scrollTop: $(window.location.hash).offset().top - spacing
    }, 1000);
  }
}

function backtotop() {
  if ($('.back-to-top').length) {
    var scrollTrigger = 0, // px
        backToTop = function () {
            var scrollTop = $(window).scrollTop();
            if (scrollTop > scrollTrigger) {
                $('.back-to-top').addClass('show');
            } else {
                $('.back-to-top').removeClass('show');
            }
        };

    backToTop();
    $(window).on('scroll', function () {
        backToTop();
    });

    var lastScrollTop = 0;
    $(window).scroll(function(event){
      var st = $(this).scrollTop();
      if (st > lastScrollTop){
         // downscroll code
         $('.back-to-top').removeClass('bottom scroll-prev');
         $('.back-to-top').addClass('scroll-next');
      } else {
        // upscroll code
        // $('#back-to-top').addClass('bottom');
      }
      lastScrollTop = st;


      var $win = $(window);
      var $doc = $(document);
      if ( $win.scrollTop() == $doc.height() - $win.height() ) {
        $('.back-to-top').addClass('bottom scroll-prev');
        $('.back-to-top').removeClass('scroll-next');
      }
    });

    // Click to scroll down
    $('body').on('click', ".scroll-next", function (e) {
        var vheight = $(window).height();
        $('html, body').animate({
          scrollTop: (Math.floor($(window).scrollTop() / vheight)+1) * vheight
        }, 500);
        e.preventDefault();
        e.stopPropagation();
    });

    // Click to scroll up
    $('body').on('click', ".scroll-prev", function (e) {
        $('html,body').animate({
            scrollTop: 0
        }, 700);
        e.preventDefault();
        e.stopPropagation();
    });

  }
}

// ScrollMagic And GreenSock Animation
// function scrollMagicGsap() {
//
//   var n = new ScrollMagic.Controller;
//   $('.fademein').each(function() {
//
//     var tween = TweenMax.from (
//       this, 0.75, {autoAlpha:0, y:100, delay:0.1, ease: Power1.easeInOut}
//     );
//
//     new ScrollMagic.Scene({
//       triggerElement: this,
//       reverse: false,
//       triggerHook: 1.3
//     })
//     .setTween(tween)
//     .addTo(n);
//
//   });
//
// }

/**
 * Reveal the contents of the main .entry-content div on scroll
 */
function revealOnScroll() {
	var controller = new ScrollMagic.Controller(),
		triggerHook = 0.85, // show, when scrolled x% into view (e.g. "onEnter" => 1 "onCenter" => 0.5 "onLeave" => 0)
		durationNum = .9,
		duration = (durationNum*100).toString().concat("%"), // hide x% before exiting view = triggerHook% + duration% from bottom
		offset = 50; // move trigger to center of element

	// add it to any items specifically tagged
	if($(".challenge-fade-in")) {
		$(".challenge-fade-in").each(function(index, element) {
			// build scene
			new ScrollMagic.Scene({
				triggerElement: element,
				triggerHook: triggerHook,
				duration: duration,
				offset: offset
			})
			.setClassToggle(element, "visible") // add class to reveal
			// .addIndicators() // add indicators (requires plugin)
			.addTo(controller);
		});
	}

	/**
	 * //add the fade in to elements in the main .entry-content div
	 */
	if($(".content-fade-in-parent")) {
		//add classes for particular blocks that should NOT have this effect applied.
		classes_to_skip = [
			"wp-block-group", //skip groups
		];

		//Loop through children of main .entry-content div
		$(".content-fade-in-parent > *").each(function(index, element) {
			addToController = true;

			$.each(classes_to_skip, function(index) {
				if( $(element).hasClass( classes_to_skip[index] ) ) { addToController = false; }
			});

			if(addToController) {
				$(element).addClass("challenge-f-in");

				// build scene
				new ScrollMagic.Scene({
					triggerElement: element,
					triggerHook: triggerHook,
					offset: offset
				})
				.setClassToggle(element, "visible") // add class to reveal
				// .addIndicators() // add indicators (requires plugin)
				.addTo(controller);
			}
		});
		//Loop through children of main .entry-content div that are groups
		$(".content-fade-in-parent > .wp-block-group .wp-block-group__inner-container > *").each(function(index, element) {
			addToController = true;

			$.each(classes_to_skip, function(index) {
				if( $(element).hasClass( classes_to_skip[index] ) ) { addToController = false; }
			});

			if(addToController) {
				$(element).addClass("challenge-f-in");

				// build scene
				new ScrollMagic.Scene({
					triggerElement: element,
					triggerHook: triggerHook,
					offset: offset
				})
				.setClassToggle(element, "visible") // add class to reveal
				// .addIndicators() // add indicators (requires plugin)
				.addTo(controller);
			}
		});
	}


}

/**
 * On Loads
 */
$(document).ready(function() {
  fouc();
  optimizeScroll();
  // match_heights_init();
  anchor_smooth_scrolling();
  backtotop();
  // scrollMagicGsap();
  // revealOnScroll()
});
