/*******************************************
* © 2017 Hairbrain inc.
* ---------------------
* Created: February 11th 2017
* Last Modified: March 21st 2017
* Author: Charlie Hay
*
* REGISTER PAGE JS FUNCTIONALITY.
/******************************************/

var Register = (function() {

//----------------------------------------------------------------

						 // CACHE

//---------------------------------------------------------------/

/*******************************************
 * Global Variables
*******************************************/
var registerForm = $('#register-form'),
    firstname    = $('input[name="firstname"]'),
    lastname     = $('input[name="lastname"]'),
    email        = $('input[name="email"]'),
    password     = $('input[name="password"]'),
    phone        = $('input[name="phone"]')
    salon        = $('input[name="salon"]'),
    avatar       = $('input[name="avatar"]');

//----------------------------------------------------------------

						 // TEMPLATES

//---------------------------------------------------------------/


//----------------------------------------------------------------

						 // LISTENERS

//---------------------------------------------------------------/

/*******************************************
 * Submit Form
*******************************************/
registerForm.submit( function(e) {
    e.preventDefault();
    registerFormAJAX();
});

//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/



//----------------------------------------------------------------

						 // LOGIC

//---------------------------------------------------------------/


//----------------------------------------------------------------

						 // AJAX CALLS

//---------------------------------------------------------------/

/*******************************************
 * Login Form -> POST
*******************************************/
function registerFormAJAX() {
    var form = new FormData();
    form.append("email", email.val());
    form.append("password", password.val());
    form.append("phone", phone.val());
    form.append("salon", salon.val());
    form.append("avatar", avatar[0].files[0], 'avatar.jpg');
    form.append("firstname", firstname.val());
    form.append("lastname", lastname.val());

    var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost:8080/register",
    "method": "POST",
    "headers": {
        "cache-control": "no-cache",
    },
    "processData": false,
    "contentType": false,
    "mimeType": "multipart/form-data",
    "data": form
    }

    $.ajax(settings).done(function (response) {
    console.log(response);
    });
}

//----------------------------------------------------------------

						 // MAIN

//---------------------------------------------------------------/

/*******************************************
 * Main Function
*******************************************/
registerForm.validate();

})(); // END OF REGISTER.JS