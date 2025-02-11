(function ($) {
    "use strict";

    // Navbar on scrolling
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
        }
    });


    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });


    // Typed Initiate
    if ($('.typed-text-output').length == 1) {
        var typed_strings = $('.typed-text').text();
        var typed = new Typed('.typed-text-output', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Scroll to Bottom
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scroll-to-bottom').fadeOut('slow');
        } else {
            $('.scroll-to-bottom').fadeIn('slow');
        }
    });


    // Skills
    $('.skill').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


//     // Testimonials carousel
//     $(".testimonial-carousel").owlCarousel({
//         autoplay: true,
//         smartSpeed: 1500,
//         dots: true,
//         loop: true,
//         items: 1
//     });
    
})(jQuery);

//readmore

function toggleReadMore(btn) {
    let serviceContainer = btn.closest('.service-card'); // Get parent card of clicked button
    let fullText = serviceContainer.querySelector(".full-text");
    let shortText = serviceContainer.querySelector(".short-text");

    // Close any other open sections
    document.querySelectorAll(".service-card").forEach(card => {
        let otherFullText = card.querySelector(".full-text");
        let otherShortText = card.querySelector(".short-text");
        let otherBtn = card.querySelector(".toggle-btn");

        if (card !== serviceContainer) {
            otherFullText.style.display = "none";
            otherShortText.style.display = "block";
            otherBtn.innerText = "Read More";
        }
    });

    // Toggle the clicked section
    if (fullText.style.display === "none" || fullText.style.display === "") {
        fullText.style.display = "block";
        shortText.style.display = "none";
        btn.innerText = "Read Less";
    } else {
        fullText.style.display = "none";
        shortText.style.display = "block";
        btn.innerText = "Read More";
    }
}

function openAndDownload(event) {
    event.preventDefault(); // Prevent default link behavior

    const pdfUrl = event.currentTarget.href;
    
    // Open PDF in a new tab
    const newTab = window.open(pdfUrl, '_blank');

    // Ensure the tab is opened before triggering download
    setTimeout(() => {
      const a = document.createElement('a');
      a.href = pdfUrl;
      a.download = 'My_CV.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }, 1000); // Wait 1 second before downloading
  }

// Ensure only short text is visible on page load
window.onload = function() {
    document.querySelectorAll(".service-card").forEach(card => {
        card.querySelector(".full-text").style.display = "none";
        card.querySelector(".short-text").style.display = "block";
        card.querySelector(".toggle-btn").innerText = "Read More";
    });
};