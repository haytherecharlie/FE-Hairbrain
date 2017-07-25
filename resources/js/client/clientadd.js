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
var clientAddButton             = $('main .clientaddbutton');
var clientAddModal              = $('.clientaddmodal');
var clientAddForm               = $('.clientaddmodal .clientaddform');
var clientAddFormFirstname      = $('.clientaddmodal .clientaddform .firstname');
var clientAddFormLastname       = $('.clientaddmodal .clientaddform .lastname');
var clientAddFormPhone          = $('.clientaddmodal .clientaddform .phone');
var clientAddFormFeedbackToggle = $('.clientaddmodal .clientaddform .feedbacktoggle');
var clientAddFormNotes          = $('.clientaddmodal .clientaddform .notes');
var clientAddFormSubmit         = $('.clientaddmodal .clientaddsubmit');
var clientAddModalCloseButton   = $('.clientaddmodal .closemodal');
var clientAddModalLoadingGif    = $('.clientaddmodal .savingclient');


//----------------------------------------------------------------

						 // LISTENERS

//---------------------------------------------------------------/

/*******************************************
 * On Click of Client Add Button
*******************************************/
clientAddButton.click( function() {
    clientAddModal.modal('show');
});

/*******************************************
 * On Click of Submit Button
*******************************************/
clientAddFormSubmit.click( function() {
    showLoading();
    clientAddFormAJAX();
});

/*******************************************
 * On Click of Close Modal 
*******************************************/
clientAddModalCloseButton.click( function() {
    emptyAddForm();
});

/*******************************************
 * Quick clear phone input if placeholder. 
*******************************************/
clientAddFormPhone.focus(function() {
    if($(this).val() === '1(000)000-0000'){
        $(this).val('');
    }
})

/*******************************************
 * Doesn't Allow Form Submit on Enter Press
*******************************************/
$(document).keypress(":input:not(textarea)", function(event) {
    return event.keyCode != 13;
});


//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/

/*******************************************
 * Initialize the Feedback Toggle
*******************************************/
function initializeFeedbackToggle() {
    clientAddFormFeedbackToggle.bootstrapToggle({
      on: 'Yes',
      off: 'No',
      style: 'hairbrain-toggle'
    });
}

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
    // Reset inputs.
    $('.clientaddmodal .clientaddform input').each(function() { $(this).val('');})
    // Reset Notes.
    clientAddFormNotes.text('');
    // Reset PhotoUpload preview. 
    $('.clientaddmodal .clientaddform .photothumb').attr('src', '/app/img/photoholder.png');
    // Reset Feedback Toggle.
    clientAddFormFeedbackToggle.bootstrapToggle('off');
    // Clear Photoupload cache of image. 
    var h = PhotoUpload.getResizedImage();
    // Clear Photoupload cache of avatar.
    var r = PhotoUpload.getResizedAvatar();
}


//----------------------------------------------------------------

						 // AJAX CALLS

//---------------------------------------------------------------/

/*******************************************
 * Add Client Form -> POST
*******************************************/
function clientAddFormAJAX() {

    // Create new form. 
    var form = new FormData();

    // Add form values. 
    form.append("firstname", clientAddFormFirstname.val());
    form.append("lastname", clientAddFormLastname.val());
    form.append("phone", clientAddFormPhone.val());
    form.append("notes", clientAddFormNotes.text());
    form.append("name", name);

    // If feedback request is made or not. 
    if(clientAddFormFeedbackToggle.val() === "on" ) { form.append("feedback", true); } 
    else { form.append("feedback", false); }

    // Assign Resized Avatar and Photo. 
    var resizedPhoto  = PhotoUpload.getResizedImage();
    var resizedAvatar = PhotoUpload.getResizedAvatar(); 

    // Append values to form. 
    if (resizedPhoto)  { form.append("photo",  resizedPhoto);  }
    if (resizedAvatar) { form.append("avatar", resizedAvatar); }

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
                hideLoading();
                ErrorModal.populateMessage(req.responseText);
            },
            401: function(req, res) {
                hideLoading();
                ErrorModal.populateMessage(req.responseText);
            },
            500: function(req, res) {
                hideLoading();
                ErrorModal.populateMessage('Hairbrain isn\'t working right now. Please try again later.');
            }
        }
    }

    // AJAX SETTINGS
    $.ajax(settings)

}

//----------------------------------------------------------------

						 // MAIN

//---------------------------------------------------------------/

/*******************************************
 * Main Function
*******************************************/
    var Main = (function() {  

        // Initialize bootstrap toggle for feeback toggle. 
        initializeFeedbackToggle();

    })();

    return {
        emptyAddForm: emptyAddForm,
        showLoading: showLoading,
        hideLoading: hideLoading
    }

})(); // END OF CLIENTADD.JS
