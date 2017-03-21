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
var clientList    = $('.clientlist'),
    clientProfile = $('.clientprofile');

//----------------------------------------------------------------

						 // TEMPLATES

//---------------------------------------------------------------/

//----------------------------------------------------------------

						 // LISTENERS

//---------------------------------------------------------------/
function addCCListeners() {
    $('.clientcard').each(function() {
        $(this).click(function() {
            ClientProfile.populateProfile(clientlist[$(this).attr('id')]);
            clientProfile.animate({
                left: '0'
            }, 500);
            Nav.hideSearch();
            Nav.showBackBtn();
        })
    })
}

//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/
function displayClients(req) {
    for(var i in req) {
        insertLeadingLetters(req, i);
        clientList.append(`
            <div class="clientcard" id="${i}">
                <div class="avatar">
                    <img src="${apiurl}photo/${userid}/${req[i]._id}/photofront.jpg" height="30">
                </div>
                <span class="firstname">${req[i].firstname}</span>
                <span class="lastname">${req[i].lastname}</span>
            </div>
        `);
    }
    addCCListeners();
}

//----------------------------------------------------------------

						 // LOGIC

//---------------------------------------------------------------/
function insertLeadingLetters(req, i) {
    if (i === '0') 
        clientList.append(`<div class="letter">${req[i].firstname.charAt(0)}</div>`)
    if (i > 0 && i < (req.length) ) {
        if (req[i].firstname.charAt(0) !== req[i-1].firstname.charAt(0))
            clientList.append(`<div class="letter">${req[i].firstname.charAt(0).toUpperCase()}</div>`);
    }
}

//----------------------------------------------------------------

						 // AJAX CALLS

//---------------------------------------------------------------/

/*******************************************
 * Client List -> GET
*******************************************/
function clientListAJAX() {
    cookieCheck();

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:8080/client/all/" + userid,
        "method": "GET",
        "headers": {
            "cache-control": "no-cache",
            "Authorization": "Bearer " + jwt
        },
        "processData": false,
        "contentType": false
    }

    $.ajax(settings)
    .done(function (req, res) {
        if(res === 'success') {
            clientlist = req;
            clientList.empty();
            displayClients(req);
        }
    });
}

//----------------------------------------------------------------

						 // MAIN

//---------------------------------------------------------------/

/*******************************************
 * Main Function
*******************************************/
clientListAJAX();

return {
    clientListAJAX: clientListAJAX
}

})(); // END OF LOGIN.JS