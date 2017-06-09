/*******************************************
* © 2017 Hairbrain inc.
* ---------------------
* Created: February 11th 2017
* Last Modified: March 21st 2017
* Author: Charlie Hay
*
* ERROR MODAL TEMPLATE JS FUNCTIONALITY.
/******************************************/

var ErrorModal = (function() {

//----------------------------------------------------------------

						 // CACHE

//---------------------------------------------------------------/

/*******************************************
 * Global Variables
*******************************************/
var errorModalTplPath    = '/templates/errormodal.tpl.html';
var errorModalContainer  = $('.errormodalcontainer');
var errorModal;
var errorModalMsg;
var errorModalClose;

//----------------------------------------------------------------

						 // TEMPLATES

//---------------------------------------------------------------/


//----------------------------------------------------------------

						 // LISTENERS

//---------------------------------------------------------------/

/*******************************************
 * Add Listeners
*******************************************/
function addListeners() {
    console.log('erooor');
    errorModal      = $('.errormodal');
    errorModalMsg   = $('.errormodal .message');
    errorModalClose = $('.errormodal .dismiss');
    errorModalClose.click(function() {
        errorModalMsg.empty();
    })
}

//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/
function populateMessage(msg) {
    console.log('heelo');
    errorModalMsg.text(msg);
    errorModal.modal('show');
}

//----------------------------------------------------------------

						 // LOGIC

//---------------------------------------------------------------/


//----------------------------------------------------------------

						 // AJAX CALLS

//---------------------------------------------------------------/



//----------------------------------------------------------------

						 // MAIN

//---------------------------------------------------------------/

/*******************************************
 * Main Function
*******************************************/
    var Main = (function() {
        
        // Load onto body. 
        if(errorModalContainer) {
            errorModalContainer.load(errorModalTplPath, function() {
                addListeners();
            });
        }

    })();

    return {
        populateMessage: populateMessage
    }

})(); // END OF FOOTERLINKS.JS