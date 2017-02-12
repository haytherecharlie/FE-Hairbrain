/*******************************************
* © 2017 Hairbrain inc.
* ---------------------
* Created: February 11th 2017
* Last Modified: February 11th 2017
* Author: Charlie Hay
/******************************************/
var Login = (function() {

//----------------------------------------------------------------

						 // CACHE

//---------------------------------------------------------------/

/*******************************************
 * Global Variables
*******************************************/
var loginForm = $('#login-form');

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
    loginFormAJAX(this);
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
function loginFormAJAX(form) {
    $.ajax( {
        url: 'http://localhost:8080/login',
        type: 'POST',
        data: new FormData(form),
        processData: false,
        contentType: false,
        success: function(req, res) {
            if(res = "success") loginSuccess(req);
        },
        fail: function(err) {
            console.log(err);
        }
    });
}

/*******************************************
 * Check If Already Logged In -> GET
*******************************************/
function checkIfAlreadyLoggedIn(jwt) {
    $.ajax( {
        xhr: function () {  
            return $.ajaxSettings.xhr();
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Bearer " + jwt);
        },
        url: 'http://localhost:8080/check',
        type: 'GET',
        success: function(req, res) {
            if(res = "success") redirect(/clients/);
        },
        fail: function(err) {
            console.log(err);
        }
    });
}

//----------------------------------------------------------------

						 // MAIN

//---------------------------------------------------------------/

/*******************************************
 * Main Function
*******************************************/
if($.cookie('jwt'))
    checkIfAlreadyLoggedIn($.cookie('jwt'));
else 
    loginForm.validate();

})(); // END OF LOGIN.JS