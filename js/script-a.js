var $offCanvasEl = jQuery('#slide-out-widget-area');
var $offCanvasBG = jQuery('#slide-out-widget-area-bg');
var $window = jQuery(window);
var $headerOuterEl = jQuery('#header-outer');


mobileMapButtonBack(); 

jQuery( document ).ready(function($) {
	initOffcanvasMenuPhoneC();
	
	 if($('.button-map').length > 0) {
        $('.button-map').hover(
            function() {
                $(this).removeClass('animationOut').addClass('animationIn');
				$('#bg-button-map-row').addClass('containerAnimationIn');
            },
            function() {
                var $element = $(this);
                // Delay the addition of animationOut class by 300ms
                setTimeout(function() {
                    $element.removeClass('animationIn').addClass('animationOut');
					$('#bg-button-map-row').removeClass('containerAnimationIn');
                }, 300);
            }
        );
    }
});

function mobileMapButtonBack() {
	if(jQuery('.map-modal-block').length > 0) {
		jQuery('.map-modal-block .mobile-map').prepend('<a id="map-mobile-close" href="#"><img src="/wp-content/uploads/2024/02/back-arrow.svg"><span>'+translation_custom.close_map_mobile+'</span></a>');
		jQuery('#map-mobile-close').on('click', function() { 
			jQuery('.close-map-btn').click();
		});
	}
}

function initOffcanvasMenuPhoneC() {
	
	
	copyAOG();
	createMobileMenuButton();
	initBackButtonLogic();
	handleParentNameInSub();
	
	
}


function createMobileMenuButton() {
	jQuery('body').append('<div id="menu-button-mobile"><a href="javascript:void(0);">'+translation_custom.menu+' <span><img src="/wp-content/uploads/2024/02/mobile-menu-burger.svg" /></span></a></div>');
	jQuery('#menu-button-mobile a').on('click', function() { 
		OCM_fullscreenOpen();
	});
	jQuery('#slide-out-widget-area').append('<div id="back-button"><a data-close-text="'+translation_custom.close_menu+'" data-sub-text="'+translation_custom.to_menu+'" href="#"><img src="/wp-content/uploads/2024/02/back-arrow.svg" /><span>'+translation_custom.close_menu+'</span></a></div>');
	
}


function handleParentNameInSub() {
	jQuery($offCanvasEl).find('li.menu-item-hidden-text').remove();
	jQuery('<li class="menu-parent-label"></li>').prependTo('#slide-out-widget-area .sub-menu');
	jQuery('.off-canvas-menu-container.mobile-only .menu-parent-label').each(function( ) {
		var currentParentLabel = jQuery(this);
		jQuery(this).closest('.menu-item.menu-item-has-children').each(function( index ) {
		if(jQuery(this).find('>:first-child').find('span.menu-title-text').html()) {
			currentParentLabel.html(jQuery(this).find('>:first-child span.menu-title-text').html());
		} else {
			currentParentLabel.html(jQuery(this).find('>:first-child').html());
		}
		});
	});
}


function initBackButtonLogic() {
	var backButton = jQuery('#slide-out-widget-area #back-button a');
	
	jQuery('#slide-out-widget-area #back-button').on('click', function() { 
		if(jQuery('#slide-out-widget-area .menuopen.subview').length > 0) {
			if(jQuery('#slide-out-widget-area .menuopen.subview .subviewopen').length > 0) {
				jQuery('#slide-out-widget-area .menuopen.subview .subviewopen .sub-menu .back a')[0].click();
			} else {
				jQuery('#slide-out-widget-area .menuopen.subview .sub-menu .back a')[0].click();
				backButton.find('span').html(backButton.attr('data-close-text'));
			}
		} else {
			OCM_fullscreenClose();
		}
		
		setTimeout(function() { 
			if(jQuery('#slide-out-widget-area .menuopen.subview').length == 0) {
				backButton.find('span').html(backButton.attr('data-close-text'));
			}
		}, 100);
	});
	
	var backButton = jQuery($offCanvasEl).find('#back-button a');
	jQuery($offCanvasEl).find('.menu-item a').on('click', function() { 
		if(!jQuery(this).parent().hasClass('back')) {
			backButton.find('span').html(backButton.attr('data-sub-text'));
		}
	});
	
}


function OCM_fullscreenClose() {
	

	if (jQuery('body.material').length > 0) {
	    setTimeout(function () {
		jQuery('header#top .slide-out-widget-area-toggle a').removeClass('menu-push-out');
	    }, 350);
	}

	jQuery('.slide-out-widget-area-toggle:not(.std-menu) .lines-button:not(.legacy-double)').removeClass('close');
	jQuery('.blurred-wrap').removeClass('blurred');
	jQuery('#slide-out-widget-area.fullscreen').transition({
	    'opacity': 0
	}, 700, 'easeOutQuad', function () {
	    jQuery('#slide-out-widget-area.fullscreen').hide().css('opacity', '1');
	}).removeClass('open');
	jQuery('#slide-out-widget-area.fullscreen .widget').transition({
	    'opacity': 0
	}, 700, 'easeOutQuad', function () {
	    jQuery(this).transition({
		y: '110px'
	    }, 0);
	});

	setTimeout(function () {
	    jQuery('.off-canvas-menu-container .menu > li').transition({
		y: '80px',
		'opacity': 0
	    }, 0);
	    jQuery('#slide-out-widget-area .off-canvas-social-links li').transition({
		'scale': 0
	    }, 0);
	    jQuery('#slide-out-widget-area .off-canvas-social-links').removeClass('line-shown');
	    jQuery('#slide-out-widget-area .bottom-text').transition({
		'opacity': 0
	    }, 0);

	    // Close submenu items
	    jQuery('#slide-out-widget-area .menuwrapper .menu').removeClass('subview');
	    jQuery('#slide-out-widget-area .menuwrapper .menu li').removeClass('subview subviewopen');
	    jQuery('#slide-out-widget-area.fullscreen .inner .menu-wrap').css('height', 'auto');
	}, 800);

	setTimeout(function () {
	    if (jQuery('.nectar-social.fixed').length == 0) {
		showToTop();
	    }
	    jQuery('.container-wrap').removeClass('no-shadow');
	}, 500);

	// Fade out overlay
	$offCanvasBG.stop(true).transition({
	    'opacity': 0
	}, 900, 'easeOutQuad', function () {

	    if (jQuery('.mobile #header-outer[data-permanent-transparent="false"]').length > 0 && jQuery('.container-wrap').hasClass('no-scroll')) {
		jQuery('#ajax-content-wrap').removeClass('at-content');
	    }
	    if (jQuery('.mobile #header-outer[data-permanent-transparent="false"]').length == 0) {
		jQuery('#slide-out-widget-area.fullscreen > .inner-wrap').css('padding-top', '0');
	    }

	    jQuery('.slide-out-widget-area-toggle a').removeClass('animating');

	    var $opacity = 0.4;

	    if ($offCanvasBG.hasClass('solid')) {
		$opacity = 1;
	    }
	    if ($offCanvasBG.hasClass('dark')) {
		$opacity = 0.93;
	    }
	    if ($offCanvasBG.hasClass('medium')) {
		$opacity = 0.6;
	    }
	    if ($offCanvasBG.hasClass('light')) {
		$opacity = 0.4;
	    }
	    jQuery(this).css({
		'height': '1px',
		'width': '1px',
		'opacity': $opacity
	    }).transition({
		y: '-100%'
	    }, 0);
	});
	
	 jQuery(window).trigger('nectar-ocm-close');

}


function copyAOG() {
	$aogButtonHeader = jQuery('.btn.aog-btn').clone();
	$aogButtonHeader.addClass('mobile-aog')
	$aogButtonHeader.html('AOG 24/7');
	jQuery('#top .mobile-search').after($aogButtonHeader[0]);
}


function OCM_fullscreenOpen() {

	if (jQuery('body.material').length > 0) {
	    jQuery('header#top .slide-out-widget-area-toggle a').addClass('menu-push-out');
	}

	// Scroll away from fixed reveal footer if shown (firefox bug with bluring over it)
	var $scrollDelay = 0;
	var $scrollDelay2 = 0;

	if (nectarDOMInfo.scrollTop + $window.height() > jQuery('.blurred-wrap').height() && jQuery('#nectar_fullscreen_rows').length == 0) {
	    jQuery('body,html').stop().animate({
		scrollTop: jQuery('.blurred-wrap').height() - $window.height()
	    }, 600, 'easeInOutCubic');
	    $scrollDelay = 550;
	    $scrollDelay2 = 200;
	}

	jQuery('header#top .slide-out-widget-area-toggle:not(.std-menu) .lines-button:not(.legacy-double)').addClass('close');
	setTimeout(function () {
	    jQuery('.blurred-wrap').addClass('blurred');
	}, $scrollDelay);
	jQuery('#slide-out-widget-area.fullscreen').show().addClass('open');

	if (jQuery('.nectar-social.fixed').length == 0) {
	    hideToTop();
	}

	// Remove box shadow incase at the top of the page with nectar box roll above
	jQuery('.container-wrap').addClass('no-shadow');
	$headerOuterEl.stop(true).css('transform', 'translateY(0)');

	setTimeout(function () {

	    jQuery('.off-canvas-menu-container .menu > li').each(function (i) {
		jQuery(this).delay(i * 50).transition({
		    y: 0,
		    'opacity': 1
		}, 800, 'easeOutExpo');
	    });

	    jQuery('#slide-out-widget-area.fullscreen .widget').each(function (i) {
		jQuery(this).delay(i * 100).transition({
		    y: 0,
		    'opacity': 1
		}, 800, 'easeOutExpo');
	    });
	}, 370 + $scrollDelay2);

	setTimeout(function () {
	    jQuery('#slide-out-widget-area .off-canvas-social-links').addClass('line-shown');

	    jQuery('#slide-out-widget-area .off-canvas-social-links li').each(function (i) {
		jQuery(this).delay(i * 50).transition({
		    'scale': 1
		}, 400, 'easeOutCubic');
	    });

	    jQuery('#slide-out-widget-area .bottom-text').transition({
		'opacity': 0.7
	    }, 400, 'easeOutCubic');
	}, 750 + $scrollDelay2);

	// Fade In BG Overlay
	setTimeout(function () {
	    var $easing = (jQuery('body.mobile').length > 0) ? 'easeOutCubic' : 'easeInOutQuint';
	    $offCanvasBG.css({
		'height': '100%',
		'width': '100%'
	    }).show().stop(true).transition({
		'y': '0%'
	    }, 920, $easing, function () {
		jQuery('.slide-out-widget-area-toggle > div > a').removeClass('animating');
	    });
	}, 50 + $scrollDelay2);

	// Overflow state
	//OCM_overflowState();

	if (jQuery('.mobile #header-outer[data-permanent-transparent="false"]').length > 0 && jQuery('.container-wrap').hasClass('no-scroll')) {
	    jQuery('#ajax-content-wrap').addClass('at-content');
	}

	var headerOffset = $headerOuterEl.offset().top - nectarDOMInfo.scrollTop + nectarDOMInfo.secondaryHeaderHeight;

	jQuery('#slide-out-widget-area.fullscreen > .inner-wrap').css('padding-top', ($headerOuterEl.outerHeight() + headerOffset));


    }


	
	/**
     * Scroll to top show.
     *
     * @since 2.0
     */
    function showToTop() {

		if (nectarDOMInfo.scrollTop > 350 && !$offCanvasEl.is('.fullscreen.open')) {

			jQuery('#to-top').stop().transition({
			'transform': 'translateY(-50%)'
			}, 350, 'easeInOutCubic');

			$window.off('scroll', showToTop);
			$window.on('scroll', hideToTop);
		}

    }
	
	 /**
     * Scroll to top hide.
     *
     * @since 2.0
     */
    function hideToTop() {

		if (nectarDOMInfo.scrollTop < 350 || $offCanvasEl.is('.fullscreen.open')) {

			var $animationTiming = (jQuery('#slide-out-widget-area.fullscreen.open').length > 0) ? 1150 : 350;

			jQuery('#to-top').stop().transition({
			'transform': 'translateY(105%)'
			}, $animationTiming, 'easeInOutQuint');

			$window.off('scroll', hideToTop);
			$window.on('scroll', showToTop);

		}
    }
