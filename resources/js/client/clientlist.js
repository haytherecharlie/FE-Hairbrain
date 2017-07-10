/*******************************************
* © 2017 Hairbrain inc.
* ---------------------
* Created: February 11th 2017
* Last Modified: March 21st 2017
* Author: Charlie Hay
*
* CLIENT LIST JS FUNCTIONALITY.
/******************************************/

var ClientList = (function() {

//----------------------------------------------------------------

						 // CACHE

//---------------------------------------------------------------/

/*******************************************
 * Global Variables
*******************************************/
var clientList    = $('.clientlist');
var clientProfile = $('.clientprofile');


//----------------------------------------------------------------

						 // LISTENERS

//---------------------------------------------------------------/

/*******************************************
 * SET LISTENERS FOR CLIENT CARDS
*******************************************/
function addCCListeners() {
    $('.clientcard').each(function() {
        $(this).click(function() {
            ClientProfile.populateProfile(clientlist[$(this).attr('id')]);
            ClientNav.quickClearSearch();
            clientProfile.animate({
                left: '0'
            }, 500, function() {
                ClientNav.restoreList();
                clientList.scrollTop(0);
            });
            ClientNav.hideSearch();
            ClientNav.showBackBtn();
        })
    })
}

//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/

/*******************************************
 * DISPLAY CLIENTS
*******************************************/
function displayClients(req) {
    var x = Math.floor(Math.random() * 10000);
    for(var i in req) {
        insertLeadingLetters(req, i);
        clientList.append('' +
            '<div class="clientcard" id="'+i+'" data-name="' + req[i].firstname + req[i].lastname + '">' +
                '<div class="avatar">' +
                    '<img src="'+req[i].avatar+'">' +
                '</div>' +
                '<span class="firstname">'+req[i].firstname+'</span>' +
                '<span class="lastname"> '+req[i].lastname+'</span>' +
            '</div>'
        );
    }
    addCCListeners();
}

//----------------------------------------------------------------

						 // LOGIC

//---------------------------------------------------------------/

/*******************************************
 * INSERT LEADING LETTERS FOR CLIENT LIST
*******************************************/
function insertLeadingLetters(req, i) {
    if (i === '0') 
        clientList.append('<div class="letter">'+req[i].firstname.charAt(0)+'</div>');
    if (i > 0 && i < (req.length) ) {
        if (req[i].firstname.charAt(0) !== req[i-1].firstname.charAt(0))
            clientList.append('<div class="letter">'+req[i].firstname.charAt(0).toUpperCase()+'</div>');
    }
}

//----------------------------------------------------------------

						 // AJAX CALLS

//---------------------------------------------------------------/

/*******************************************
 * Client List -> GET
*******************************************/
function clientListAJAX() {
    
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": apiurl + "client/all/" + userid,
        "method": "GET",
        "headers": {
            "cache-control": "no-cache",
            "Authorization": "Bearer " + jwt
        },
        "processData": false,
        "contentType": false,
        "statusCode": {
            200: function(req, res) {
                clientlist = req;
                clientList.empty();
                if(clientlist.length === 0)
                    clientList.append('<div class="empty">You don\'t have any clients, <br> Click the \'+\' below to get started!</div>');
                else 
                    displayClients(req);
            },
            400: function(req, res) {
                ErrorModal.populateMessage(req.responseText);
            },
            401: function(req, res) {
                redirect('/');
            },
            500: function(req, res) {
                ErrorModal.populateMessage('Hairbrain isn\'t working right now. Please try again later.');
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
        clientListAJAX();
    })();

    return {
        clientListAJAX: clientListAJAX
    }

})(); // END OF CLIENTLIST.JS
