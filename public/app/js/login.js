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
function hamburgerClick() {
    hamburgerBtn.click(function() {
        if(navMenuContainer.hasClass('open'))
            closeMenu();
        else 
            openMenu();
    });
}

function underlayClick() {
    underlay.click(function() {
        closeMenu();
    })
}

//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/
function openMenu() {
    navMenuContainer.addClass('open');
    menu.css('display', 'block');
}

function closeMenu() {
    navMenuContainer.removeClass('open');
    menu.css('display', 'none');
}

//----------------------------------------------------------------

						 // LOGIC

//---------------------------------------------------------------/

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

})(); // END OF NAVMENU.JS
/*******************************************
* © 2017 Hairbrain inc.
* ---------------------
* Created: February 11th 2017
* Last Modified: March 21st 2017
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
var loginForm    = $('.loginform'),
    phone        = $('input[name="phone"]'),
    password     = $('input[name="password"]'),
    loginBtn     = $('button[name="submit"]'),
    loginBtnSpan = $('button[name="submit"] span'), 
    loadingGif   = $('.loading'),
    failedLogin  = $('.failedlogin');

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
function showFailedMessage() {
    failedLogin.css('opacity', '1');
}

function disableLogin() {
    loginBtn.prop('disabled', true);
}

function enableLogin() {
    loginBtn.prop('disabled', false);
}

//----------------------------------------------------------------

						 // LOGIC

//---------------------------------------------------------------/

/*******************************************
 * Login Success
*******************************************/
function loginSuccess(res) {
    $.cookie('jwt',    res.token, { expires: 7, path: '/' });
    $.cookie('userid', res.id,    { expires: 7, path: '/' });
    $.cookie('name',   res.name,  { expires: 7, path: '/' });
    $.cookie('phone',  res.phone, { expires: 7, path: '/' });
    $.cookie('email',  res.email, { expires: 7, path: '/' });
    $.cookie('salon',  res.salon, { expires: 7, path: '/' });
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
    form.append("phone", phone.val());
    form.append("password", password.val());

    var settings = {
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
        "data": form
    }

    $.ajax(settings)
    .done(function (req, res) {
        if(res === "success") { 
            loginSuccess(JSON.parse(req));
        }
    })
    .fail( function(err) {
        enableLogin();
        showFailedMessage();
    })

}

/*******************************************
 * Check If Already Logged In -> GET
*******************************************/
function checkIfAlreadyLoggedIn(jwt) {

    var settings = {
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
        "mimeType": "multipart/form-data"
    }

    $.ajax(settings)
    .done(function (req, res) {
        if(res === "success") 
            redirect(/clients/);
    })
}

//----------------------------------------------------------------

						 // MAIN

//---------------------------------------------------------------/

/*******************************************
 * Main Function
*******************************************/
(function() {
    if($.cookie('jwt')) {
        checkIfAlreadyLoggedIn($.cookie('jwt'));
    }
})();

})(); // END OF LOGIN.JS
/*******************************************
* © 2017 Hairbrain inc.
* ---------------------
* Created: February 11th 2017
* Last Modified: March 21st 2017
* Author: Charlie Hay
*
* REGISTER PAGE JS FUNCTIONALITY.
/******************************************/

var Register = (function() {

//----------------------------------------------------------------

						 // CACHE

//---------------------------------------------------------------/

/*******************************************
 * Global Variables
*******************************************/
var registerForm   = $('.register-form'),
    firstname      = $('.register-form input[name="firstname"]'),
    lastname       = $('.register-form input[name="lastname"]'),
    email          = $('.register-form input[name="email"]'),
    password       = $('.register-form input[name="password"]'),
    phone          = $('.register-form input[name="phone"]')
    salon          = $('.register-form input[name="salon"]'),
    avatar         = $('.register-form input[name="avatar"]'),
    registerInputs = $('.register-form input'),
    registerBtn    = $('.confirmregister');

//----------------------------------------------------------------

						 // TEMPLATES

//---------------------------------------------------------------/


//----------------------------------------------------------------

						 // LISTENERS

//---------------------------------------------------------------/

/*******************************************
 * Submit Form
*******************************************/
registerBtn.click( function(e) {
    registerFormAJAX();
});

// Listens for change on each input. NOTE:Doesn't listen to textarea.
registerInputs.not('input[type="button"]').change(function() {
    countValidInputs();
});

//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/



//----------------------------------------------------------------

						 // LOGIC

//---------------------------------------------------------------/
function initialize() {
    var input = document.getElementById('salon');
    var autocomplete = new google.maps.places.Autocomplete(input);
}

function countValidInputs() {
    var numInputs   = registerInputs.length;
    var validInputs = 0; 
    registerInputs.each(function() {
        if ( $(this).val() !== '') {
            validInputs++;
        }
    })
    toggleSubmitBtn(validInputs, numInputs);
}

function toggleSubmitBtn(valid, total) {
    if( valid === total )
        registerBtn.prop('disabled', false);
    else 
        registerBtn.prop('disabled', true);
}

//----------------------------------------------------------------

						 // AJAX CALLS

//---------------------------------------------------------------/

/*******************************************
 * Login Form -> POST
*******************************************/
function registerFormAJAX() {
    var form = new FormData();
    form.append("email", email.val());
    form.append("password", password.val());
    form.append("phone", phone.val());
    form.append("salon", salon.val());
    form.append("avatar", avatar[0].files[0], 'avatar.jpg');
    form.append("firstname", firstname.val());
    form.append("lastname", lastname.val());

    var settings = {
    "async": true,
    "crossDomain": true,
    "url": apiurl + "register",
    "method": "POST",
    "headers": {
        "cache-control": "no-cache",
    },
    "processData": false,
    "contentType": false,
    "mimeType": "multipart/form-data",
    "data": form
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}

//----------------------------------------------------------------

						 // MAIN

//---------------------------------------------------------------/

/*******************************************
 * Main Function
*******************************************/
    google.maps.event.addDomListener(window, 'load', initialize);
    countValidInputs();
})(); // END OF REGISTER.JS
// http://stackoverflow.com/questions/23945494/use-html5-to-resize-an-image-before-upload
// Answer # 69 is the reference you wanna check ;)

(function() {
	
	var PhotoUpload = {

		$src: '',
		$dest: '',

		photoListeners: function() {
			$('.thumbnail').each(function() {

			    $(this).click( function() {

			        var id = $(this).attr('id');
			            PhotoUpload.$src = $('#' + id);
			            PhotoUpload.$dest = $('#select-' + id);
			        
			        PhotoUpload.$dest.click();

			        PhotoUpload.photoUploaded();

			    })
			})
		},

		photoUploaded: function() {

		    PhotoUpload.$dest.change(function(evt) {

		        PhotoUpload.resizeImage(this.files[0])

		    });
		},

		resizeImage: function(img) {

		    ImageTools.resize(img, {

		        width: 320, // maximum width
		        height: 440 // maximum height

		    }, function(blob, didItResize) {

		        PhotoUpload.getPhotoDimensions(blob);

		    });
		},

		getPhotoDimensions: function(blob) {

		    var fr = new FileReader;
		    
		    fr.onload = function() {
		        
		        var img = new Image;
		        
		        img.onload = function() {
		            PhotoUpload.rotatePhoto(img, blob);
		        };

		        img.src = fr.result;
		    };
		    
		    fr.readAsDataURL(blob);
		},

		rotatePhoto: function(img, blob) {

		    if (img.height < img.width) {

		        PhotoUpload.$src.removeClass('default');
		        PhotoUpload.$src.addClass('rotate');

		    } else {

		        PhotoUpload.$src.removeClass('rotate');
		        PhotoUpload.$src.addClass('default');

		    }

		    PhotoUpload.$src.css('background', 'url(' + img.src + ') no-repeat center' );
		    PhotoUpload.$src.css('background-size', 'cover');

            console.log(img.src);
		}
	};

	PhotoUpload.photoListeners();

})()