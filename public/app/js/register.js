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
* Last Modified: March 21st 2017
* Author: Charlie Hay
*
* FOOTERLINKS TEMPLATE JS FUNCTIONALITY.
/******************************************/

var FooterLinks = (function() {

//----------------------------------------------------------------

						 // CACHE

//---------------------------------------------------------------/

/*******************************************
 * Global Variables
*******************************************/
var footerLinksTplPath   = '/templates/footerlinks.tpl.html';
var footerLinksContainer = $('footer.footerlinks'); 

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
    $('.group').each(function() {
        $(this).click(function() {
            expandCollapse(this);
        })
    })
}

//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/


//----------------------------------------------------------------

						 // LOGIC

//---------------------------------------------------------------/

/*******************************************
 * Expand and Collapse Footer
*******************************************/
function expandCollapse(obj) {
    if( $(obj).find('a').css('display') === 'none') {
       $(obj).find('a').css('display', 'block'); 
    } else {
        $(obj).find('a').css('display', 'none'); 
    }
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
        if(footerLinksContainer) {
            footerLinksContainer.load(footerLinksTplPath, function() {
                addListeners();
            });
        }

    })();

    return {
        
    }

})(); // END OF FOOTERLINKS.JS
/*******************************************
* © 2017 Hairbrain inc.
* ---------------------
* Created: February 11th 2017
* Last Modified: March 21st 2017
* Author: Charlie Hay
*
* PHOTOUPLOAD TEMPLATE JS FUNCTIONALITY.
/******************************************/

var PhotoUpload = (function() {

//----------------------------------------------------------------

						 // CACHE

//---------------------------------------------------------------/

/*******************************************
 * Global Variables
*******************************************/
var photoWidget    = $('.photowidget');
var photoWidgetTpl = '/templates/photoupload.tpl.html'; 
var photoInput;
var photoBox;
var photoThumb;
var resizedImage;


//----------------------------------------------------------------

						 // TEMPLATES

//---------------------------------------------------------------/


//----------------------------------------------------------------

						 // LISTENERS

//---------------------------------------------------------------/

/*******************************************
 * Listen for Photo Upload
*******************************************/
function listenForUpload() {
    photoThumb.click(function() {
        photoInput.click();
        detectFile();
    })
}

//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/


//----------------------------------------------------------------

						 // LOGIC

//---------------------------------------------------------------/

/*******************************************
 * Set Listeners
*******************************************/
function setNavListeners() {
    photoInput  = $('.photowidget .photoinput');
    photoBox    = $('.photowidget .photobox');
    photoThumb  = $('.photowidget .photothumb');
    listenForUpload();
}

/*******************************************
 * Detect File
*******************************************/
function detectFile() {
    photoInput.change(function(evt) {
        resizeImage(this.files[0]);
    })
}

/*******************************************
 * Resize Photo - Using Resize.js
*******************************************/
function resizeImage(img) {

    // Get the URL to determine flows. 
    var url = window.location.href.split('/')[3];
    
    // If on the clients page...
    // THIS NEEDS FINISHING!!!!!!!
    
    if(url === 'clients') {
    
        var avatar = img;
        var photo  = img;

        ImageTools.resize(avatar, {
            width: 400, // maximum width
            height: 300 // maximum height
        }, function(blob, didItResize) {
            getPhotoDimensions(blob)
        });

    }
}

/*******************************************
 * Get Photo Dimensions
*******************************************/
function getPhotoDimensions(blob) {
		    
        var fr = new FileReader;
        fr.onload = function() {
            var img = new Image;
            img.onload = function() {
                showPhoto(img, blob);
            };
            img.src = fr.result;
        };
        fr.readAsDataURL(blob);
}

/*******************************************
 * Show Photo
*******************************************/
function showPhoto(img, blob) {

    if (img.height < img.width) {
        photoThumb.removeClass('default');
        photoThumb.addClass('rotate');
    } else {
        photoThumb.removeClass('rotate');
        photoThumb.addClass('default');
    }

    photoThumb.css('background', 'url(' + img.src + ') no-repeat center' );
    photoThumb.css('background-size', 'cover');

    var file = new File([blob], 'photo.jpg', {type: 'image/jpeg', lastModified: Date.now()});

    resizedImage = file;
}

/*******************************************
 * Get Resized Image : Globally Exposed
*******************************************/
function getResizedImage() {
    return resizedImage;
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

        // If PhotoWidget container exists fill it with nav. 
        if(photoWidget) {
            photoWidget.load(photoWidgetTpl, function() {
                setNavListeners();
            });
        }

    })();

    return {
        getResizedImage: getResizedImage
    }

})(); // END OF PHOTOUPLOAD.JS
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
var registerForm   = $('.registerpage .registerform');
var firstname      = $('.registerpage .registerform .firstname');
var lastname       = $('.registerpage .registerform .lastname');
var email          = $('.registerpage .registerform .email');
var password       = $('.registerpage .registerform .password');
var phone          = $('.registerpage .registerform .phone');
var salon          = $('.registerpage .registerform .salon');
var avatar         = $('.registerpage .registerform .photoinput');
var keyword        = $('.registerpage .registerform .keyword');
var registerBtn    = $('.registerpage .registerform .submit');
var successModal   = $('.registerpage .successmodal');
var successLogin   = $('.registerpage .login');

//----------------------------------------------------------------

						 // TEMPLATES

//---------------------------------------------------------------/


//----------------------------------------------------------------

						 // LISTENERS

//---------------------------------------------------------------/

/*******************************************
 * On Click Register Button
*******************************************/
registerBtn.click( function() {
    registerFormAJAX();
});

/*******************************************
 * On Click Go To Login Page
*******************************************/
successLogin.click(function() {
    location.href = location.origin;
})

//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/



//----------------------------------------------------------------

						 // LOGIC

//---------------------------------------------------------------/
/*******************************************
 * Initialize Google Places
*******************************************/
function initialize() {
    var input = document.getElementById('salon');
    var autocomplete = new google.maps.places.Autocomplete(input);
}

//----------------------------------------------------------------

						 // AJAX CALLS

//---------------------------------------------------------------/

/*******************************************
 * Login Form -> POST
*******************************************/
function registerFormAJAX() {

    if(keyword.val() === 'Kanye2020') {
        var form = new FormData();
        form.append("avatar", $('.photoinput')[0].files[0], 'avatar.jpg');        
        form.append("firstname", firstname.val());
        form.append("lastname", lastname.val());
        form.append("phone", phone.val());
        form.append("password", password.val());        
        form.append("email", email.val());
        form.append("salon", salon.val());

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
            "data": form,
            "statusCode": {
                200: function(req, res) {
                    successModal.modal('show');
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

        // AJAX SETTINGS
        $.ajax(settings)
    } 
    
    //
    else {
        ErrorModal.populateMessage('Beta keyword incorrect.');
    }
}

//----------------------------------------------------------------

						 // MAIN

//---------------------------------------------------------------/

/*******************************************
 * Main Function
*******************************************/
    var Main = (function() {
        google.maps.event.addDomListener(window, 'load', initialize);
    })();

    return {

    }

})(); // END OF REGISTER.JS
