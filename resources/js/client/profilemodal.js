/*******************************************
* © 2017 Hairbrain inc.
* ---------------------
* Created: February 11th 2017
* Last Modified: March 21st 2017
* Author: Charlie Hay
*
* NAV COMPONENT JS FUNCTIONALITY.
/******************************************/

var ProfileModal = (function() {

//----------------------------------------------------------------

						 // CACHE

//---------------------------------------------------------------/

/*******************************************
 * Global Variables
*******************************************/
var profilemodal = $('.profilemodal');
var profilephoto = $('.profilemodal #profilephoto');
var profilename  = $('.profilemodal #name');
var profilephone  = $('.profilemodal #phone');
var profileemail = $('.profilemodal #phone');
var profilesalon = $('.profilemodal #salon');


//----------------------------------------------------------------

						 // TEMPLATES

//---------------------------------------------------------------/

//----------------------------------------------------------------

						 // LISTENERS

//---------------------------------------------------------------/



//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/
function setPhoto() {
    profilephoto.attr('src', '');
}

function setName() {
    profilename.text(name);
}

function setPhone() {
    profilephone.text(phone);
}

function setEmail() {
    profileemail.text(email);
}
function setSalon() {
    profilesalon.text(salon);
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
    setPhoto();
    setName();
    setPhone();
    setEmail();
    setSalon();
})();

})(); // END OF NAV.JS