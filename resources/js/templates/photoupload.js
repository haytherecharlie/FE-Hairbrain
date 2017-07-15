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
var tags = {

    // version tags
    0x9000 : "ExifVersion",             // EXIF version
    0xA000 : "FlashpixVersion",         // Flashpix format version

    // colorspace tags
    0xA001 : "ColorSpace",              // Color space information tag

    // image configuration
    0xA002 : "PixelXDimension",         // Valid width of meaningful image
    0xA003 : "PixelYDimension",         // Valid height of meaningful image
    0x9101 : "ComponentsConfiguration", // Information about channels
    0x9102 : "CompressedBitsPerPixel",  // Compressed bits per pixel

    // user information
    0x927C : "MakerNote",               // Any desired information written by the manufacturer
    0x9286 : "UserComment",             // Comments by user

    // related file
    0xA004 : "RelatedSoundFile",        // Name of related sound file

    // date and time
    0x9003 : "DateTimeOriginal",        // Date and time when the original image was generated
    0x9004 : "DateTimeDigitized",       // Date and time when the image was stored digitally
    0x9290 : "SubsecTime",              // Fractions of seconds for DateTime
    0x9291 : "SubsecTimeOriginal",      // Fractions of seconds for DateTimeOriginal
    0x9292 : "SubsecTimeDigitized",     // Fractions of seconds for DateTimeDigitized

    // picture-taking conditions
    0x829A : "ExposureTime",            // Exposure time (in seconds)
    0x829D : "FNumber",                 // F number
    0x8822 : "ExposureProgram",         // Exposure program
    0x8824 : "SpectralSensitivity",     // Spectral sensitivity
    0x8827 : "ISOSpeedRatings",         // ISO speed rating
    0x8828 : "OECF",                    // Optoelectric conversion factor
    0x9201 : "ShutterSpeedValue",       // Shutter speed
    0x9202 : "ApertureValue",           // Lens aperture
    0x9203 : "BrightnessValue",         // Value of brightness
    0x9204 : "ExposureBias",            // Exposure bias
    0x9205 : "MaxApertureValue",        // Smallest F number of lens
    0x9206 : "SubjectDistance",         // Distance to subject in meters
    0x9207 : "MeteringMode",            // Metering mode
    0x9208 : "LightSource",             // Kind of light source
    0x9209 : "Flash",                   // Flash status
    0x9214 : "SubjectArea",             // Location and area of main subject
    0x920A : "FocalLength",             // Focal length of the lens in mm
    0xA20B : "FlashEnergy",             // Strobe energy in BCPS
    0xA20C : "SpatialFrequencyResponse",    //
    0xA20E : "FocalPlaneXResolution",   // Number of pixels in width direction per FocalPlaneResolutionUnit
    0xA20F : "FocalPlaneYResolution",   // Number of pixels in height direction per FocalPlaneResolutionUnit
    0xA210 : "FocalPlaneResolutionUnit",    // Unit for measuring FocalPlaneXResolution and FocalPlaneYResolution
    0xA214 : "SubjectLocation",         // Location of subject in image
    0xA215 : "ExposureIndex",           // Exposure index selected on camera
    0xA217 : "SensingMethod",           // Image sensor type
    0xA300 : "FileSource",              // Image source (3 == DSC)
    0xA301 : "SceneType",               // Scene type (1 == directly photographed)
    0xA302 : "CFAPattern",              // Color filter array geometric pattern
    0xA401 : "CustomRendered",          // Special processing
    0xA402 : "ExposureMode",            // Exposure mode
    0xA403 : "WhiteBalance",            // 1 = auto white balance, 2 = manual
    0xA404 : "DigitalZoomRation",       // Digital zoom ratio
    0xA405 : "FocalLengthIn35mmFilm",   // Equivalent foacl length assuming 35mm film camera (in mm)
    0xA406 : "SceneCaptureType",        // Type of scene
    0xA407 : "GainControl",             // Degree of overall image gain adjustment
    0xA408 : "Contrast",                // Direction of contrast processing applied by camera
    0xA409 : "Saturation",              // Direction of saturation processing applied by camera
    0xA40A : "Sharpness",               // Direction of sharpness processing applied by camera
    0xA40B : "DeviceSettingDescription",    //
    0xA40C : "SubjectDistanceRange",    // Distance to subject

    // other tags
    0xA005 : "InteroperabilityIFDPointer",
    0xA420 : "ImageUniqueID",            // Identifier assigned uniquely to each image

    0x0100 : "ImageWidth",
    0x0101 : "ImageHeight",
    0x8769 : "ExifIFDPointer",
    0x8825 : "GPSInfoIFDPointer",
    0xA005 : "InteroperabilityIFDPointer",
    0x0102 : "BitsPerSample",
    0x0103 : "Compression",
    0x0106 : "PhotometricInterpretation",
    0x0112 : "Orientation",
    0x0115 : "SamplesPerPixel",
    0x011C : "PlanarConfiguration",
    0x0212 : "YCbCrSubSampling",
    0x0213 : "YCbCrPositioning",
    0x011A : "XResolution",
    0x011B : "YResolution",
    0x0128 : "ResolutionUnit",
    0x0111 : "StripOffsets",
    0x0116 : "RowsPerStrip",
    0x0117 : "StripByteCounts",
    0x0201 : "JPEGInterchangeFormat",
    0x0202 : "JPEGInterchangeFormatLength",
    0x012D : "TransferFunction",
    0x013E : "WhitePoint",
    0x013F : "PrimaryChromaticities",
    0x0211 : "YCbCrCoefficients",
    0x0214 : "ReferenceBlackWhite",
    0x0132 : "DateTime",
    0x010E : "ImageDescription",
    0x010F : "Make",
    0x0110 : "Model",
    0x0131 : "Software",
    0x013B : "Artist",
    0x8298 : "Copyright",
    0x0000 : "GPSVersionID",
    0x0001 : "GPSLatitudeRef",
    0x0002 : "GPSLatitude",
    0x0003 : "GPSLongitudeRef",
    0x0004 : "GPSLongitude",
    0x0005 : "GPSAltitudeRef",
    0x0006 : "GPSAltitude",
    0x0007 : "GPSTimeStamp",
    0x0008 : "GPSSatellites",
    0x0009 : "GPSStatus",
    0x000A : "GPSMeasureMode",
    0x000B : "GPSDOP",
    0x000C : "GPSSpeedRef",
    0x000D : "GPSSpeed",
    0x000E : "GPSTrackRef",
    0x000F : "GPSTrack",
    0x0010 : "GPSImgDirectionRef",
    0x0011 : "GPSImgDirection",
    0x0012 : "GPSMapDatum",
    0x0013 : "GPSDestLatitudeRef",
    0x0014 : "GPSDestLatitude",
    0x0015 : "GPSDestLongitudeRef",
    0x0016 : "GPSDestLongitude",
    0x0017 : "GPSDestBearingRef",
    0x0018 : "GPSDestBearing",
    0x0019 : "GPSDestDistanceRef",
    0x001A : "GPSDestDistance",
    0x001B : "GPSProcessingMethod",
    0x001C : "GPSAreaInformation",
    0x001D : "GPSDateStamp",
    0x001E : "GPSDifferential"
};

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
            getExifData();
            getOrientation(orientImg, 150, true); 
        }

        // If photoWidget on Register page. 
        if ( url === 'register') { 
            getExifData();
            getOrientation(orientImg, 200, false); 
        }

    })
}

function getExifData() {

    EXIF.getData(imgFile, function() {
        var exifStore = [];
        for (var prop in tags) {
            var keys  = tags[prop];
            var values = EXIF.getTag(imgFile, tags[prop]);
            if(typeof values !== 'undefined') {
                exifStore.push({ id: keys, value: values });
            }
        }
        // YOU NOW HAVE THE DATA! SEND IT TO THE BACKEND WITH THE REQUEST AND STORE IN AN OBJECT FIELD!!!!
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