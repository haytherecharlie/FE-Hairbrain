/*******************************************
* © 2017 Hairbrain inc.
* ---------------------
* Created: February 11th 2017
* Last Modified: March 21st 2017
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
var loginForm    = $('.loginform'),
    email        = $('input[name="email"]'),
    password     = $('input[name="password"]'),
    loginBtn     = $('button[name="submit"]'),
    loginBtnSpan = $('button[name="submit"] span'), 
    loadingGif   = $('.loading'),
    failedLogin  = $('.failedlogin');

//----------------------------------------------------------------

						 // TEMPLATES

//---------------------------------------------------------------/


//----------------------------------------------------------------

						 // LISTENERS

//---------------------------------------------------------------/

/*******************************************
 * Submit Form
*******************************************/
$(loginForm).submit( function(e) {
    e.preventDefault();
    disableLogin();
    loginFormAJAX();
});

//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/
function showFailedMessage() {
    failedLogin.css('opacity', '1');
}

function disableLogin() {
    loginBtn.prop('disabled', true);
}

function enableLogin() {
    loginBtn.prop('disabled', false);
}

//----------------------------------------------------------------

						 // LOGIC

//---------------------------------------------------------------/

/*******************************************
 * Login Success
*******************************************/
function loginSuccess(res) {
    $.cookie('jwt', res.token, { expires: 7, path: '/' });
    $.cookie('userid', res.id, { expires: 7, path: '/' });
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
    form.append("email", email.val());
    form.append("password", password.val());

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://api.hairbrain.ca/login",
        "method": "POST",
        "headers": {
            "cache-control": "no-cache"
        },
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    }

    $.ajax(settings)
    .done(function (req, res) {
        if(res === "success") { 
            loginSuccess(JSON.parse(req));
        }
    })
    .fail( function(err) {
        enableLogin();
        showFailedMessage();
    })

}

/*******************************************
 * Check If Already Logged In -> GET
*******************************************/
function checkIfAlreadyLoggedIn(jwt) {

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://api.hairbrain.ca/check",
        "method": "GET",
        "headers": {
            "cache-control": "no-cache",
            "Authorization": "Bearer " + jwt
        },
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data"
    }

    $.ajax(settings)
    .done(function (req, res) {
        if(res === "success") 
            redirect(/clients/);
    })
    .fail(function(err) {
            console.log(err);
    });
}

//----------------------------------------------------------------

						 // MAIN

//---------------------------------------------------------------/

/*******************************************
 * Main Function
*******************************************/
(function() {
    if($.cookie('jwt')) {
        checkIfAlreadyLoggedIn($.cookie('jwt'));
    }
})();

})(); // END OF LOGIN.JS