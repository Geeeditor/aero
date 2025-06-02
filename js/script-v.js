jQuery( document ).ready(function($) {

    $('.button-map').click(function() {
        $('.map-modal-block').show();
        $('body').addClass('z-index-9999');
    });
  
    $('.close-map-btn').click(function() {
        $('.map-modal-block').hide();
        $('body').removeClass('z-index-9999');
    });

    /* contact form popup */

    $(document).on('click', '.wpcf7-response-output-modal', function() {
        $(this).removeClass('active').remove();
    });

    document.addEventListener('wpcf7submit', function(event) {
        if (event.detail.contactFormId == 143747 || event.detail.contactFormId == 143748 || event.detail.contactFormId == 156407) {
            $(event.target).find('.wpcf7-response-output').hide();
            var $text = $('input[name="ad-success"].ad-success');
            var text = $text.length ? $text.val() : 'Your application was successful';

            if (event.detail.status === 'mail_sent') {
                let modalContent = `
                    <div class="wpcf7-response-output-modal active">
                        <div class="modal-content">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="16.0726" cy="16.0051" r="15.3236" fill="white"/>
                                <path d="M23.5728 11.0052L13.5728 21.0052L8.57275 16.0052" stroke="#322070" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <h3>` + text + `</h3>
                        </div>
                    </div>
                `;
    
                $('body').append(modalContent);
    
            } else {
                responseOutput.show();
            }
        }

    }, false);
});
