/*******************************************
* © 2017 Hairbrain inc.
* ---------------------
* Created: February 11th 2017
* Last Modified: March 21st 2017
* Author: Charlie Hay
*
* BASE JS FUNCTIONALITY.
/******************************************/

var userid      = decodeURI($.cookie('userid')),
    jwt         = decodeURI($.cookie('jwt')),
    name        = decodeURI($.cookie('name')),
    phone       = decodeURI($.cookie('phone')),
    email       = decodeURI($.cookie('email')),
    salon       = decodeURI($.cookie('salon')),
    apiurl      = 'http://api.hairbrain.ca/';

function cookieCheck() {
    if(!userid || !jwt) {
        window.location.href = window.location.origin + '/';
        return false;
    }
}
