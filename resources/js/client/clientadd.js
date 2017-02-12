/*******************************************
* © 2017 Hairbrain inc.
* ---------------------
* Created: February 11th 2017
* Last Modified: February 11th 2017
* Author: Charlie Hay
/******************************************/
var ClientAdd = (function() {

//----------------------------------------------------------------

						 // CACHE

//---------------------------------------------------------------/

/*******************************************
 * Global Variables
*******************************************/
var clientAddForm = $('#clientaddform'),
    firstname     = $('#clientaddform input[name="firstname"]'),
    lastname      = $('#clientaddform input[name="lastname"]'),
    email         = $('#clientaddform input[name="email"]'),
    phone         = $('#clientaddform input[name="phone"]')
    notes         = $('#clientaddform textarea[name="notes"]');
    photofront    = $('#clientaddform input[name="photofront"]');
    photoleft     = $('#clientaddform input[name="photoleft"]');
    photoback     = $('#clientaddform input[name="photoback"]');
    photoright    = $('#clientaddform input[name="photoright"]');

//----------------------------------------------------------------

						 // TEMPLATES

//---------------------------------------------------------------/


//----------------------------------------------------------------

						 // LISTENERS

//---------------------------------------------------------------/
clientAddForm.submit( function(e) {
    e.preventDefault();
    clientAddFormAJAX();
    emptyAddForm();
});


//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/



//----------------------------------------------------------------

						 // LOGIC

//---------------------------------------------------------------/
function emptyAddForm() {
    $('#clientaddform input').each(function() {
        $(this).val('');
    })
    notes.val('');
}

//----------------------------------------------------------------

						 // AJAX CALLS

//---------------------------------------------------------------/

/*******************************************
 * Add Client Form -> POST
*******************************************/
function clientAddFormAJAX() {
    var form = new FormData();
    form.append("firstname", firstname.val());
    form.append("lastname", lastname.val());
    form.append("email", email.val());
    form.append("phone", phone.val());
    form.append("notes", notes.val());
    form.append("photofront", photofront[0].files[0], 'photofront.jpg');
    form.append("photoleft", photoleft[0].files[0], 'photoleft.jpg');
    form.append("photoback", photoback[0].files[0], 'photoback.jpg');
    form.append("photoright", photoright[0].files[0], 'photoright.jpg');

    var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost:8080/client/add/" + userid,
    "method": "POST",
    "headers": {
        "cache-control": "no-cache",
        "Authorization": "Bearer " + jwt
    },
    "processData": false,
    "contentType": false,
    "mimeType": "multipart/form-data",
    "data": form
    }

    $.ajax(settings)
    .done(function (req, res) {
        console.log(res);
        if(res === "success") { 
            ClientList.clientListAJAX();
        }
    });
}

//----------------------------------------------------------------

						 // MAIN

//---------------------------------------------------------------/

/*******************************************
 * Main Function
*******************************************/
clientAddForm.validate();

})(); // END OF LOGIN.JS