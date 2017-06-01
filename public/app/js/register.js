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
* NAVMENU TEMPLATE JS FUNCTIONALITY.
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

})(); // END OF FOOTERLINKS.JS
/*******************************************
* © 2017 Hairbrain inc.
* ---------------------
* Created: February 11th 2017
* Last Modified: March 21st 2017
* Author: Charlie Hay
*
* MOTIONGRAPHIC TEMPLATE JS FUNCTIONALITY.
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

//----------------------------------------------------------------

						 // TEMPLATES

//---------------------------------------------------------------/


//----------------------------------------------------------------

						 // LISTENERS

//---------------------------------------------------------------/

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

function setNavListeners() {
    photoInput  = $('.photowidget .photoinput');
    photoBox    = $('.photowidget .photobox');
    photoThumb  = $('.photowidget .photothumb');
    listenForUpload();
}

function detectFile() {
    photoInput.change(function(evt) {
        resizeImage(this.files[0]);
    })
}

function resizeImage(img) {

    ImageTools.resize(img, {
        width: 400, // maximum width
        height: 300 // maximum height
    }, function(blob, didItResize) {
        getPhotoDimensions(blob)
    });
}

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

})(); // END OF PHOTOWIDGET.JS
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
var registerForm   = $('.registerform'),
    firstname      = $('.registerform .firstname'),
    lastname       = $('.registerform .lastname'),
    email          = $('.registerform .avatar'),
    password       = $('.registerform .password'),
    phone          = $('.registerform .phone')
    salon          = $('.registerform .salon'),
    avatar         = $('.registerform .photoinput'),
    keyword        = $('.registerform .keyword'),
    registerBtn    = $('.registerform .submit');

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
$('.registerform input').keydown(function() {
    console.log('x');
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
    var numInputs   = $('.registerform input').length;
    var validInputs = 0; 
    $('.registerform input').each(function() {
        if ( $(this).val() !== '') {
            validInputs++;
        }
    })
    toggleSubmitBtn(validInputs, numInputs);
}

function toggleSubmitBtn(valid, total) {
    if( valid === total ) {
        registerBtn.prop('disabled', false);
        registerBtn.removeClass('disabled');
    }
    else {
        registerBtn.prop('disabled', true);
        registerBtn.addClass('disabled');
    }
}

//----------------------------------------------------------------

						 // AJAX CALLS

//---------------------------------------------------------------/

/*******************************************
 * Login Form -> POST
*******************************************/
function registerFormAJAX() {
    console.log(keyword.val());

    if(keyword.val() === 'Kanye2020') {
        var form = new FormData();
        form.append("email", email.val());
        form.append("password", password.val());
        form.append("phone", phone.val());
        form.append("salon", salon.val());
        form.append("avatar", $('.photoinput')[0].files[0], 'avatar.jpg');
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

        $.ajax(settings)
        .done(function (err, res) {
            if(res === "success") redirect('/');
            else console.log(err);
        });
    } else {
        window.location.reload();
    }
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