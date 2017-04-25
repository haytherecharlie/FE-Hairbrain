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
var registerForm   = $('.register-form'),
    firstname      = $('.register-form input[name="firstname"]'),
    lastname       = $('.register-form input[name="lastname"]'),
    email          = $('.register-form input[name="email"]'),
    password       = $('.register-form input[name="password"]'),
    phone          = $('.register-form input[name="phone"]')
    salon          = $('.register-form input[name="salon"]'),
    avatar         = $('.register-form input[name="avatar"]'),
    registerInputs = $('.register-form input'),
    registerBtn    = $('.confirmregister'),
    registerNow    = $('.registernow');

//----------------------------------------------------------------

						 // TEMPLATES

//---------------------------------------------------------------/


//----------------------------------------------------------------

						 // LISTENERS

//---------------------------------------------------------------/

/*******************************************
 * Submit Form
*******************************************/
registerBtn.click( function(e) {
    registerFormAJAX();
});

registerNow.click( function(e) {
    $('.modal').modal('show');
});

// Listens for change on each input. NOTE:Doesn't listen to textarea.
registerInputs.not('input[type="button"]').change(function() {
    countValidInputs();
});

//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/



//----------------------------------------------------------------

						 // LOGIC

//---------------------------------------------------------------/
function initialize() {
    var input = document.getElementById('salon');
    var autocomplete = new google.maps.places.Autocomplete(input);
}

function countValidInputs() {
    var numInputs   = registerInputs.length;
    var validInputs = 0; 
    registerInputs.each(function() {
        if ( $(this).val() !== '') {
            validInputs++;
        }
    })
    toggleSubmitBtn(validInputs, numInputs);
}

function toggleSubmitBtn(valid, total) {
    if( valid === total )
        registerBtn.prop('disabled', false);
    else 
        registerBtn.prop('disabled', true);
}

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
    "url": apiurl + "register",
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
    google.maps.event.addDomListener(window, 'load', initialize);
    countValidInputs();
})(); // END OF REGISTER.JS