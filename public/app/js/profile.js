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
* Last Modified: June 15th 2017
* Author: Charlie Hay
*
* PROFILE PAGE JS FUNCTIONALITY.
/******************************************/

var Profile = (function() {

//----------------------------------------------------------------

						 // CACHE

//---------------------------------------------------------------/

/*******************************************
 * Global Variables
*******************************************/
var urlPhone          = getUrlPhone();
var userId;
var userName;
var userSalon;
var userPhone;
var userEmail;
var userTotalRating;
var userRawRatings;
var profilePic        = $('.profilepage .profilepic');
var nameBanner        = $('.profilepage .namebanner');
var salonBanner       = $('.profilepage .salonbanner');
var phoneBanner       = $('.profilepage .phonebanner');
var emailBanner       = $('.profilepage .emailbanner');
var totalRatingBanner = $('.profilepage .totalratingbanner');
var rawRatingsBanner = $('.profilepage .rawratingsbanner');

//----------------------------------------------------------------

						 // TEMPLATES

//---------------------------------------------------------------/


//----------------------------------------------------------------

						 // LISTENERS

//---------------------------------------------------------------/


//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/
function stylistNotFound() {
    $('main').html('<div class="stylistnotfound">Stylist Not Found!</div>');
}

function populateProfilePic() {
    profilePic.css('background', 'url("' + apiurl + 'avatar/' + userId + '") no-repeat center');
    profilePic.css('background-size', 'cover');
}

function populateNameBanner() {
    nameBanner.text(userName);
}

function populateSalonBanner() {
    salonBanner.text(userSalon);
}

function populatePhoneBanner() {
    phoneBanner.text(userPhone);
}

function populateEmailBanner() {
    emailBanner.text(userEmail);
}

function populateTotalRatingBanner() {
    totalRatingBanner.text(userTotalRating);
}

function populateRawRatingsArea() {
    rawRatingsBanner.text( JSON.stringify(userRawRatings) );
}

//----------------------------------------------------------------

						 // LOGIC

//---------------------------------------------------------------/

function assignUserGlobals(obj) {
    userId = obj._id; populateProfilePic();
    userName = obj.firstname + ' ' + obj.lastname; populateNameBanner();
    userSalon = obj.salon; populateSalonBanner();
    userPhone = obj.phone; populatePhoneBanner();
    userEmail = obj.email; populateEmailBanner();
    userTotalRating = obj.totalRating; populateTotalRatingBanner();
    userRawRatings = obj.rawRatings; populateRawRatingsArea();
}

/*******************************************
 * Verify Rating With Code
*******************************************/
function verifyUrlPhone() {

    // Rating is invalid. 
    if( urlPhone === null || urlPhone === '' ) stylistNotFound();
    
    // Rating is valid.
    else validateUrlPhone();

}

/*******************************************
 * Get Request Id From URL
*******************************************/
function getUrlPhone() {

    var url = window.location.href;
    var param = url.split('?')[1];

    if( typeof param === 'undefined' ) return null;
    
    else return param;

}

function validateUrlPhone() {
    if(urlPhone.length === 11) {
        var rawPhone = urlPhone.split('');
        rawPhone.splice(1,0,'(');
        rawPhone.splice(5,0,')');
        rawPhone.splice(9,0,'-');
        var newPhone = rawPhone.join('');
        getUserProfile(newPhone);
    }
    
    else {
        stylistNotFound()
    }

}

//----------------------------------------------------------------

						 // AJAX CALLS

//---------------------------------------------------------------/
/*******************************************
 * Check If Already Logged In -> GET
*******************************************/
function getUserProfile(phone) {

    var userProfileSettings = {
        "async": true,
        "crossDomain": true,
        "url": apiurl + "profile/" + phone ,
        "method": "GET",
        "headers": {
            "cache-control": "no-cache",
        },
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "statusCode": {
            200: function(req, res) {
                assignUserGlobals( JSON.parse(req) );
            },
            400: function(req, res) {
                stylistNotFound()
            },
            500: function(req, res) {
                stylistNotFound()
            }
        }
    }

    // Send AJAX
    $.ajax(userProfileSettings)

}

//----------------------------------------------------------------

						 // MAIN

//---------------------------------------------------------------/

/*******************************************
 * Main Function
*******************************************/
    var Main = (function() {
        verifyUrlPhone();
    })();

    return {

    }

})(); // END OF PROFILE.JS