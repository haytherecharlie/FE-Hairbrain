var userid      = $.cookie('userid'),
    jwt         = $.cookie('jwt'),
    clients     = [];
    apiurl     = 'http://localhost:8080/';

function cookieCheck() {
    if(!userid || !token) window.location.href = window.location.origin + '/';
}

function openModal() {
    $('.modal').modal('show');
}

function closeModal(modal) {
    $('.modal').modal('hide');
}


/*******************************************
* © 2017 Hairbrain inc.
* ---------------------
* Created: February 11th 2017
* Last Modified: February 11th 2017
* Author: Charlie Hay
/******************************************/
var ClientProfile = (function() {

//----------------------------------------------------------------

						 // CACHE

//---------------------------------------------------------------/

/*******************************************
 * Global Variables
*******************************************/
var clientProfile = $('.clientprofile'),
    firstname     = $('#profilefirstname'),
    lastname      = $('#profilelastname'),
    email         = $('#profileemail'),
    phone         = $('#profilephone'),
    notes         = $('#profilenotes');

//----------------------------------------------------------------

						 // TEMPLATES

//---------------------------------------------------------------/

//----------------------------------------------------------------

						 // LISTENERS

//---------------------------------------------------------------/



//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/
function populateProfile(client) {
    console.log(client);
    firstname.val(client.firstname);
    lastname.val(client.lastname);
    phone.val(client.phone);
    email.val(client.email);
    notes.val(client.notes);
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


return {
    populateProfile: populateProfile
}

})(); // END OF LOGIN.JS
/*******************************************
* © 2017 Hairbrain inc.
* ---------------------
* Created: February 11th 2017
* Last Modified: February 11th 2017
* Author: Charlie Hay
/******************************************/
var ClientList = (function() {

//----------------------------------------------------------------

						 // CACHE

//---------------------------------------------------------------/

/*******************************************
 * Global Variables
*******************************************/
var clientList = $('.clientlist');

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
        })
    })
}


//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/
function displayClients(req) {
    for(var i in req) {
        clientList.append(`
            <div class="clientcard" id="${i}">
                <img src="${apiurl}photo/${userid}/${req[i]._id}/photofront.jpg" height="30">
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
});


//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/



//----------------------------------------------------------------

						 // LOGIC

//---------------------------------------------------------------/



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