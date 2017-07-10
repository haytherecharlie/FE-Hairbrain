/*******************************************
* © 2017 Hairbrain inc.
* ---------------------
* Created: February 11th 2017
* Last Modified: June 6th 2017
* Author: Charlie Hay
*
* LOGIN PAGE JS FUNCTIONALITY.
/******************************************/

var Login = (function() {

//----------------------------------------------------------------

						 // CACHE

//---------------------------------------------------------------/

/*******************************************
 * Global Variables
*******************************************/
var loginForm     = $('.loginform');
var loginPhone    = $('.loginphone');
var loginPassword = $('.loginpassword');
var loginFailed   = $('.loginfailed');
var loginButton   = $('.loginbutton');


//----------------------------------------------------------------

						 // TEMPLATES

//---------------------------------------------------------------/


//----------------------------------------------------------------

						 // LISTENERS

//---------------------------------------------------------------/

/*******************************************
 * Submit Form
*******************************************/
loginForm.submit( function(e) {
    e.preventDefault();
    loginFormAJAX();
});

//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/


//----------------------------------------------------------------

						 // LOGIC

//---------------------------------------------------------------/

/*******************************************
 * Login Success
*******************************************/
function loginSuccess(res) {
    $.cookie('jwt',      res.token,    { expires: 7, path: '/' });
    $.cookie('userid',   res.id,       { expires: 7, path: '/' });
    $.cookie('name',     res.name,     { expires: 7, path: '/' });
    $.cookie('phone',    res.phone,    { expires: 7, path: '/' });
    $.cookie('email',    res.email,    { expires: 7, path: '/' });
    $.cookie('salon',    res.salon,    { expires: 7, path: '/' });
    sessionStorage.setItem('avatar', res.avatar );
    redirect(/clients/);
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
 * Login Form -> POST
*******************************************/
function loginFormAJAX() {

    var form = new FormData();
    form.append("phone", loginPhone.val());
    form.append("password", loginPassword.val());

    var loginSettings = {
        "async": true,
        "crossDomain": true,
        "url": apiurl + "login",
        "method": "POST",
        "headers": {
            "cache-control": "no-cache"
        },
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form,
        "statusCode": {
            200: function(req, res) {
                console.log(JSON.parse(req));
                // setTimeout( function() {
                loginSuccess(JSON.parse(req));
                // }, 100000)
            },
            400: function(req, res) {
                ErrorModal.populateMessage(req.responseText);
            },
            401: function(req, res) {
                ErrorModal.populateMessage(req.responseText);
            },
            500: function(req, res) {
                ErrorModal.populateMessage('Hairbrain isn\'t working right now. Please try again later.');
            }
        }
    }

    // Send AJAX
    $.ajax(loginSettings)

}

/*******************************************
 * Check If Already Logged In -> GET
*******************************************/
function checkIfAlreadyLoggedIn(jwt) {

    var loginCheckSettings = {
        "async": true,
        "crossDomain": true,
        "url": apiurl + "check",
        "method": "GET",
        "headers": {
            "cache-control": "no-cache",
            "Authorization": "Bearer " + jwt
        },
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "statusCode": {
            200: function(req, res) {
                redirect(/clients/);
            },
            401: function(req, res) {
                // Do Nothing 
            }, 
            500: function(req, res) {
                ErrorModal.populateMessage('Hairbrain isn\'t working right now. Please try again later.');
            }
        }
    }

    // Send AJAX
    $.ajax(loginCheckSettings)

}


//----------------------------------------------------------------

						 // MAIN

//---------------------------------------------------------------/

/*******************************************
 * Main Function
*******************************************/
    var Main = (function() {

        // If JWT exists, try auto login.
        if ($.cookie('jwt')) { 
            checkIfAlreadyLoggedIn($.cookie('jwt'));
        }

    })();

    return {

    }

})(); // END OF LOGIN.JS
