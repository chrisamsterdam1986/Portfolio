$(document).ready(function () {
            
    // Fullpage JS trigger 
    $('#fullpage').fullpage({
        css3: true,
        anchors: ['section-1', 'section-2', 'section-3', 'section-4'],
        afterLoad: function(anchorLink, index) {

            // Triggers fade-in of the text after slide is loaded 
            $('.hideme').each( function(i){
                var bottom_of_object = $(this).offset().top + $(this).outerHeight();
                var bottom_of_window = $(window).scrollTop() + $(window).height() + 1;
                
                if( bottom_of_window >= bottom_of_object ){
                    $(this).removeClass('hideme');
                    $(this).addClass('animate-2s');
                }
            }); 
        }
    });

    // disabling scroll until fully loaded
    $.fn.fullpage.setAllowScrolling(false);

    // Fading the pre-loader and the title, enabling scroll after fully loaded
    $(window).load(function () {                

        $('.pre-loader-wrapper').delay(2000).fadeOut(1000);     

        setTimeout(function(){
            $('#fullpage').removeClass('preload-block');
            $.fn.fullpage.setAllowScrolling(true);
        },3000);

    });

    // Building up the pre-loader
    const path = document.querySelector('#wave');
    const animation = document.querySelector('#moveTheWave');
    const m = 0.512286623256592433;
    function buildWave(w, h) {
        const a = h / 4;
        const y = h / 2;
        const pathData = [
            'M', w * 0, y + a / 2,'c',a * m, 0, -(1 - a) * m, -a,a, -a,'s', -(1 - a) * m, a,
            a, a,'s', -(1 - a) * m, -a,a, -a,'s', -(1 - a) * m, a,a, a,'s', -(1 - a) * m, -a,
            a, -a,'s', -(1 - a) * m, a,a, a,'s', -(1 - a) * m, -a,a, -a,'s', -(1 - a) * m, a,
            a, a,'s', -(1 - a) * m, -a,a, -a,'s', -(1 - a) * m, a,a, a,'s', -(1 - a) * m, -a,
            a, -a,'s', -(1 - a) * m, a,a, a,'s', -(1 - a) * m, -a,a, -a,'s', -(1 - a) * m, a,
            a, a,'s', -(1 - a) * m, -a,a, -a
        ].join(' ');
        path.setAttribute('d', pathData);
    }
    buildWave(90, 60);

    // Play header video on mobile devices when the screensize is smaller than 991px
    var screen = $(window)    
    if (screen.width() < 991) {
         var video = $('video').get(0);
         makeVideoPlayableInline(video, false, false);
    }

    // Fix for overlapping keyboard in combination with input fields on mobile devices
    $('input, textarea, button[type=submit]').blur(function() {
        setTimeout(function() {
            if (!$(document.activeElement).is('input,textarea,button[type=submit]')) {
              $('.contact-content').scrollTop();
            }
        },0);
    });

});