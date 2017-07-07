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
editClientButton.click(function() {
    loadProfileValues();
    // clientAddModal.modal('show');
});

//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/


//----------------------------------------------------------------

						 // LOGIC

//---------------------------------------------------------------/
function loadProfileValues() {

    originalFirstname = $('.clientprofile .firstname').text();
    originalLastname  = $('.clientprofile .lastname').text();
    originalPhone     = $('.clientprofile .phone').text();
    originalPhotoSrc  = $('.clientprofile .photo').attr('src');
    originalNotes     = $('.clientprofile .notes').text();

    clientAddFormFirstname.val(originalFirstname);
    clientAddFormLastname.val(originalLastname);
    clientAddFormPhone.val(originalPhone);
    clientAddFormNotes.val(originalNotes);

    clientAddModal.modal('show');

    console.log(originalFirstname, originalLastname, originalPhone, originalPhotoSrc, originalNotes);

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
    form.append("notes", clientAddFormNotes.val());
    form.append("photo", PhotoUpload.getResizedImage(), 'photo.jpg');
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
                emptyAddForm();
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