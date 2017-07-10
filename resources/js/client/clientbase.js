/*******************************************
* © 2017 Hairbrain inc.
* ---------------------
* Created: February 11th 2017
* Last Modified: June 6th 2017
* Author: Charlie Hay
*
* CLIENT BASE JS FUNCTIONALITY.
/******************************************/

//----------------------------------------------------------------

						 // CACHE

//---------------------------------------------------------------/

/*******************************************
 * Global Variables
*******************************************/
var userid      = decodeURI($.cookie('userid'));
var jwt         = decodeURI($.cookie('jwt'));
var name        = decodeURI($.cookie('name'));
var phone       = decodeURI($.cookie('phone'));
var email       = decodeURI($.cookie('email'));
var salon       = decodeURI($.cookie('salon'));
var avatar      = decodeURI($.cookie('avatar'));


//----------------------------------------------------------------

						 // LISTENERS

//---------------------------------------------------------------/


//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/


//----------------------------------------------------------------

						 // LOGIC

//---------------------------------------------------------------/

/*******************************************
 * Check Token Exists
*******************************************/
function cookieCheck() {
    if(!userid || !jwt) {
        window.location.href = window.location.origin + '/';
        return false;
    } else {
        return true;
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


//----------------------------------------------------------------

						 // MAIN

//---------------------------------------------------------------/
