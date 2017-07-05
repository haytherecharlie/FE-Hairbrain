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