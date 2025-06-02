jQuery.noConflict();  //Not to conflict with other scripts
jQuery( document ).ready(function($) {
    /**
     * Global
     * ------
     */
    $('.pp-simple-page-content table').wrap('<div class="table table-responsive"></div>');


    /**
     * WPCF7 mods
     */
    // on focus
    // $(".wpcf7-form input, .wpcf7-form textarea").focus(function() {
    //     // $(this).parent().siblings('label').addClass('has-value');
    //     $(this).parent().closest('label').addClass('has-value');
    // })
    //     // blur input fields on unfocus + if has no value
    //     .blur(function() {
    //         var text_val = $(this).val();
    //         if(text_val === "") {
    //             // $(this).parent().siblings('label').removeClass('has-value');
    //             $(this).parent().closest('label').removeClass('has-value');
    //         }
    //     });


    /**
     * Detect Zoom
     */
    detectScreenZoom();
    var doZoom;
    $(window).resize(function() {
        detectScreenZoom();

        clearTimeout(doZoom);
        doZoom = setTimeout(function () {
            detectScreenZoom();
        },100);
    });

    function detectScreenZoom() {
        //This will give you browser zoom percentage level on non-retina displays. For high DPI/retina displays, it would yield different values (e.g., 200 for Chrome and Safari, 140 for Firefox).
        var browserZoomLevel = Math.round(window.devicePixelRatio * 100);
        if (browserZoomLevel) {
            $('body').addClass('pp-zoom');
            $('body').addClass('pp-zoom-'+browserZoomLevel);

            if (browserZoomLevel <= 100) {
                $('body').removeClass('pp-zoom');
                $('body').removeClass('pp-zoom-'+browserZoomLevel);
            }
        }
    }
});
