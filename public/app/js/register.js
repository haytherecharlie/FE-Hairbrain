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
var resizedAvatar;
var orientation;
var imgFile;


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
    photoBox.click(function() {
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
    photoThumb  = $('.photobox img');
    listenForUpload();
}

/*******************************************
 * Detect File
*******************************************/
function detectFile() {
    photoInput.change(function(evt) {
        imgFile = this.files[0]

        // Get the URL to determine flows. 
        var url = window.location.href.split('/')[3];

        if(url === 'clients') { getOrientation(uprightImg, 500, true); }

        if(url === 'register') { getOrientation(uprightImg, 200, false); }

    })
}


function getOrientation(callback, scaleSize, avatar) {

    // Create new FileReader
    var reader = new FileReader();

    // Onload of reader
    reader.onload = function(e) {

        // Create DataView
        var view = new DataView(e.target.result);

        // Return -2 for base case.
        if (view.getUint16(0, false) != 0xFFD8) {
            orientation = -2;
            return callback(scaleSize, avatar);
        }

        // While offset < length
        var length = view.byteLength, offset = 2;
        while (offset < length) {

            // Increment by 2 on marker
            var marker = view.getUint16(offset, false);
            offset += 2;

            // If markert == 0xFFE1
            if (marker == 0xFFE1) {

                // Return -1 
                if (view.getUint32(offset += 2, false) != 0x45786966) {
                    orientation = -1;
                    return callback(scaleSize, avatar);
                }

                // Check offset
                var little = view.getUint16(offset += 6, false) == 0x4949;
                offset += view.getUint32(offset + 4, little);
                var tags = view.getUint16(offset, little);
                offset += 2;

                // Run tags
                for (var i = 0; i < tags; i++){

                    // If orientation data is present return orientation.
                    if (view.getUint16(offset + (i * 12), little) == 0x0112){
                        orientation = view.getUint16(offset + (i * 12) + 8, little)
                        return callback(scaleSize, avatar);
                    }
                }
            }

            // Break.
            else if ((marker & 0xFF00) != 0xFF00) { 
                break;
            }

            // else getUnit16(offset, false)
            else { 
                offset += view.getUint16(offset, false);
            }

        }

        // Return -1 
        orientation = -1;
        return callback(scaleSize, avatar);

    };

    // Read imgFile as Array Buffer.
    reader.readAsArrayBuffer(imgFile);

}

function uprightImg(scaleSize, avatar) {
  
  var can = document.createElement("canvas");
  var ctx = can.getContext('2d');
  var thisImage = new Image;

  thisImage.onload = function() {

    var ratio  = thisImage.width / thisImage.height;
    var width  = thisImage.height * ratio;
    var height = thisImage.width / ratio; 

    can.height = scaleSize;
    can.width  = can.height * ratio;
    ctx.save();
    var styleWidth  = can.style.width;
    var styleHeight = can.style.height;

    if (orientation) {
      if (orientation > 4) {
        can.width  = height; can.style.width  = styleHeight;
        can.height = width;  can.style.height = styleWidth;
      }
      switch (orientation) {
      case 2: ctx.translate(width, 0);     ctx.scale(-1,1); break;
      case 3: ctx.translate(width,height); ctx.rotate(Math.PI); break;
      case 4: ctx.translate(0,height);     ctx.scale(1,-1); break;
      case 5: ctx.rotate(0.5 * Math.PI);   ctx.scale(1,-1); break;
      case 6: ctx.rotate(0.5 * Math.PI);   ctx.translate(0,-height); break;
      case 7: ctx.rotate(0.5 * Math.PI);   ctx.translate(width,-height); ctx.scale(-1,1); break;
      case 8: ctx.rotate(-0.5 * Math.PI);  ctx.translate(-width,0); break;
      }
    }

    ctx.drawImage(thisImage,0,0, can.width, can.height);
    ctx.restore();
    var dataURL = can.toDataURL();

    resizedImage  = dataURL;

    showImage(resizedImage);

    if(avatar === true) {
        scaleAvatar(150);
    }

  }

  // now trigger the onload function by setting the src to your HTML5 file object (called 'file' here)
  thisImage.src = URL.createObjectURL(imgFile);

}

function scaleAvatar(scaleSize) {
  
  var can = document.createElement("canvas");
  var ctx = can.getContext('2d');
  var thisImage = new Image;

  thisImage.onload = function() {

    var ratio  = thisImage.width / thisImage.height;
    var width  = thisImage.height * ratio;
    var height = thisImage.width / ratio; 

    can.height = scaleSize;
    can.width  = can.height * ratio;
    ctx.save();
    var width  = can.width;  var styleWidth  = can.style.width;
    var height = can.height; var styleHeight = can.style.height;

    if (orientation) {
      if (orientation > 4) {
        can.width  = height; can.style.width  = styleHeight;
        can.height = width;  can.style.height = styleWidth;
      }
      switch (orientation) {
      case 2: ctx.translate(width, 0);     ctx.scale(-1,1); break;
      case 3: ctx.translate(width,height); ctx.rotate(Math.PI); break;
      case 4: ctx.translate(0,height);     ctx.scale(1,-1); break;
      case 5: ctx.rotate(0.5 * Math.PI);   ctx.scale(1,-1); break;
      case 6: ctx.rotate(0.5 * Math.PI);   ctx.translate(0,-height); break;
      case 7: ctx.rotate(0.5 * Math.PI);   ctx.translate(width,-height); ctx.scale(-1,1); break;
      case 8: ctx.rotate(-0.5 * Math.PI);  ctx.translate(-width,0); break;
      }
    }

    ctx.drawImage(thisImage,0,0, can.width, can.height);
    ctx.restore();
    var dataURL = can.toDataURL();

    resizedAvatar  = dataURL;

  }

  // now trigger the onload function by setting the src to your HTML5 file object (called 'file' here)
  thisImage.src = URL.createObjectURL(imgFile);

}


function showImage(dataURL) {
    photoThumb.attr('src', dataURL);
}


/*******************************************
 * Get Resized Image : Globally Exposed
*******************************************/
function getResizedImage() {
    return resizedImage;
}

function getResizedAvatar() {
    return resizedAvatar;
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
        getResizedImage: getResizedImage,
        getResizedAvatar: getResizedAvatar,
        showImage: showImage
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
var continueBtn    = $('.registerpage .registerform .next');
var backBtn        = $('.registerpage .registerform .back');
var registerBtn    = $('.registerpage .registerform .submit');
var sliderBox      = $('.registerpage .registerform .sliderbox');
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
    location.href = location.origin + '/login/';
})

continueBtn.click(function() {
    var distance = -(sliderBox.width()/2 - 20);
    sliderBox.animate({
        'left': distance
    }, 500);
});

backBtn.click(function() {
    sliderBox.animate({
        'left': 20
    }, 500);
});

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
        form.append("avatar", PhotoUpload.getResizedImage());       
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
