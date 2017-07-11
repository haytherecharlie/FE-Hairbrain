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
    photoThumb.click(function() {
        photoInput.click();
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
    detectFile();
}

/*******************************************
 * Detect File
*******************************************/
function detectFile() {
    photoInput.change(function(evt) {

        // Assign input file to imgFile.
        imgFile = this.files[0]

        // Get the URL to determine flows. 
        var url = window.location.href.split('/')[3];

        // If photoWidget on Clients page. 
        if ( url === 'clients') { getOrientation(orientImg, 150, true); }

        // If photoWidget on Register page. 
        if ( url === 'register') { getOrientation(orientImg, 200, false); }

    })
}


function getOrientation(callback, scaleSize, avatar) {

    // FileReader
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
                        orientation = view.getUint16(offset + (i * 12) + 8, little);
                        return callback(scaleSize, avatar);
                    }
                }
            }

            // Break.
            else if ((marker & 0xFF00) != 0xFF00) { break; }

            // else getUnit16(offset, false)
            else { offset += view.getUint16(offset, false); }

        }

        // Return -1 
        orientation = -1;
        return callback(scaleSize, avatar);

    };

    // Read imgFile as Array Buffer.
    reader.readAsArrayBuffer(imgFile);

}

function orientImg(scaleSize, avatar) {

    var can = document.createElement("canvas");
    var ctx = can.getContext('2d');
    var thisImage = new Image;

    thisImage.onload = function() {

        var ratio = thisImage.width / thisImage.height;

        if(orientation == 1 || typeof orentation === 'undefined') var canVals = orientationOne(scaleSize, ratio);
        if(orientation == 3) var canVals = orientationThree(scaleSize, ratio);
        if(orientation == 6) var canVals = orientationSix(scaleSize, ratio);
        if(orientation == 8) var canVals = orientationEight(scaleSize, ratio);

        can.width  = canVals.canvasW;
        can.height = canVals.canvasH;
        ctx.rotate(canVals.rotate); ctx.translate(canVals.translateX, canVals.translateY);
        ctx.save();
        ctx.drawImage(thisImage,0,0, canVals.drawImgX, canVals.drawImgY);
        ctx.restore();

        if(avatar === false) {
            resizedImage = can.toDataURL();
            showImage(resizedImage);
        }

        if(avatar === true) {
            resizedAvatar = can.toDataURL();
            orientImg(500, false);
        }

    }

    // now trigger the onload function by setting the src to your HTML5 file object (called 'file' here)
    thisImage.src = URL.createObjectURL(imgFile);
}

// No rotate / Orentation == 1.
function orientationOne(scaleSize, ratio) {
    return {
        canvasW: scaleSize * ratio,
        canvasH: scaleSize,
        drawImgX: scaleSize * ratio,
        drawImgY: scaleSize,
        rotate: 0,
        translateX: 0,
        translateY: 0
    }
}

// 90 Degrees / Orientation == 6.
function orientationSix(scaleSize, ratio) {
    return {
        canvasW: scaleSize,
        canvasH: scaleSize  * ratio,
        drawImgX: scaleSize * ratio,
        drawImgY: scaleSize,
        rotate: 90 * Math.PI/180,
        translateX: 0,
        translateY: -scaleSize
    }
}

// 180 Degrees / Orentation = 3.
function orientationThree(scaleSize, ratio) {
    return {
        canvasW: scaleSize  * ratio,
        canvasH: scaleSize,
        drawImgX: scaleSize * ratio,
        drawImgY: scaleSize,
        rotate: 180 * Math.PI/180,
        translateX: -scaleSize  * ratio,
        translateY: -scaleSize
    }
}

// 270 Degrees / orentation == 8.
function orientationEight(scaleSize, ratio) {
    return {
        canvasW: scaleSize,
        canvasH: scaleSize  * ratio,
        drawImgX: scaleSize * ratio,
        drawImgY: scaleSize,
        rotate: -90 * Math.PI/180,
        translateX: -scaleSize * ratio,
        translateY: 0
    }
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