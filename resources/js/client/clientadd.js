/*******************************************
* © 2017 Hairbrain inc.
* ---------------------
* Created: February 11th 2017
* Last Modified: June 6th 2017
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
var clientAddButton           = $('main .clientaddbutton');
var clientAddModal            = $('.clientaddmodal');
var clientAddForm             = $('.clientaddmodal .clientaddform');
var clientAddFormFirstname    = $('.clientaddmodal .clientaddform .firstname');
var clientAddFormLastname     = $('.clientaddmodal .clientaddform .lastname');
var clientAddFormPhone        = $('.clientaddmodal .clientaddform .phone');
var clientAddFormNotes        = $('.clientaddmodal .clientaddform .notes');
var clientAddFormSubmit       = $('.clientaddmodal .clientaddsubmit');
var clientAddModalCloseButton = $('.clientaddmodal .closemodal');
var clientAddModalLoadingGif  = $('.clientaddmodal .savingclient');


//----------------------------------------------------------------

						 // LISTENERS

//---------------------------------------------------------------/

/*******************************************
 * On Click of Client Add Button
*******************************************/
clientAddButton.click( function() {
    countValidInputs();
    clientAddModal.modal('show');
});

/*******************************************
 * On Click of Submit Button
*******************************************/
clientAddFormSubmit.click( function() {
    showLoading();
    clientAddFormAJAX();
    emptyAddForm();
});

/*******************************************
 * On Click of Close Modal 
*******************************************/
clientAddModalCloseButton.click( function() {
    emptyAddForm();
});

/*******************************************
 * Doesn't Allow Form Submit on Enter Press
*******************************************/
$(document).keypress(":input:not(textarea)", function(event) {
    return event.keyCode != 13;
});

/*******************************************
 * Listens for Change on Inputs (Not Textarea)
*******************************************/
$('.clientaddmodal .clientaddform input').not('input[type="button"]').keydown(function() {
    countValidInputs();
});


//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/

/*******************************************
 * Show Loading Animation
*******************************************/
function showLoading() {
    clientAddModalLoadingGif.show();
}

/*******************************************
 * Hide Loading Animation
*******************************************/
function hideLoading() {
    clientAddModalLoadingGif.hide();
}

//----------------------------------------------------------------

						 // LOGIC

//---------------------------------------------------------------/

/*******************************************
 * Empty Client Add Form on Close
*******************************************/
function emptyAddForm() {
    $('.clientaddmodal .clientaddform input').each(function() {
        $(this).val('');
    })
    clientAddFormNotes.val('');
    $('.clientaddmodal .clientaddform .photothumb').css('background', 'none');
}

/*******************************************
 * Count Valid Inputs
*******************************************/
function countValidInputs() {
    var numInputs   = $('.clientaddmodal .clientaddform input').length;
    var validInputs = 1; 
    $('.clientaddmodal .clientaddform input').each(function() {
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
    if( valid === total )
        clientAddFormSubmit.prop('disabled', false);
    else 
        clientAddFormSubmit.prop('disabled', true);
}

//----------------------------------------------------------------

						 // AJAX CALLS

//---------------------------------------------------------------/

/*******************************************
 * Add Client Form -> POST
*******************************************/
function clientAddFormAJAX() {
    var form = new FormData();
    form.append("firstname", clientAddFormFirstname.val());
    form.append("lastname", clientAddFormLastname.val());
    form.append("phone", clientAddFormPhone.val());
    form.append("notes", clientAddFormNotes.val());
    form.append("photo", $('.clientaddmodal .clientaddform .photoinput')[0].files[0], 'photo.jpg');
    form.append("name", name);

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
        "data": form,
        "statusCode": {
            200: function(req, res) {
                ClientList.clientListAJAX();
                emptyAddForm();
                clientAddModal.modal('hide');
                hideLoading();
            },
            400: function(req, res) {
                redirect('/learn/mistake/');
            },
            401: function(req, res) {
                redirect('/');
            }
        }
    }

    $.ajax(settings)

}

//----------------------------------------------------------------

						 // MAIN

//---------------------------------------------------------------/

/*******************************************
 * Main Function
*******************************************/
    var Main = (function() {  

        // Main

    })();

    return {

    }

})(); // END OF CLIENTADD.JS
