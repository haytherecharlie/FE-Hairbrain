/*******************************************
* © 2017 Hairbrain inc.
* ---------------------
* Created: February 11th 2017
* Last Modified: March 21st 2017
* Author: Charlie Hay
*
* CLIENT ADD JS FUNCTIONALITY.
/******************************************/

var ClientAdd = (function() {

//----------------------------------------------------------------

						 // CACHE

//---------------------------------------------------------------/

/*******************************************
 * Global Variables
*******************************************/
var clientAddForm  = $('.clientaddform'),
    addFormInputs  = $('.clientaddform input')
    addFormSubmit  = $('.clientaddsubmit'),
    clientAddBtn   = $('.clientadd'),
    closeModal     = $('.closemodal'),
    addClientModal = $('.addmodal'),
    firstname      = $('.clientaddform input[name="firstname"]'),
    lastname       = $('.clientaddform input[name="lastname"]'),
    phone          = $('.clientaddform input[name="phone"]')
    notes          = $('.clientaddform textarea[name="notes"]'),
    photofront     = $('.clientaddform input[name="photofront"]'),
    // photoleft      = $('.clientaddform input[name="photoleft"]'),
    // photoback      = $('.clientaddform input[name="photoback"]'),
    // photoright     = $('.clientaddform input[name="photoright"]');
    thumbFront     = $('#photo-front'),
    // thumbLeft      = $('#photo-left'),
    // thumbBack      = $('#photo-back'),
    // thumbRight     = $('#photo-right'),
    loadingGif     = $('.savingclient');

//----------------------------------------------------------------

						 // TEMPLATES

//---------------------------------------------------------------/


//----------------------------------------------------------------

						 // LISTENERS

//---------------------------------------------------------------/
clientAddForm.submit( function(e) {
    e.preventDefault();
    showLoading();
    clientAddFormAJAX();
    emptyAddForm();
});

clientAddBtn.click( function() {
    countValidInputs();
    addClientModal.modal('show');
});

closeModal.click( function() {
    emptyAddForm();
});

// Doesn't allow form submit on enter press.
$(document).keypress(":input:not(textarea)", function(event) {
    return event.keyCode != 13;
});

// Listens for change on each input. NOTE:Doesn't listen to textarea.
addFormInputs.not('input[type="button"]').change(function() {
    countValidInputs();
});


//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/
function showLoading() {
    loadingGif.show();
}

function hideLoading() {
    loadingGif.hide();
}

//----------------------------------------------------------------

						 // LOGIC

//---------------------------------------------------------------/
function emptyAddForm() {
    addFormInputs.each(function() {
        $(this).val('');
    })
    notes.val('');
    $('#photo-front').css('background', 'none');
    // $('#photo-left').css( 'background', 'none');
    // $('#photo-back').css( 'background', 'none');
    // $('#photo-right').css('background', 'none');
}

function countValidInputs() {
    var numInputs   = addFormInputs.length;
    var validInputs = 0; 
    addFormInputs.each(function() {
        if ( $(this).val() !== '') {
            validInputs++;
        }
    })
    toggleSubmitBtn(validInputs, numInputs);
}

function toggleSubmitBtn(valid, total) {
    if( valid === total )
        addFormSubmit.prop('disabled', false);
    else 
        addFormSubmit.prop('disabled', true);
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
    form.append("phone", phone.val());
    form.append("notes", notes.val());
    form.append("photofront", photofront[0].files[0], 'photofront.jpg');
    // form.append("photoleft", photoleft[0].files[0], 'photoleft.jpg');
    // form.append("photoback", photoback[0].files[0], 'photoback.jpg');
    // form.append("photoright", photoright[0].files[0], 'photoright.jpg');

    var settings = {
    "async": true,
    "crossDomain": true,
    "url": apiurl + "client/add/" + userid,
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
        if(res === "success") { 
            ClientList.clientListAJAX();
            emptyAddForm();
            addClientModal.modal('hide');
            hideLoading();
        }
    });
}

//----------------------------------------------------------------

						 // MAIN

//---------------------------------------------------------------/

/*******************************************
 * Main Function
*******************************************/
(function() {
    // validateform();
})();
})(); // END OF LOGIN.JS
