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
    firstname     = $('.clientprofile .firstname'),
    lastname      = $('.clientprofile .lastname'),
    email         = $('.clientprofile .email'),
    phone         = $('.clientprofile .phone'),
    photofront    = $('.clientprofile .photofront'),
    photoleft     = $('.clientprofile .photoleft'),
    photoback     = $('.clientprofile .photoback'),
    photoright    = $('.clientprofile .photoright'),
    notes         = $('.clientprofile .notes');

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