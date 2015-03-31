(function ($) {

    var $window = $(window);
    var $slide = $('.homeSlide');
    var $body = $('body');

    //FadeIn all sections   
    $body.imagesLoaded(function () {
        setTimeout(function () {

            // Resize sections
            adjustWindow();

            // Fade in sections
            $body.removeClass('loading').addClass('loaded');

        }, 800);
    });

    function adjustWindow() {

        // Get window size
        var winH = $window.height();
        var winW = $window.width();

        // Kai: None of the size stuff was needed because skrollr works on mobile by adding
        // a container around the slides with id skrollr-body.  I did that in the html file.

        // Keep minimum height 550
        // if (winH <= 400) {
        //     winH = 400;
        // }

        // Init Skrollr for 768 and up
        var s;
        // if (winW >= 768) {

            // Init Skrollr
            s = skrollr.init({
                forceHeight: false
            });

            // Resize our slides
            $slide.height(winH);
            $slide.width(winW - 40);

            s.refresh($('.homeSlide'));

        // } else {

        //     // Init Skrollr
        //     s = skrollr.init();
        //     s.destroy();

        //     //Remove Nav
        //     $("ul").remove();
        // }

        // Check for touch
        if (Modernizr.touch) {

            // Init Skrollr
            // var s = skrollr.init();
            $('.slide-nav-container').remove();
            s.destroy();
            $('.bcg').css('background-attachment', 'initial');
        }
    }

    // function initAdjustWindow() {
    //     return {
    //         match : function () {
    //             adjustWindow();
    //         },
    //         unmatch : function () {
    //             adjustWindow();
    //         }
    //     };
    // }

    // Kai: It's better to handle adjusting window size using the resize event as I did a few lines below
    // so that it's updated anytime it's resized.  Enquire only handles firing a resize when a media query
    // starts or stops matching.
    //enquire.register("screen and (min-width : 768px)", initAdjustWindow(), false);

    // reinit window on resize so that it's adjusted anytime the window is resized
    $(window).on('resize', function () {

        // adjust our window size
        adjustWindow();

        // reinit snow
        window.onload();
    })


    window.onload = function(){

        // Make snow on first and last slides
        makeSnow('snow');
        makeSnow('snow2');  
    };


    // Kai: Moved this to it's own function and pass in id so can be called for each canvas that needs snow
    function makeSnow(id) {
        //canvas init
        var canvas = document.getElementById(id);
        var ctx = canvas.getContext("2d");

        //canvas dimensions
        var W = window.innerWidth;
        var H = window.innerHeight;

        // Kai: Reduced calculated width by 50px because it was causing a scrollbar
        canvas.width = W - 40;
        canvas.height = H;

        //snowflake particles
        var mp = 100; //max particles
        var particles = [];
        for (var i = 0; i < mp; i++)
        {
            particles.push({
                x: Math.random()*W, //x-coordinate
                y: Math.random()*H, //y-coordinate
                r: Math.random()*4+1, //radius
                d: Math.random()*mp //density
            });
        }
        
        //Lets draw the flakes
        function draw()
        {
            ctx.clearRect(0, 0, W, H);
            
            ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
            ctx.beginPath();
            for (var i = 0; i < mp; i++)
            {
                var p = particles[i];
                ctx.moveTo(p.x, p.y);
                ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
            }
            ctx.fill();
            update();
        }
        
        //Function to move the snowflakes
        //angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
        var angle = 0;
        function update()
        {
            angle += 0.01;
            for (var i = 0; i < mp; i++)
            {
                var p = particles[i];
                //Updating X and Y coordinates
                //We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
                //Every particle has its own density which can be used to make the downward movement different for each flake
                //Lets make it more random by adding in the radius
                p.y += Math.cos(angle+p.d) + 1 + p.r/2;
                p.x += Math.sin(angle) * 2;
                
                //Sending flakes back from the top when it exits
                //Lets make it a bit more organic and let flakes enter from the left and right also.
                if (p.x > W+5 || p.x < -5 || p.y > H)
                {
                    if (i%3 > 0) //66.67% of the flakes
                    {
                        particles[i] = {x: Math.random()*W, y: -10, r: p.r, d: p.d};
                    }
                    else
                    {
                        //If the flake is exitting from the right
                        if (Math.sin(angle) > 0)
                        {
                            //Enter from the left
                            particles[i] = {x: -5, y: Math.random()*H, r: p.r, d: p.d};
                        }
                        else
                        {
                            //Enter from the right
                            particles[i] = {x: W+5, y: Math.random()*H, r: p.r, d: p.d};
                        }
                    }
                }
            }
        }
        
        //animation loop
        setInterval(draw, 33);
    }

    setTimeout(function() {
        var s = skrollr.init({
            forceHeight: false
        });

        skrollr.menu.init(s, {
            animate: true,
            easing: 'sqrt',
            scale: 1
        });
    }, 500);


} )(jQuery);