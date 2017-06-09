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
var registerForm   = $('.registerpage .registerform');
var firstname      = $('.registerpage .registerform .firstname');
var lastname       = $('.registerpage .registerform .lastname');
var email          = $('.registerpage .registerform .avatar');
var password       = $('.registerpage .registerform .password');
var phone          = $('.registerpage .registerform .phone');
var salon          = $('.registerpage .registerform .salon');
var avatar         = $('.registerpage .registerform .photoinput');
var keyword        = $('.registerpage .registerform .keyword');
var registerBtn    = $('.registerpage .registerform .submit');
var successModal   = $('.registerpage .successmodal');
var successLogin   = $('.registerpage .login');

//----------------------------------------------------------------

						 // TEMPLATES

//---------------------------------------------------------------/


//----------------------------------------------------------------

						 // LISTENERS

//---------------------------------------------------------------/

/*******************************************
 * On Click Register Button
*******************************************/
registerBtn.click( function(e) {
    registerFormAJAX();
});

/*******************************************
 * Changes on Inputs * Not Text Area
*******************************************/
$('.registerform input').keydown(function() {
    countValidInputs();
});

/*******************************************
 * On Click Go To Login Page
*******************************************/
successLogin.click(function() {
    location.href = location.origin;
})

//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/



//----------------------------------------------------------------

						 // LOGIC

//---------------------------------------------------------------/
/*******************************************
 * Initialize Google Places
*******************************************/
function initialize() {
    var input = document.getElementById('salon');
    var autocomplete = new google.maps.places.Autocomplete(input);
}

/*******************************************
 * Count Valid Inputs
*******************************************/
function countValidInputs() {
    var numInputs   = $('.registerform input').length;
    var validInputs = 0; 
    $('.registerform input').each(function() {
        if ( $(this).val() !== '') {
            validInputs++;
        }
    })
    toggleSubmitBtn(validInputs, numInputs);
}

/*******************************************
 * Toggle Submit Button
*******************************************/
function toggleSubmitBtn(valid, total) {
    if( valid === total ) {
        registerBtn.prop('disabled', false);
        registerBtn.removeClass('disabled');
    }
    else {
        registerBtn.prop('disabled', true);
        registerBtn.addClass('disabled');
    }
}

//----------------------------------------------------------------

						 // AJAX CALLS

//---------------------------------------------------------------/

/*******************************************
 * Login Form -> POST
*******************************************/
function registerFormAJAX() {

    if(keyword.val() === 'Kanye2020') {
        var form = new FormData();
        form.append("email", email.val());
        form.append("password", password.val());
        form.append("phone", phone.val());
        form.append("salon", salon.val());
        form.append("avatar", $('.photoinput')[0].files[0], 'avatar.jpg');
        form.append("firstname", firstname.val());
        form.append("lastname", lastname.val());

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": apiurl + "register",
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
                    console.log(req, res);
                    // successModal.modal('show');
                },
                400: function(req, res) {
                    console.log(req, res);
                    // redirect('/learn/mistake/');
                },
                401: function(req, res) {
                    console.log(req, res);
                    // location.origin.reload();
                }
            }
        }
        $.ajax(settings)
    }
}

//----------------------------------------------------------------

						 // MAIN

//---------------------------------------------------------------/

/*******************************************
 * Main Function
*******************************************/
    var Main = (function() {
        google.maps.event.addDomListener(window, 'load', initialize);
        countValidInputs();
    })();

    return {

    }

})(); // END OF REGISTER.JS
