/*******************************************
* © 2017 Hairbrain inc.
* ---------------------
* Created: February 11th 2017
* Last Modified: June 15th 2017
* Author: Charlie Hay
*
* PROFILE PAGE JS FUNCTIONALITY.
/******************************************/

var Profile = (function() {

//----------------------------------------------------------------

						 // CACHE

//---------------------------------------------------------------/

/*******************************************
 * Global Variables
*******************************************/
var urlPhone          = getUrlPhone();
var userId;
var userName;
var userSalon;
var userPhone;
var userEmail;
var userTotalRating;
var userRawRatings;
var profilePic        = $('.profilepage .profilepic');
var nameBanner        = $('.profilepage .namebanner');
var salonBanner       = $('.profilepage .salonbanner');
var phoneBanner       = $('.profilepage .phonebanner');
var emailBanner       = $('.profilepage .emailbanner');
var totalRatingBanner = $('.profilepage .totalratingbanner');
var rawRatingsBanner = $('.profilepage .rawratingsbanner');

//----------------------------------------------------------------

						 // TEMPLATES

//---------------------------------------------------------------/


//----------------------------------------------------------------

						 // LISTENERS

//---------------------------------------------------------------/


//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/
function stylistNotFound() {
    $('main').html('<div class="stylistnotfound">Stylist Not Found!</div>');
}

function populateProfilePic() {
    profilePic.css('background', 'url("' + apiurl + 'avatar/' + userId + '") no-repeat center');
    profilePic.css('background-size', 'cover');
}

function populateNameBanner() {
    nameBanner.text(userName);
}

function populateSalonBanner() {
    salonBanner.text(userSalon);
}

function populatePhoneBanner() {
    phoneBanner.text(userPhone);
}

function populateEmailBanner() {
    emailBanner.text(userEmail);
}

function populateTotalRatingBanner() {
    totalRatingBanner.text(userTotalRating);
}

function populateRawRatingsArea() {
    rawRatingsBanner.text( JSON.stringify(userRawRatings) );
}

//----------------------------------------------------------------

						 // LOGIC

//---------------------------------------------------------------/

function assignUserGlobals(obj) {
    userId = obj._id; populateProfilePic();
    userName = obj.firstname + ' ' + obj.lastname; populateNameBanner();
    userSalon = obj.salon; populateSalonBanner();
    userPhone = obj.phone; populatePhoneBanner();
    userEmail = obj.email; populateEmailBanner();
    userTotalRating = obj.totalRating; populateTotalRatingBanner();
    userRawRatings = obj.rawRatings; populateRawRatingsArea();
}

/*******************************************
 * Verify Rating With Code
*******************************************/
function verifyUrlPhone() {

    // Rating is invalid. 
    if( urlPhone === null || urlPhone === '' ) stylistNotFound();
    
    // Rating is valid.
    else validateUrlPhone();

}

/*******************************************
 * Get Request Id From URL
*******************************************/
function getUrlPhone() {

    var url = window.location.href;
    var param = url.split('?')[1];

    if( typeof param === 'undefined' ) return null;
    
    else return param;

}

function validateUrlPhone() {
    if(urlPhone.length === 11) {
        var rawPhone = urlPhone.split('');
        rawPhone.splice(1,0,'(');
        rawPhone.splice(5,0,')');
        rawPhone.splice(9,0,'-');
        var newPhone = rawPhone.join('');
        getUserProfile(newPhone);
    }
    
    else {
        stylistNotFound()
    }

}

//----------------------------------------------------------------

						 // AJAX CALLS

//---------------------------------------------------------------/
/*******************************************
 * Check If Already Logged In -> GET
*******************************************/
function getUserProfile(phone) {

    var userProfileSettings = {
        "async": true,
        "crossDomain": true,
        "url": apiurl + "profile/" + phone ,
        "method": "GET",
        "headers": {
            "cache-control": "no-cache",
        },
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "statusCode": {
            200: function(req, res) {
                assignUserGlobals( JSON.parse(req) );
            },
            400: function(req, res) {
                stylistNotFound()
            },
            500: function(req, res) {
                stylistNotFound()
            }
        }
    }

    // Send AJAX
    $.ajax(userProfileSettings)

}

//----------------------------------------------------------------

						 // MAIN

//---------------------------------------------------------------/

/*******************************************
 * Main Function
*******************************************/
    var Main = (function() {
        verifyUrlPhone();
    })();

    return {

    }

})(); // END OF PROFILE.JS