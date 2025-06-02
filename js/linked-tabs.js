jQuery(function () {
    initLinkedTabs();
});

function initLinkedTabs() {
    var tabs = jQuery('.wpb_tabs_nav').find('span');
    setTimeout(function () {
        if (tabs.length > 0) {
            jQuery.each(tabs, function (index, span) {
                var slug = generateToUrl(span.innerHTML);
                var aElement = jQuery(span).parent();
                aElement.attr('href', '#' + slug);
                aElement.attr('id', slug+'-info');
                aElement.on('click', function (event) {
                    event.preventDefault();
                    history.pushState({}, '', this.href);
                });
            });
        }

        if (window.location.hash) {
            var tab = window.location.hash.replace('#', '');
            if (jQuery('.wpb_tabs_nav a[href="#' + tab + '"]').length > 0) {
                jQuery('.wpb_tabs_nav a[href="#' + tab + '"]').click();
            
			
                var tabContent = jQuery('#tab-' + tab);
                if (tabContent.length > 0 && !isElementInViewport(tabContent[0])) {
                    scrollToElement(tabContent);
                }
            }
        }

		jQuery('.menu-item a').on('click', function(event) {
			var href = jQuery(this).attr('href');
			var targetTabId = href.split('#')[1]; // Extract the part after #
			var targetTabContent = jQuery('#tab-' + targetTabId);
			
			if (targetTabContent.length > 0) {
				event.preventDefault();
				history.pushState({}, '', href);
				jQuery('.wpb_tabs_nav a[href="#' + targetTabId + '"]').click();
				
				if(!isElementInViewport(targetTabContent[0])) {
					scrollToElement(targetTabContent);
				}
			}
		});
    }, 1200);
}

function generateToUrl(Text) {
    return Text
        .trim() // Trim any leading or trailing spaces
        .toLowerCase()
        .replace(/[^\w\s-]+/g, '') // Replace non-word characters except hyphens and spaces
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace consecutive hyphens with a single hyphen
        .replace(/-amp-/g, '-'); // Replace -amp- with -and-
}

function isMobileDevice() {
     return window.innerWidth <= 767;
}

function scrollToElement(element) {
	setTimeout(function() {
    var scrollTop = element.offset().top - 350;

    // Check if the element is already fully visible in the viewport
    if (isElementInViewport(element[0])) {
        return; // Element is already fully visible, no need to scroll
    }

    // Scroll to the element
    jQuery('html, body').animate({ scrollTop: scrollTop }, 'slow', function() {
        // Reset body height after the scrolling animation is completed
        //jQuery('body, html').css('height', '');
    });
	}, 700);
}
function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
}