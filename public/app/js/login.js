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
var loginFailed   = $('.failedlogin');
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
$(loginForm).submit( function(e) {
    e.preventDefault();
    disableLogin();
    loginFormAJAX();
});

//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/

/*******************************************
 * Show Failed Login Message
*******************************************/
function showFailedMessage() {
    loginFailed.css('opacity', '1');
}

/*******************************************
 * Disable Login Button
*******************************************/
function disableLogin() {
    loginButton.prop('disabled', true);
}

/*******************************************
 * Enable Login Button
*******************************************/
function enableLogin() {
    loginButton.prop('disabled', false);
}


//----------------------------------------------------------------

						 // LOGIC

//---------------------------------------------------------------/

/*******************************************
 * Login Success
*******************************************/
function loginSuccess(res) {
    $.cookie('jwt',      res.token,    { expires: 7, path: '/' });
    $.cookie('userid',   res.id,       { expires: 7, path: '/' });
    $.cookie('name',     res.name,     { expires: 7, path: '/' });
    $.cookie('phone',    res.phone,    { expires: 7, path: '/' });
    $.cookie('email',    res.email,    { expires: 7, path: '/' });
    $.cookie('salon',    res.salon,    { expires: 7, path: '/' });
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

    var loginForm = new FormData();
    loginForm.append("phone", loginPhone.val());
    loginForm.append("password", loginPassword.val());

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
        "data": loginForm,
        "statusCode": {
            200: function(req, res) {
                loginSuccess(JSON.parse(req));
            },
            400: function(req, res) {
                redirect('/learn/mistake/');
            },
            401: function(req, res) {
                enableLogin();
                showFailedMessage();
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
            400: function(req, res) {
                redirect('/learn/mistake/');
            },
            401: function(req, res) {
                // Do Nothing 
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
            checkIfAlreadyLoggedIn($.cookie('jwt')) 
        };

    })();

    return {

    }

})(); // END OF LOGIN.JS
