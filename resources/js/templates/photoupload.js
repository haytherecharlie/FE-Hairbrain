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
var metaData;
var tags = [
    "ExifVersion",             // EXIF version
    "FlashpixVersion",         // Flashpix format version
    "ColorSpace",              // Color space information tag
    "PixelXDimension",         // Valid width of meaningful image
    "PixelYDimension",         // Valid height of meaningful image
    "ComponentsConfiguration", // Information about channels
    "CompressedBitsPerPixel",  // Compressed bits per pixel
    "UserComment",             // Comments by user
    "RelatedSoundFile",        // Name of related sound file
    "DateTimeOriginal",        // Date and time when the original image was generated
    "DateTimeDigitized",       // Date and time when the image was stored digitally
    "SubsecTime",              // Fractions of seconds for DateTime
    "SubsecTimeOriginal",      // Fractions of seconds for DateTimeOriginal
    "SubsecTimeDigitized",     // Fractions of seconds for DateTimeDigitized
    "ExposureTime",            // Exposure time (in seconds)
    "FNumber",                 // F number
    "ExposureProgram",         // Exposure program
    "SpectralSensitivity",     // Spectral sensitivity
    "ISOSpeedRatings",         // ISO speed rating
    "OECF",                    // Optoelectric conversion factor
    "ShutterSpeedValue",       // Shutter speed
    "ApertureValue",           // Lens aperture
    "BrightnessValue",         // Value of brightness
    "ExposureBias",            // Exposure bias
    "MaxApertureValue",        // Smallest F number of lens
    "SubjectDistance",         // Distance to subject in meters
    "MeteringMode",            // Metering mode
    "LightSource",             // Kind of light source
    "Flash",                   // Flash status
    "SubjectArea",             // Location and area of main subject
    "FocalLength",             // Focal length of the lens in mm
    "FlashEnergy",             // Strobe energy in BCPS
    "SpatialFrequencyResponse",
    "FocalPlaneXResolution",   // Number of pixels in width direction per FocalPlaneResolutionUnit
    "FocalPlaneYResolution",   // Number of pixels in height direction per FocalPlaneResolutionUnit
    "FocalPlaneResolutionUnit",// Unit for measuring FocalPlaneXResolution and FocalPlaneYResolution
    "SubjectLocation",         // Location of subject in image
    "ExposureIndex",           // Exposure index selected on camera
    "SensingMethod",           // Image sensor type
    "FileSource",              // Image source (3 == DSC)
    "SceneType",               // Scene type (1 == directly photographed)
    "CFAPattern",              // Color filter array geometric pattern
    "CustomRendered",          // Special processing
    "ExposureMode",            // Exposure mode
    "WhiteBalance",            // 1 = auto white balance, 2 = manual
    "DigitalZoomRation",       // Digital zoom ratio
    "FocalLengthIn35mmFilm",   // Equivalent foacl length assuming 35mm film camera (in mm)
    "SceneCaptureType",        // Type of scene
    "GainControl",             // Degree of overall image gain adjustment
    "Contrast",                // Direction of contrast processing applied by camera
    "Saturation",              // Direction of saturation processing applied by camera
    "Sharpness",               // Direction of sharpness processing applied by camera
    "DeviceSettingDescription",    //
    "SubjectDistanceRange",    // Distance to subject
    "InteroperabilityIFDPointer",
    "ImageUniqueID",            // Identifier assigned uniquely to each image
    "ImageWidth",
    "ImageHeight",
    "ExifIFDPointer",
    "GPSInfoIFDPointer",
    "InteroperabilityIFDPointer",
    "BitsPerSample",
    "Compression",
    "PhotometricInterpretation",
    "Orientation",
    "SamplesPerPixel",
    "PlanarConfiguration",
    "YCbCrSubSampling",
    "YCbCrPositioning",
    "XResolution",
    "YResolution",
    "ResolutionUnit",
    "StripOffsets",
    "RowsPerStrip",
    "StripByteCounts",
    "JPEGInterchangeFormat",
    "JPEGInterchangeFormatLength",
    "TransferFunction",
    "WhitePoint",
    "PrimaryChromaticities",
    "YCbCrCoefficients",
    "ReferenceBlackWhite",
    "DateTime",
    "ImageDescription",
    "Make",
    "Model",
    "Software",
    "Artist",
    "Copyright",
    "GPSVersionID",
    "GPSLatitudeRef",
    "GPSLatitude",
    "GPSLongitudeRef",
    "GPSLongitude",
    "GPSAltitudeRef",
    "GPSAltitude",
    "GPSTimeStamp",
    "GPSSatellites",
    "GPSStatus",
    "GPSMeasureMode",
    "GPSDOP",
    "GPSSpeedRef",
    "GPSSpeed",
    "GPSTrackRef",
    "GPSTrack",
    "GPSImgDirectionRef",
    "GPSImgDirection",
    "GPSMapDatum",
    "GPSDestLatitudeRef",
    "GPSDestLatitude",
    "GPSDestLongitudeRef",
    "GPSDestLongitude",
    "GPSDestBearingRef",
    "GPSDestBearing",
    "GPSDestDistanceRef",
    "GPSDestDistance",
    "GPSProcessingMethod",
    "GPSAreaInformation",
    "GPSDateStamp",
    "GPSDifferential"
];

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
        if ( url === 'clients') { 
            getOrientation(orientImg, 150, true); 
        }

        // If photoWidget on Register page. 
        if ( url === 'register') { 
            getOrientation(orientImg, 200, false); 
        }

    })
}

function getExifData() {

    EXIF.getData(imgFile, function() {
        
        var exifStore = {};

        for(var i in tags) {
        
            var keys   = tags[i];
            var values = EXIF.getTag(imgFile, keys);

            if(typeof values !== 'undefined') {

                exifStore[keys] = values;

            }

            else {

                exifStore[keys] = 'undefined';

            }
        }

        // YOU NOW HAVE THE DATA! SEND IT TO THE BACKEND WITH THE REQUEST AND STORE IN AN OBJECT FIELD!!!!
        return (JSON.stringify(exifStore, undefined, 2));

    });
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

    // Get and Set Meta Data.
    metaData = getExifData();
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
    var x = resizedImage;
    resizedImage = undefined;
    return x;
}

function getResizedAvatar() {
    var y = resizedAvatar;
    resizedAvatar = undefined;
    return y;
}

function getMetaData() {
    var z = metaData;
    metaData = undefined;
    return z;
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
        showImage: showImage,
        getMetaData: getMetaData
    }

})(); // END OF PHOTOUPLOAD.JS