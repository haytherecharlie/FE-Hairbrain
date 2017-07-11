/*******************************************
* © 2017 Hairbrain inc.
* ---------------------
* Created: February 11th 2017
* Last Modified: March 21st 2017
* Author: Charlie Hay
*
* NAVMENU TEMPLATE JS FUNCTIONALITY.
/******************************************/

var NavMenu = (function() {

//----------------------------------------------------------------

						 // CACHE

//---------------------------------------------------------------/

/*******************************************
 * Global Variables
*******************************************/
var navMenuTplPath   = '/templates/navmenu.tpl.html';
var navMenuContainer = $('header.navmenu'); 
var hamburgerBtn;
var menu;

//----------------------------------------------------------------

						 // TEMPLATES

//---------------------------------------------------------------/


//----------------------------------------------------------------

						 // LISTENERS

//---------------------------------------------------------------/

/*******************************************
 * On Click of Hamburger
*******************************************/
function hamburgerClick() {
    hamburgerBtn.click(function() {
        if(navMenuContainer.hasClass('open'))
            closeMenu();
        else 
            openMenu();
    });
}

/*******************************************
 * On Click of Underlay
*******************************************/
function underlayClick() {
    underlay.click(function() {
        closeMenu();
    })
}

//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/

/*******************************************
 * Open Menu
*******************************************/
function openMenu() {
    navMenuContainer.addClass('open');
    menu.css('display', 'block');
}

/*******************************************
 * Close Menu
*******************************************/
function closeMenu() {
    navMenuContainer.removeClass('open');
    menu.css('display', 'none');
}

//----------------------------------------------------------------

						 // LOGIC

//---------------------------------------------------------------/

/*******************************************
 * Set Nav Listeners When Able
*******************************************/
function setNavListeners() {
    menu         = $('menu');
    hamburgerBtn = $('button.hamburger');
    underlay     = $('menu .underlay');
    hamburgerClick();
    underlayClick();
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
    var Main = (function() {
        
        // If Nav container exists fill it with nav. 
        if(navMenuContainer) {
            navMenuContainer.load(navMenuTplPath, function() {
                setNavListeners();
            });
        }

    })();

    return {
        
    }

})(); // END OF NAVMENU.JS
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
/*******************************************
* © 2017 Hairbrain inc.
* ---------------------
* Created: February 11th 2017
* Last Modified: June 6th 2017
* Author: Charlie Hay
*
* LOGIN PAGE JS FUNCTIONALITY.
/******************************************/

var Login = (function() {

//----------------------------------------------------------------

						 // CACHE

//---------------------------------------------------------------/

/*******************************************
 * Global Variables
*******************************************/
var loginForm     = $('.loginform');
var loginPhone    = $('.loginphone');
var loginPassword = $('.loginpassword');
var loginFailed   = $('.loginfailed');
var loginButton   = $('.loginbutton');


//----------------------------------------------------------------

						 // TEMPLATES

//---------------------------------------------------------------/


//----------------------------------------------------------------

						 // LISTENERS

//---------------------------------------------------------------/

/*******************************************
 * Submit Form
*******************************************/
loginForm.submit( function(e) {
    e.preventDefault();
    loginFormAJAX();
});

//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/


//----------------------------------------------------------------

						 // LOGIC

//---------------------------------------------------------------/

/*******************************************
 * Login Success
*******************************************/
function loginSuccess(res) {

    var user = {
        id: res.id,
        name: res.name,
        phone: res.phone,
        email: res.email,
        salon: res.salon, 
        avatar: res.avatar
    }

    // Set the user in Session Storage.
    sessionStorage.setItem('user', JSON.stringify(user));

    // Set the JWT in the Session Storage.
    $.cookie('jwt', res.token, { expires: 7, path: '/' });

    // Redirect 
    redirect(/clients/);
}

/*******************************************
 * Redirect Page -> URL
*******************************************/
function redirect(path) {
    window.location.href = window.location.origin + path; 
}

//----------------------------------------------------------------

						 // AJAX CALLS

//---------------------------------------------------------------/

/*******************************************
 * Login Form -> POST
*******************************************/
function loginFormAJAX() {

    var form = new FormData();
    form.append("phone", loginPhone.val());
    form.append("password", loginPassword.val());

    var loginSettings = {
        "async": true,
        "crossDomain": true,
        "url": apiurl + "login",
        "method": "POST",
        "headers": {
            "cache-control": "no-cache"
        },
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form,
        "statusCode": {
            200: function(req, res) {
                loginSuccess(JSON.parse(req));
            },
            400: function(req, res) {
                ErrorModal.populateMessage(req.responseText);
            },
            401: function(req, res) {
                ErrorModal.populateMessage(req.responseText);
            },
            500: function(req, res) {
                ErrorModal.populateMessage('Hairbrain isn\'t working right now. Please try again later.');
            }
        }
    }

    // Send AJAX
    $.ajax(loginSettings)

}

/*******************************************
 * Check If Already Logged In -> GET
*******************************************/
function checkIfAlreadyLoggedIn(jwt) {

    var loginCheckSettings = {
        "async": true,
        "crossDomain": true,
        "url": apiurl + "check",
        "method": "GET",
        "headers": {
            "cache-control": "no-cache",
            "Authorization": "Bearer " + jwt
        },
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "statusCode": {
            200: function(req, res) {
                redirect(/clients/);
            },
            401: function(req, res) {
                // Do Nothing 
            }, 
            500: function(req, res) {
                ErrorModal.populateMessage('Hairbrain isn\'t working right now. Please try again later.');
            }
        }
    }

    // Send AJAX
    $.ajax(loginCheckSettings)

}


//----------------------------------------------------------------

						 // MAIN

//---------------------------------------------------------------/

/*******************************************
 * Main Function
*******************************************/
    var Main = (function() {

        // If JWT exists, try auto login.
        if ($.cookie('jwt')) { 
            checkIfAlreadyLoggedIn($.cookie('jwt'));
        }

    })();

    return {

    }

})(); // END OF LOGIN.JS
