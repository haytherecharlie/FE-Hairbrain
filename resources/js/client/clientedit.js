/*******************************************
* © 2017 Hairbrain inc.
* ---------------------
* Created: February 11th 2017
* Last Modified: June 6th 2017
* Author: Charlie Hay
*
* CLIENT EDIT JS FUNCTIONALITY.
/******************************************/

var ClientEdit = (function() {

//----------------------------------------------------------------

						 // CACHE

//---------------------------------------------------------------/

/*******************************************
 * Global Variables
*******************************************/
var editClientButton          = $('.clientprofile .editclient'); 
var originalFirstname;
var originalLastname;
var originalPhone;
var originalPhotoSrc;
var originalNotes;
var clientAddFormPhotoWidget;

var clientAddButton           = $('main .clientaddbutton');
var clientAddModal            = $('.clientaddmodal');
var clientAddModalFooter      = $('.clientaddmodal .modal-footer');
var clientAddForm             = $('.clientaddmodal .clientaddform');
var clientAddFormFirstname    = $('.clientaddmodal .clientaddform .firstname');
var clientAddFormLastname     = $('.clientaddmodal .clientaddform .lastname');
var clientAddFormPhone        = $('.clientaddmodal .clientaddform .phone');
var clientAddFormNotes        = $('.clientaddmodal .clientaddform .notes');

var clientAddFormSubmit       = $('.clientaddmodal .clientaddsubmit');
var clientAddModalCloseButton = $('.clientaddmodal .closemodal');

var clientEditFormSubmit       = $('.clientaddmodal .clienteditsubmit');
var clientEditModalCloseButton = $('.clientaddmodal .closeeditmodal');

var clientAddModalLoadingGif  = $('.clientaddmodal .savingclient');


//----------------------------------------------------------------

						 // LISTENERS

//---------------------------------------------------------------/
editClientButton.click(function() {
    loadProfileValues();
});

clientEditModalCloseButton.click(function() {
    removeEditModalFooterButtons();
    ClientAdd.emptyAddForm();
});

clientEditFormSubmit.click(function() {
    ClientAdd.showLoading();
    clientEditFormAJAX();
});

//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/

function displayProfileValues() {

    clientAddFormFirstname.val(originalFirstname);
    clientAddFormLastname.val(originalLastname);
    clientAddFormPhone.val(originalPhone);
    clientAddFormNotes.text(originalNotes);
    clientAddFormPhotoWidget.attr('src', originalPhotoSrc);

    addEditModalFooterButtons();
    

    clientAddModal.modal('show');

}

function addEditModalFooterButtons() {

    clientAddFormSubmit.hide();
    clientAddModalCloseButton.hide();

    clientEditFormSubmit.show()
    clientEditModalCloseButton.show();

}

function removeEditModalFooterButtons() {

    clientAddFormSubmit.show();
    clientAddModalCloseButton.show();

    clientEditFormSubmit.hide()
    clientEditModalCloseButton.hide();

}

//----------------------------------------------------------------

						 // LOGIC

//---------------------------------------------------------------/
function loadProfileValues() {

    originalFirstname        = $('.clientprofile .firstname').text();
    originalLastname         = $('.clientprofile .lastname').text();
    originalPhone            = $('.clientprofile .phone').text();
    originalPhotoSrc         = $('.clientprofile .photo').attr('src');
    originalNotes            = $('.clientprofile .notes').text();
    clientAddFormPhotoWidget = $('.clientaddmodal .clientaddform .photothumb');

    displayProfileValues();

}

//----------------------------------------------------------------

						 // AJAX CALLS

//---------------------------------------------------------------/

/*******************************************
 * Add Client Form -> POST
*******************************************/
function clientEditFormAJAX() {

    var form = new FormData();
    form.append("firstname", clientAddFormFirstname.val());
    form.append("lastname", clientAddFormLastname.val());
    form.append("phone", clientAddFormPhone.val());
    form.append("notes", clientAddFormNotes.text());

    if (PhotoUpload.getResizedImage())  { form.append("photo",  PhotoUpload.getResizedImage());   }
    if (PhotoUpload.getResizedAvatar()) { form.append("avatar", PhotoUpload.getResizedAvatar()); }

    clientid = $('.clientprofile').attr('id');

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": apiurl + "client/edit/" + userid + '/' + clientid + '/',
        "method": "PUT",
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
                ClientAdd.emptyAddForm();
                clientAddModal.modal('hide');
                ClientAdd.hideLoading();
                ClientNav.closeClientProfile();
                removeEditModalFooterButtons();
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

        // Main

    })();

    return {

    }

})(); // END OF CLIENTADD.JS