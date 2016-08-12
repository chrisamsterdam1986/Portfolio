jQuery(document).ready(function($) {
  
  // global variables for script
  var current, size;
  
  $('.day').click(function(e) {
    
    // prevent default click event
    e.preventDefault();
    
    // grab href from clicked element
    var image_href = $(this).attr("href");  
    
    // determine the index of clicked trigger
    var slideNum = $('.day').index(this);
    
    // find out if #lightbox exists
    if ($('#lightbox').length > 0) {        
      // #lightbox exists
      $('#lightbox').fadeIn(300);
      // #lightbox does not exist - create and insert (runs 1st time only)
    } else {                                
      // create HTML markup for lightbox window
      var lightbox =
          '<div id="lightbox">' +
          '<div id="wrapper">' +
          '<div id="title">' +
          '</div>' +
          '<div id="nav">' +
          '<a href="#prev" class="prev slide-nav"><img src="images/arrow-left.svg"></a>' +
          '<a href="#close" class="exit slide-nav"><img src="images/cross-white.svg"></a>' +
          '<a href="#next" class="next slide-nav"><img src="images/arrow-right.svg"></a>' +
          '</div>' +
          '<div id="slideshow">' +
          '<ul></ul>' +        
          '</div>' +
          '</div>' +
          '</div>';
      
      //insert lightbox HTML into page
      $('body').append(lightbox);
      $('#lightbox').fadeIn(900);

      // add title per lightbox item to page
      
      // fill lightbox with .day hrefs in #imageSet
      $('.best-work').find('.day').each(function() {
        var href = $(this).find('a').attr('href');
        var title = $(this).find('h5').html();
        $('#slideshow ul').append(
          '<li>' +
          '<div class="hidden lb-title">' + title + '</div>' +
          '<img src="' + href + '">' +
          '</li>'
        );
      });
    }

    var mytitle = $('#slideshow ul > li:eq(' + slideNum + ') .lb-title').html();
    $("#lightbox #title").html("<h5>" + mytitle + "</h5>");

    // setting size based on number of objects in slideshow
    size = $('#slideshow ul > li').length;
    
    // hide all slide, then show the selected slide
    $('#slideshow ul > li').hide();
    $('#slideshow ul > li:eq(' + slideNum + ')').show();
    
    // set current to selected slide
    current = slideNum;
  });
  
  //Click anywhere on the page to get rid of lightbox window
  $('body').on('click', '#lightbox', function() { // using .on() instead of .live(). more modern, and fixes event bubbling issues
    $('#lightbox').fadeOut(300);

    var $this = $(this);
    var dest; 
    // looking for .prev
    if ($this.hasClass('prev')) {
      dest = current - 1;
      if (dest < 0) {
        dest = size - 1;
      }
    } 
    if($this.hasClass('next')) {
      // in absence of .prev, assume .next
      dest = current + 1;
      if (dest > size - 1) {
        dest = 0;
      }
    }
  });
  
  // show/hide navigation when hovering over #slideshow
  $('body').on(
    { mouseenter: function() {
      $('.nav').fadeIn(300);
    }
  },'#slideshow');
  
  // navigation prev/next
  $('body').on('click', '.slide-nav', function(e) {

    // prevent default click event, and prevent event bubbling to prevent lightbox from closing
    e.preventDefault();
    e.stopPropagation();
    
    var $this = $(this);
    var dest;
    
    // looking for .prev
    if ($this.hasClass('prev')) {
      dest = current - 1;
      if (dest < 0) {
        dest = size - 1;
      }
    } else if ($this.hasClass('exit')){
      $('#lightbox').fadeOut(300);
    } else {
      // in absence of .prev, assume .next
      dest = current + 1;
      if (dest > size - 1) {
        dest = 0;
      }
    }
  

    var mytitle = $('#slideshow ul > li:eq(' + dest + ') .lb-title').html();

    $("#lightbox #title").html("<h5>" + mytitle + "</h5>");

    // fadeOut curent slide, FadeIn next/prev slide
    $('#slideshow ul > li:eq(' + current + ')').fadeOut(500);
    $('#slideshow ul > li:eq(' + dest + ')').delay(500).fadeIn(500);
    
    // update current slide
    current = dest;
  });

  $('body').on('click', '#slideshow', function(e) {
    e.stopPropagation();
  });
  
});