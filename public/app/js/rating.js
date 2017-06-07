/*******************************************
* © 2017 Hairbrain inc.
* ---------------------
* Created: February 11th 2017
* Last Modified: March 21st 2017
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
var startnow        = $('#startnow');
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
startnow.click(function() {
    step1.fadeOut();
    slideHeaderUp();
});

$('#stars1 .starrating').each(function() {
    $(this).click(function() {
        var rating = $(this).attr('id');
        var question = $(this).parent().attr('id');
        setStarsScore(question, rating);
    })
});

submitComment.click(function() {
    slideAndFade('step3');
    slideHeaderDown();
    setCommentsScore();
});

skipComments.click(function() {
    slideAndFade('step3');
    slideHeaderDown();
    setCommentsScore();
});

//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/

function ratingInvalid() {
    invalid.fadeIn();
}

function ratingValid() {
    showStylistName();
    step1.fadeIn();
}

function showStylistName() {
    stylistBold.html(keyInfoObj.name);
}

function slideHeaderUp() {
    header.animate({
        height: '50%'
    }, 500, function() {
        step2.fadeIn();
    });
}

function slideHeaderDown() {
    header.animate({
        height: '100%'
    }, 500, function() {
        step4.fadeIn();
    }); 
}

function showStars(q, r) {
    for(var i = 0; i <= 5; i++) {
        if( i <= r) $('#' + q + ' #star' + i).html('&bigstar;');
        else $('#' + q + ' #star' + i).html('&star;');
    }
    showCommentsBox();
}

function showCommentsBox() {
    setTimeout(function() {
        slideAndFade('step2');
        stars1.fadeOut();
    }, 1000)     
}

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

function setCommentsScore() {
    if(commentsBox.val() !== '')
        commentsScore = commentsBox.val();
    postRating();
}

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

//----------------------------------------------------------------

						 // AJAX CALLS

//---------------------------------------------------------------/

function verifyRating() {

    // Rating is invalid. 
    if( requestId === null || requestId === '' ) ratingInvalid();
    
    // Rating is valid.
    else getRatingVerification();

}

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
        "contentType": false
    }

    $.ajax(settings)
    .done(function (req, res) {
        if(res === 'success') {
            if( req === ''){
                ratingInvalid();
            } else {
                keyInfoObj = req;
                ratingValid();
            }
        }
    })
    .fail(function(res) {
        ratingInvalid();
    });
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
    "data": form
    }

    $.ajax(settings)
    .done(function (req, res) {
        if(res === "success") { 
            console.log(req, res);
        }
    });



}

//----------------------------------------------------------------

						 // MAIN

//---------------------------------------------------------------/

/*******************************************
 * Main Function
*******************************************/
var Main = (function() {
    verifyRating();
})();

})(); // END OF RATING.JS
