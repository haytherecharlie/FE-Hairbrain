/*******************************************
* © 2017 Hairbrain inc.
* ---------------------
* Created: February 11th 2017
* Last Modified: March 21st 2017
* Author: Charlie Hay
*
* BASE JS FUNCTIONALITY.
/******************************************/

var userid      = $.cookie('userid'),
    jwt         = $.cookie('jwt'),
    clients     = [];
    apiurl     = 'http://localhost:8080/';

function cookieCheck() {
    if(!userid || !jwt) {
        window.location.href = window.location.origin + '/';
        return false;
    }
}

/*******************************************
* © 2017 Hairbrain inc.
* ---------------------
* Created: February 11th 2017
* Last Modified: March 21st 2017
* Author: Charlie Hay
*
* NAV COMPONENT JS FUNCTIONALITY.
/******************************************/

var Nav = (function() {

//----------------------------------------------------------------

						 // CACHE

//---------------------------------------------------------------/

/*******************************************
 * Global Variables
*******************************************/
var navMenu     = $('.navmenu'),
	menuItems   = $('.menuitems'),
	menuOverlay = $('.menuoverlay');

//----------------------------------------------------------------

						 // TEMPLATES

//---------------------------------------------------------------/

//----------------------------------------------------------------

						 // LISTENERS

//---------------------------------------------------------------/
navMenu.click(function() {
	if(menuItems.hasClass('open'))
		closeMenu();
	else
		openMenu();
});

//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/
function openMenu() {
	menuItems.animate({
		bottom: '-=' + menuItems.height()
	}, 300);
	menuOverlay.animate({
		opacity: '1'
	}, 300);
	menuItems.addClass('open');
}

function closeMenu() {
	menuItems.animate({
		bottom: '+=' + menuItems.height()
	}, 300);
	menuOverlay.animate({
		opacity: '0'
	}, 300);
	menuItems.removeClass('open');
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


})(); // END OF NAV.JS
/*******************************************
* © 2017 Hairbrain inc.
* ---------------------
* Created: February 11th 2017
* Last Modified: March 21st 2017
* Author: Charlie Hay
*
* CLIENT PROFILES JS FUNCTIONALITY.
/******************************************/

var ClientProfile = (function() {

//----------------------------------------------------------------

						 // CACHE

//---------------------------------------------------------------/

/*******************************************
 * Global Variables
*******************************************/
var clientProfile = $('.clientprofile'),
    avatar        = $('.avatar'),
    firstname     = $('.clientprofile .firstname'),
    lastname      = $('.clientprofile .lastname'),
    email         = $('.clientprofile .email'),
    phone         = $('.clientprofile .phone'),
    photofront    = $('.clientprofile .photofront'),
    photoleft     = $('.clientprofile .photoleft'),
    photoback     = $('.clientprofile .photoback'),
    photoright    = $('.clientprofile .photoright'),
    notes         = $('.clientprofile .notes');
    deleteModal   = $('.deleteModal');

//----------------------------------------------------------------

						 // TEMPLATES

//---------------------------------------------------------------/

//----------------------------------------------------------------

						 // LISTENERS

//---------------------------------------------------------------/
$('.deleteclient').click(function() {
    showDeleteConfirmation();
});

$('.confirmDelete').click(function() {
    deleteClient();
});

//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/
function populateProfile(client) {
    console.log(client);
    clientProfile.attr('id', client._id);
    avatar.attr('src', apiurl+'photo/'+client.userid+'/'+client._id+'/photofront.jpg');
    firstname.text(client.firstname);
    lastname.text(client.lastname);
    phone.text(client.phone);
    email.text(client.email);
    photofront.attr('src', apiurl+'photo/'+client.userid+'/'+client._id+'/photofront.jpg');
    photoleft.attr('src', apiurl+'photo/'+client.userid+'/'+client._id+'/photoleft.jpg');
    photoback.attr('src', apiurl+'photo/'+client.userid+'/'+client._id+'/photoback.jpg');
    photoright.attr('src', apiurl+'photo/'+client.userid+'/'+client._id+'/photoright.jpg');
    notes.val(client.notes);
}

function showDeleteConfirmation() {
    deleteModal.modal('show');
}

//----------------------------------------------------------------

						 // LOGIC

//---------------------------------------------------------------/
function deleteClient() {
    var clientid = clientProfile.attr('id');

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:8080/client/delete/" + userid + '/' + clientid,
        "method": "DELETE",
        "headers": {
            "cache-control": "no-cache",
            "Authorization": "Bearer " + jwt
        },
        "processData": false,
        "contentType": false,
    }

    $.ajax(settings)
    .done(function (req, res) {
        if(res === "success") { 
            console.log('success');
        }
    });
}

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