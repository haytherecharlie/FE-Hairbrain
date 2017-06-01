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
var registerForm   = $('.registerform'),
    firstname      = $('.registerform .firstname'),
    lastname       = $('.registerform .lastname'),
    email          = $('.registerform .avatar'),
    password       = $('.registerform .password'),
    phone          = $('.registerform .phone')
    salon          = $('.registerform .salon'),
    avatar         = $('.registerform .photoinput'),
    keyword        = $('.registerform .keyword'),
    registerBtn    = $('.registerform .submit');

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

// Listens for change on each input. NOTE:Doesn't listen to textarea.
$('.registerform input').keydown(function() {
    console.log('x');
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
    var numInputs   = $('.registerform input').length;
    var validInputs = 0; 
    $('.registerform input').each(function() {
        if ( $(this).val() !== '') {
            validInputs++;
        }
    })
    toggleSubmitBtn(validInputs, numInputs);
}

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
    console.log(keyword.val());

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
        "data": form
        }

        $.ajax(settings)
        .done(function (err, res) {
            if(res === "success") redirect('/');
            else console.log(err);
        });
    } else {
        window.location.reload();
    }
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