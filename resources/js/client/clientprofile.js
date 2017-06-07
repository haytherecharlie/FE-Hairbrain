/*******************************************
* © 2017 Hairbrain inc.
* ---------------------
* Created: February 11th 2017
* Last Modified: June 6th 2017
* Author: Charlie Hay
*
* CLIENT PROFILE JS FUNCTIONALITY.
/******************************************/

var ClientProfile = (function() {

//----------------------------------------------------------------

						 // CACHE

//---------------------------------------------------------------/

/*******************************************
 * Global Variables
*******************************************/
var clientProfile       = $('.clientprofile');
var avatar              = $('.clientprofile .avatar');
var firstname           = $('.clientprofile .firstname');
var lastname            = $('.clientprofile .lastname');
var phone               = $('.clientprofile .phone');
var photo               = $('.clientprofile .photo');
var notes               = $('.clientprofile .notes');
var deleteClientButton  = $('.clientprofile .deleteclient');
var deleteModal         = $('.deleteModal');
var confirmDelete       = $('.deleteModal .confirmDelete');


//----------------------------------------------------------------

						 // LISTENERS

//---------------------------------------------------------------/

/*******************************************
 * On Click of Delete Client Button
*******************************************/
deleteClientButton.click(function() {
    showDeleteConfirmation();
});

/*******************************************
 * On Click of Confirm Delete
*******************************************/
confirmDelete.click(function() {
    deleteClient();
});


//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/

/*******************************************
 * Populate Client Profile
*******************************************/
function populateProfile(client) {
    clientProfile.attr('id', client._id);
    avatar.attr('src', apiurl+'photo/'+client.userid+'/'+client._id+'/avatar.jpg');
    firstname.text(client.firstname);
    lastname.text(client.lastname);
    phone.html('<a href="tel:' + client.phone + '">' + client.phone + '</a>');
    photo.attr('src', apiurl+'photo/'+client.userid+'/'+client._id+'/photo.jpg');
    notes.val(client.notes);
}

function showDeleteConfirmation() {
    deleteModal.modal('show');
}

//----------------------------------------------------------------

						 // LOGIC

//---------------------------------------------------------------/

//----------------------------------------------------------------

						 // AJAX CALLS

//---------------------------------------------------------------/

/*******************************************
 * Delete Client -> DELETE
*******************************************/
function deleteClient() {
    var clientid = clientProfile.attr('id');

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": apiurl + "client/delete/" + userid + '/' + clientid,
        "method": "DELETE",
        "headers": {
            "cache-control": "no-cache",
            "Authorization": "Bearer " + jwt
        },
        "processData": false,
        "contentType": false,
        "statusCode": {
            200: function(req, res) {
                ClientList.clientListAJAX();
                ClientNav.closeClientProfile();
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
        populateProfile: populateProfile
    }

})(); // END OF CLIENTPROFILE.JS
