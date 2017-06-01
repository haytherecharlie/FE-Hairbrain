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
var photoWidgetTpl = '/app/templates/photoupload.tpl.html'; 
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