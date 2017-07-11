/*******************************************
* © 2017 Hairbrain inc.
* ---------------------
* Created: February 11th 2017
* Last Modified: June 6th 2017
* Author: Charlie Hay
*
* RATING PAGE JS FUNCTIONALITY.
/******************************************/

var Rating = (function() {

//----------------------------------------------------------------

						 // CACHE

//---------------------------------------------------------------/

/*******************************************
 * Global Variables
*******************************************/
var experienceScore = 5;
var commentsScore   = 'No comments.';
var header          = $('header');
var startNow        = $('#startnow');
var invalid         = $('#invalid');
var step1           = $('#step1');
var step2           = $('#step2');
var step3           = $('#step3');
var step4           = $('#step4');
var stars1          = $('#stars1');
var comments        = $('.comments');
var commentsBox     = $('.commentsbox');
var submitComment   = $('.submitcomment');
var skipComments    = $('#skipcomments');
var stylistBold     = $('#stylist');
var requestId       = getRequestId();
var keyInfoObj      = {};

//----------------------------------------------------------------

						 // TEMPLATES

//---------------------------------------------------------------/


//----------------------------------------------------------------

						 // LISTENERS

//---------------------------------------------------------------/

/*******************************************
 * On Click of Start Now
*******************************************/
startNow.click(function() {
    step1.fadeOut();
    slideHeaderUp();
});

/*******************************************
 * Listens to All Stars
*******************************************/
$('#stars1 .starrating').each(function() {
    $(this).click(function() {
        var rating = $(this).attr('id');
        var question = $(this).parent().attr('id');
        setStarsScore(question, rating);
    })
});

/*******************************************
 * On Click of Submit Comment
*******************************************/
submitComment.click(function() {
    slideAndFade('step3');
    slideHeaderDown();
    setCommentsScore();
});

/*******************************************
 * On Click of Skip Comments
*******************************************/
skipComments.click(function() {
    slideAndFade('step3');
    slideHeaderDown();
    setCommentsScore();
});

//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/

/*******************************************
 * Show Invalid Rating
*******************************************/
function ratingInvalid() {
    invalid.fadeIn();
}

/*******************************************
 * Show Valid Rating
*******************************************/
function ratingValid() {
    showStylistName();
    step1.fadeIn();
}

/*******************************************
 * Show Stylist Name
*******************************************/
function showStylistName() {
    stylistBold.html(keyInfoObj.name);
}

/*******************************************
 * Slide Header Up
*******************************************/
function slideHeaderUp() {
    header.animate({
        height: '50%'
    }, 500, function() {
        step2.fadeIn();
    });
}

/*******************************************
 * Slide Header Down 
*******************************************/
function slideHeaderDown() {
    header.animate({
        height: '100%'
    }, 500, function() {
        step4.fadeIn();
    }); 
}

/*******************************************
 * Show Stars
*******************************************/
function showStars(q, r) {
    for(var i = 0; i <= 5; i++) {
        if( i <= r) $('#' + q + ' #star' + i).html('&bigstar;');
        else $('#' + q + ' #star' + i).html('&star;');
    }
    showCommentsBox();
}

/*******************************************
 * Show Comments Box
*******************************************/
function showCommentsBox() {
    setTimeout(function() {
        slideAndFade('step2');
        stars1.fadeOut();
    }, 1000)     
}

/*******************************************
 * Slide and Fade
*******************************************/
function slideAndFade(id) {
    $('#' + id).animate({
        left: "-100%"
    }, 500, function() {
        step3.fadeIn();
        comments.fadeIn();
    });
}

//----------------------------------------------------------------

						 // LOGIC

//---------------------------------------------------------------/

/*******************************************
 * Set Comments Score
*******************************************/
function setCommentsScore() {
    if(commentsBox.val() !== '')
        commentsScore = commentsBox.val();
    postRating();
}

/*******************************************
 * Set Stars Score
*******************************************/
function setStarsScore(q, r) {
    switch(r) {
        case 'star1':
            experienceScore = 1;
            showStars(q, 1);
            break;
        case 'star2':
            experienceScore = 2;
            showStars(q, 2);
            break;
        case 'star3':
            experienceScore = 3;
            showStars(q, 3);
            break;
        case 'star4':
            experienceScore = 4;
            showStars(q, 4);
            break;
        case 'star5':
            experienceScore = 5;
            showStars(q, 5);
            break;
        default:
            console.log('error');
    }
}

/*******************************************
 * Verify Rating With Code
*******************************************/
function verifyRating() {

    // Rating is invalid. 
    if( requestId === null || requestId === '' ) ratingInvalid();
    
    // Rating is valid.
    else getRatingVerification();

}

/*******************************************
 * Get Request Id From URL
*******************************************/
function getRequestId() {

    var url = window.location.href;
    var param = url.split('?')[1];

    if( typeof param === 'undefined' ) {
        return null;
    } 
    
    else {
        var idVal = param.split('=');
        if(idVal[0] === 'id') return idVal[1];
        else return null;
    }

}

/*******************************************
 * Redirect Page -> URL
*******************************************/
function redirect(path) {
    window.location.href = window.location.origin + path; 
}


//----------------------------------------------------------------

						 // AJAX CALLS

//---------------------------------------------------------------/
/*******************************************
 * Get Rating Verification
*******************************************/
function getRatingVerification() {

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": apiurl + "rating/verify/" + requestId,
        "method": "GET",
        "headers": {
            "cache-control": "no-cache"
        },
        "processData": false,
        "contentType": false,
        "statusCode": {
            200: function(req, res) {
                if(req == '') {
                    ratingInvalid();
                    setTimeout(function() { redirect('/') }, 5000);
                } else {
                    keyInfoObj = req;
                    ratingValid();
                }
            },
            400: function(req, res) {
                redirect('/learn/mistake/');
            },
            401: function(req, res) {
                ratingInvalid();
            }
        }
    }
    $.ajax(settings)
}

function postRating() {

    var form = new FormData();
    form.append("stars", experienceScore);
    form.append("comment", commentsScore);
    form.append('id', requestId);

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": apiurl + "rating/" + keyInfoObj.userid + '/' + keyInfoObj.clientid,
        "method": "POST",
        "headers": {
            "cache-control": "no-cache",
        },
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form,        
        "statusCode": {
            200: function(req, res) {
                setTimeout(function() { redirect('/learn/about/') }, 5000);
            },
            400: function(req, res) {
                redirect('/learn/mistake/');
            }
        }
    }
    $.ajax(settings)
}

//----------------------------------------------------------------

						 // MAIN

//---------------------------------------------------------------/

/*******************************************
 * Main Function
*******************************************/
    var Main = (function() {

        // Verify if Rating is Valid
        verifyRating();

    })();

    return {

    }

})(); // END OF RATING.JS
