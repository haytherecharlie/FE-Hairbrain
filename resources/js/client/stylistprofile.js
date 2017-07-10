/*******************************************
* © 2017 Hairbrain inc.
* ---------------------
* Created: February 11th 2017
* Last Modified: June 7th 2017
* Author: Charlie Hay
*
* STYLIST PROFILE JS FUNCTIONALITY.
/******************************************/

var StylistProfile = (function() {

//----------------------------------------------------------------

						 // CACHE

//---------------------------------------------------------------/

/*******************************************
 * Global Variables
*******************************************/
var stylistModal   = $('.stylistmodal');
var stylistProfile = $('.stylistprofile');


//----------------------------------------------------------------

						 // LISTENERS

//---------------------------------------------------------------/



//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/

function setStarbarLength(rating) {
    
    if(rating !== 0 ) {
        var value = (Math.round(rating * 2) / 2).toFixed(1) * 50;
        $('.starbar').css('width', value);
    } else {
        $('.ratingtitle').text('No Ratings Yet!');
        $('.starbar').css('width', 0);   
    }
}

function setComments(comments) {

    for(var i in comments) {
        $('.ratingscontainer .comments').append('' +
        '<div class="starholder" id="star'+i+'"></div>');
        for(var j = 0; j < comments[i].stars; j++) {
            $('.starholder#star'+i+'').append('&star;');
        }
        $('.ratingscontainer .comments').append('' +
        '<span class="comment">'+comments[i].comment+'</span>');
    }
}


//----------------------------------------------------------------

						 // LOGIC

//---------------------------------------------------------------/
function populateStylistProfile() {
    stylistProfile.append('' +
    '<div class="avatar"><img src="'+ sessionStorage.getItem('avatar') +'"></div>' +
    '<span class="name">'+name+'</span>' +
    '<span class="phone">'+phone+'</span>' +
    '<span class="salon">'+salon+'</span><hr>' +
    '<div class="ratingscontainer">Fetching Rating<img src="/app/img/loading.gif"></div>');

    $('.stylistprofile .avatar').css('background', 'url('+ avatar + ') no-repeat center');
}

function populateStylistRating(req) {
    $('.ratingscontainer').empty();
    $('.ratingscontainer').append('' +
    '<span class="ratingtitle">5 Star Rating:</span>' +
    '<div class="rating"><div class="stargrid">' +
    '<img src="/app/img/star.png">' +
    '<img src="/app/img/star.png"><img src="/app/img/star.png">' + 
    '<img src="/app/img/star.png"><img src="/app/img/star.png"></div>' +
    '<div class="starbar"></div>' +
    '</div><hr><div class="comments">' +
    '</div>');
    setStarbarLength(req.total);
    setComments(req.raw);
}

//----------------------------------------------------------------

						 // AJAX CALLS

//---------------------------------------------------------------/

/*******************************************
 * Stylist Rating -> GET
*******************************************/
function stylistRatingAJAX() {
    
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": apiurl + "rating/" + userid,
        "method": "GET",
        "headers": {
            "cache-control": "no-cache",
            "Authorization": "Bearer " + jwt
        },
        "processData": false,
        "contentType": false,
        "statusCode": {
            200: function(req, res) {
                populateStylistRating(req);
            },
            400: function(req, res) {
                ErrorModal.populateMessage(req.responseText);
            },
            401: function(req, res) {
                redirect('/');
            },
            500: function(req, res) {
                ErrorModal.populateMessage('Hairbrain isn\'t working right now. Please try again later.');
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

        // Populate Stylist Profile
        populateStylistProfile();

    })();

    return {
        stylistRatingAJAX: stylistRatingAJAX
    }

})(); // END OF STYLISTPROFILE.JS
