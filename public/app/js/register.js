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
var ExifReader = (function() {
	
	var debug = false;

	window.EXIF = function(obj) {
        if (obj instanceof EXIF) return obj;
        if (!(this instanceof EXIF)) return new EXIF(obj);
        this.EXIFwrapped = obj;
    };

    EXIF.Tags = {

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
        0xA420 : "ImageUniqueID"            // Identifier assigned uniquely to each image
    };

    EXIF.TiffTags = {
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
        0x8298 : "Copyright"
    };

    EXIF.GPSTags = {
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

     // EXIF 2.3 Spec
    EXIF.IFD1Tags = {
        0x0100: "ImageWidth",
        0x0101: "ImageHeight",
        0x0102: "BitsPerSample",
        0x0103: "Compression",
        0x0106: "PhotometricInterpretation",
        0x0111: "StripOffsets",
        0x0112: "Orientation",
        0x0115: "SamplesPerPixel",
        0x0116: "RowsPerStrip",
        0x0117: "StripByteCounts",
        0x011A: "XResolution",
        0x011B: "YResolution",
        0x011C: "PlanarConfiguration",
        0x0128: "ResolutionUnit",
        0x0201: "JpegIFOffset",    // When image format is JPEG, this value show offset to JPEG data stored.(aka "ThumbnailOffset" or "JPEGInterchangeFormat")
        0x0202: "JpegIFByteCount", // When image format is JPEG, this value shows data size of JPEG image (aka "ThumbnailLength" or "JPEGInterchangeFormatLength")
        0x0211: "YCbCrCoefficients",
        0x0212: "YCbCrSubSampling",
        0x0213: "YCbCrPositioning",
        0x0214: "ReferenceBlackWhite"
    };

    EXIF.StringValues = {
        ExposureProgram : {
            0 : "Not defined",
            1 : "Manual",
            2 : "Normal program",
            3 : "Aperture priority",
            4 : "Shutter priority",
            5 : "Creative program",
            6 : "Action program",
            7 : "Portrait mode",
            8 : "Landscape mode"
        },
        MeteringMode : {
            0 : "Unknown",
            1 : "Average",
            2 : "CenterWeightedAverage",
            3 : "Spot",
            4 : "MultiSpot",
            5 : "Pattern",
            6 : "Partial",
            255 : "Other"
        },
        LightSource : {
            0 : "Unknown",
            1 : "Daylight",
            2 : "Fluorescent",
            3 : "Tungsten (incandescent light)",
            4 : "Flash",
            9 : "Fine weather",
            10 : "Cloudy weather",
            11 : "Shade",
            12 : "Daylight fluorescent (D 5700 - 7100K)",
            13 : "Day white fluorescent (N 4600 - 5400K)",
            14 : "Cool white fluorescent (W 3900 - 4500K)",
            15 : "White fluorescent (WW 3200 - 3700K)",
            17 : "Standard light A",
            18 : "Standard light B",
            19 : "Standard light C",
            20 : "D55",
            21 : "D65",
            22 : "D75",
            23 : "D50",
            24 : "ISO studio tungsten",
            255 : "Other"
        },
        Flash : {
            0x0000 : "Flash did not fire",
            0x0001 : "Flash fired",
            0x0005 : "Strobe return light not detected",
            0x0007 : "Strobe return light detected",
            0x0009 : "Flash fired, compulsory flash mode",
            0x000D : "Flash fired, compulsory flash mode, return light not detected",
            0x000F : "Flash fired, compulsory flash mode, return light detected",
            0x0010 : "Flash did not fire, compulsory flash mode",
            0x0018 : "Flash did not fire, auto mode",
            0x0019 : "Flash fired, auto mode",
            0x001D : "Flash fired, auto mode, return light not detected",
            0x001F : "Flash fired, auto mode, return light detected",
            0x0020 : "No flash function",
            0x0041 : "Flash fired, red-eye reduction mode",
            0x0045 : "Flash fired, red-eye reduction mode, return light not detected",
            0x0047 : "Flash fired, red-eye reduction mode, return light detected",
            0x0049 : "Flash fired, compulsory flash mode, red-eye reduction mode",
            0x004D : "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
            0x004F : "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
            0x0059 : "Flash fired, auto mode, red-eye reduction mode",
            0x005D : "Flash fired, auto mode, return light not detected, red-eye reduction mode",
            0x005F : "Flash fired, auto mode, return light detected, red-eye reduction mode"
        },
        SensingMethod : {
            1 : "Not defined",
            2 : "One-chip color area sensor",
            3 : "Two-chip color area sensor",
            4 : "Three-chip color area sensor",
            5 : "Color sequential area sensor",
            7 : "Trilinear sensor",
            8 : "Color sequential linear sensor"
        },
        SceneCaptureType : {
            0 : "Standard",
            1 : "Landscape",
            2 : "Portrait",
            3 : "Night scene"
        },
        SceneType : {
            1 : "Directly photographed"
        },
        CustomRendered : {
            0 : "Normal process",
            1 : "Custom process"
        },
        WhiteBalance : {
            0 : "Auto white balance",
            1 : "Manual white balance"
        },
        GainControl : {
            0 : "None",
            1 : "Low gain up",
            2 : "High gain up",
            3 : "Low gain down",
            4 : "High gain down"
        },
        Contrast : {
            0 : "Normal",
            1 : "Soft",
            2 : "Hard"
        },
        Saturation : {
            0 : "Normal",
            1 : "Low saturation",
            2 : "High saturation"
        },
        Sharpness : {
            0 : "Normal",
            1 : "Soft",
            2 : "Hard"
        },
        SubjectDistanceRange : {
            0 : "Unknown",
            1 : "Macro",
            2 : "Close view",
            3 : "Distant view"
        },
        FileSource : {
            3 : "DSC"
        },

        Components : {
            0 : "",
            1 : "Y",
            2 : "Cb",
            3 : "Cr",
            4 : "R",
            5 : "G",
            6 : "B"
        }
    };

    function addEvent(element, event, handler) {
        if (element.addEventListener) {
            element.addEventListener(event, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + event, handler);
        }
    }

    function imageHasData(img) {
        return !!(img.exifdata);
    }


    function base64ToArrayBuffer(base64, contentType) {
        contentType = contentType || base64.match(/^data\:([^\;]+)\;base64,/mi)[1] || ''; // e.g. 'data:image/jpeg;base64,...' => 'image/jpeg'
        base64 = base64.replace(/^data\:([^\;]+)\;base64,/gmi, '');
        var binary = atob(base64);
        var len = binary.length;
        var buffer = new ArrayBuffer(len);
        var view = new Uint8Array(buffer);
        for (var i = 0; i < len; i++) {
            view[i] = binary.charCodeAt(i);
        }
        return buffer;
    }

    function objectURLToBlob(url, callback) {
        var http = new XMLHttpRequest();
        http.open("GET", url, true);
        http.responseType = "blob";
        http.onload = function(e) {
            if (this.status == 200 || this.status === 0) {
                callback(this.response);
            }
        };
        http.send();
    }

    function getImageData(img, callback) {
        function handleBinaryFile(binFile) {
            var data = findEXIFinJPEG(binFile);
            var iptcdata = findIPTCinJPEG(binFile);
            var xmpdata= findXMPinJPEG(binFile);
            img.exifdata = data || {};
            img.iptcdata = iptcdata || {};
            img.xmpdata = xmpdata || {};
            if (callback) {
                callback.call(img);
            }
        }

        if (img.src) {
            if (/^data\:/i.test(img.src)) { // Data URI
                var arrayBuffer = base64ToArrayBuffer(img.src);
                handleBinaryFile(arrayBuffer);

            } else if (/^blob\:/i.test(img.src)) { // Object URL
                var fileReader = new FileReader();
                fileReader.onload = function(e) {
                    handleBinaryFile(e.target.result);
                };
                objectURLToBlob(img.src, function (blob) {
                    fileReader.readAsArrayBuffer(blob);
                });
            } else {
                var http = new XMLHttpRequest();
                http.onload = function() {
                    if (this.status == 200 || this.status === 0) {
                        handleBinaryFile(http.response);
                    } else {
                        throw "Could not load image";
                    }
                    http = null;
                };
                http.open("GET", img.src, true);
                http.responseType = "arraybuffer";
                http.send(null);
            }
        } else if (self.FileReader && (img instanceof self.Blob || img instanceof self.File)) {
            var fileReader = new FileReader();
            fileReader.onload = function(e) {
                if (debug) console.log("Got file of length " + e.target.result.byteLength);
                handleBinaryFile(e.target.result);
            };

            fileReader.readAsArrayBuffer(img);
        }
    }

    function findEXIFinJPEG(file) {
        var dataView = new DataView(file);

        if (debug) console.log("Got file of length " + file.byteLength);
        if ((dataView.getUint8(0) != 0xFF) || (dataView.getUint8(1) != 0xD8)) {
            if (debug) console.log("Not a valid JPEG");
            return false; // not a valid jpeg
        }

        var offset = 2,
            length = file.byteLength,
            marker;

        while (offset < length) {
            if (dataView.getUint8(offset) != 0xFF) {
                if (debug) console.log("Not a valid marker at offset " + offset + ", found: " + dataView.getUint8(offset));
                return false; // not a valid marker, something is wrong
            }

            marker = dataView.getUint8(offset + 1);
            if (debug) console.log(marker);

            // we could implement handling for other markers here,
            // but we're only looking for 0xFFE1 for EXIF data

            if (marker == 225) {
                if (debug) console.log("Found 0xFFE1 marker");

                return readEXIFData(dataView, offset + 4, dataView.getUint16(offset + 2) - 2);

                // offset += 2 + file.getShortAt(offset+2, true);

            } else {
                offset += 2 + dataView.getUint16(offset+2);
            }

        }

    }

    function findIPTCinJPEG(file) {
        var dataView = new DataView(file);

        if (debug) console.log("Got file of length " + file.byteLength);
        if ((dataView.getUint8(0) != 0xFF) || (dataView.getUint8(1) != 0xD8)) {
            if (debug) console.log("Not a valid JPEG");
            return false; // not a valid jpeg
        }

        var offset = 2,
            length = file.byteLength;


        var isFieldSegmentStart = function(dataView, offset){
            return (
                dataView.getUint8(offset) === 0x38 &&
                dataView.getUint8(offset+1) === 0x42 &&
                dataView.getUint8(offset+2) === 0x49 &&
                dataView.getUint8(offset+3) === 0x4D &&
                dataView.getUint8(offset+4) === 0x04 &&
                dataView.getUint8(offset+5) === 0x04
            );
        };

        while (offset < length) {

            if ( isFieldSegmentStart(dataView, offset )){

                // Get the length of the name header (which is padded to an even number of bytes)
                var nameHeaderLength = dataView.getUint8(offset+7);
                if(nameHeaderLength % 2 !== 0) nameHeaderLength += 1;
                // Check for pre photoshop 6 format
                if(nameHeaderLength === 0) {
                    // Always 4
                    nameHeaderLength = 4;
                }

                var startOffset = offset + 8 + nameHeaderLength;
                var sectionLength = dataView.getUint16(offset + 6 + nameHeaderLength);

                return readIPTCData(file, startOffset, sectionLength);

                break;

            }


            // Not the marker, continue searching
            offset++;

        }

    }
    var IptcFieldMap = {
        0x78 : 'caption',
        0x6E : 'credit',
        0x19 : 'keywords',
        0x37 : 'dateCreated',
        0x50 : 'byline',
        0x55 : 'bylineTitle',
        0x7A : 'captionWriter',
        0x69 : 'headline',
        0x74 : 'copyright',
        0x0F : 'category'
    };
    function readIPTCData(file, startOffset, sectionLength){
        var dataView = new DataView(file);
        var data = {};
        var fieldValue, fieldName, dataSize, segmentType, segmentSize;
        var segmentStartPos = startOffset;
        while(segmentStartPos < startOffset+sectionLength) {
            if(dataView.getUint8(segmentStartPos) === 0x1C && dataView.getUint8(segmentStartPos+1) === 0x02){
                segmentType = dataView.getUint8(segmentStartPos+2);
                if(segmentType in IptcFieldMap) {
                    dataSize = dataView.getInt16(segmentStartPos+3);
                    segmentSize = dataSize + 5;
                    fieldName = IptcFieldMap[segmentType];
                    fieldValue = getStringFromDB(dataView, segmentStartPos+5, dataSize);
                    // Check if we already stored a value with this name
                    if(data.hasOwnProperty(fieldName)) {
                        // Value already stored with this name, create multivalue field
                        if(data[fieldName] instanceof Array) {
                            data[fieldName].push(fieldValue);
                        }
                        else {
                            data[fieldName] = [data[fieldName], fieldValue];
                        }
                    }
                    else {
                        data[fieldName] = fieldValue;
                    }
                }

            }
            segmentStartPos++;
        }
        return data;
    }



    function readTags(file, tiffStart, dirStart, strings, bigEnd) {
        var entries = file.getUint16(dirStart, !bigEnd),
            tags = {},
            entryOffset, tag,
            i;

        for (i=0;i<entries;i++) {
            entryOffset = dirStart + i*12 + 2;
            tag = strings[file.getUint16(entryOffset, !bigEnd)];
            if (!tag && debug) console.log("Unknown tag: " + file.getUint16(entryOffset, !bigEnd));
            tags[tag] = readTagValue(file, entryOffset, tiffStart, dirStart, bigEnd);
        }
        return tags;
    }


    function readTagValue(file, entryOffset, tiffStart, dirStart, bigEnd) {
        var type = file.getUint16(entryOffset+2, !bigEnd),
            numValues = file.getUint32(entryOffset+4, !bigEnd),
            valueOffset = file.getUint32(entryOffset+8, !bigEnd) + tiffStart,
            offset,
            vals, val, n,
            numerator, denominator;

        switch (type) {
            case 1: // byte, 8-bit unsigned int
            case 7: // undefined, 8-bit byte, value depending on field
                if (numValues == 1) {
                    return file.getUint8(entryOffset + 8, !bigEnd);
                } else {
                    offset = numValues > 4 ? valueOffset : (entryOffset + 8);
                    vals = [];
                    for (n=0;n<numValues;n++) {
                        vals[n] = file.getUint8(offset + n);
                    }
                    return vals;
                }

            case 2: // ascii, 8-bit byte
                offset = numValues > 4 ? valueOffset : (entryOffset + 8);
                return getStringFromDB(file, offset, numValues-1);

            case 3: // short, 16 bit int
                if (numValues == 1) {
                    return file.getUint16(entryOffset + 8, !bigEnd);
                } else {
                    offset = numValues > 2 ? valueOffset : (entryOffset + 8);
                    vals = [];
                    for (n=0;n<numValues;n++) {
                        vals[n] = file.getUint16(offset + 2*n, !bigEnd);
                    }
                    return vals;
                }

            case 4: // long, 32 bit int
                if (numValues == 1) {
                    return file.getUint32(entryOffset + 8, !bigEnd);
                } else {
                    vals = [];
                    for (n=0;n<numValues;n++) {
                        vals[n] = file.getUint32(valueOffset + 4*n, !bigEnd);
                    }
                    return vals;
                }

            case 5:    // rational = two long values, first is numerator, second is denominator
                if (numValues == 1) {
                    numerator = file.getUint32(valueOffset, !bigEnd);
                    denominator = file.getUint32(valueOffset+4, !bigEnd);
                    val = new Number(numerator / denominator);
                    val.numerator = numerator;
                    val.denominator = denominator;
                    return val;
                } else {
                    vals = [];
                    for (n=0;n<numValues;n++) {
                        numerator = file.getUint32(valueOffset + 8*n, !bigEnd);
                        denominator = file.getUint32(valueOffset+4 + 8*n, !bigEnd);
                        vals[n] = new Number(numerator / denominator);
                        vals[n].numerator = numerator;
                        vals[n].denominator = denominator;
                    }
                    return vals;
                }

            case 9: // slong, 32 bit signed int
                if (numValues == 1) {
                    return file.getInt32(entryOffset + 8, !bigEnd);
                } else {
                    vals = [];
                    for (n=0;n<numValues;n++) {
                        vals[n] = file.getInt32(valueOffset + 4*n, !bigEnd);
                    }
                    return vals;
                }

            case 10: // signed rational, two slongs, first is numerator, second is denominator
                if (numValues == 1) {
                    return file.getInt32(valueOffset, !bigEnd) / file.getInt32(valueOffset+4, !bigEnd);
                } else {
                    vals = [];
                    for (n=0;n<numValues;n++) {
                        vals[n] = file.getInt32(valueOffset + 8*n, !bigEnd) / file.getInt32(valueOffset+4 + 8*n, !bigEnd);
                    }
                    return vals;
                }
        }
    }

    /**
    * Given an IFD (Image File Directory) start offset
    * returns an offset to next IFD or 0 if it's the last IFD.
    */
    function getNextIFDOffset(dataView, dirStart, bigEnd){
        //the first 2bytes means the number of directory entries contains in this IFD
        var entries = dataView.getUint16(dirStart, !bigEnd);

        // After last directory entry, there is a 4bytes of data,
        // it means an offset to next IFD.
        // If its value is '0x00000000', it means this is the last IFD and there is no linked IFD.

        return dataView.getUint32(dirStart + 2 + entries * 12, !bigEnd); // each entry is 12 bytes long
    }

    function readThumbnailImage(dataView, tiffStart, firstIFDOffset, bigEnd){
        // get the IFD1 offset
        var IFD1OffsetPointer = getNextIFDOffset(dataView, tiffStart+firstIFDOffset, bigEnd);

        if (!IFD1OffsetPointer) {
            return {};
        }
        else if (IFD1OffsetPointer > dataView.byteLength) { // this should not happen
            return {};
        }

        var thumbTags = readTags(dataView, tiffStart, tiffStart + IFD1OffsetPointer, EXIF.IFD1Tags, bigEnd)

        // EXIF 2.3 specification for JPEG format thumbnail

        // If the value of Compression(0x0103) Tag in IFD1 is '6', thumbnail image format is JPEG.
        // Most of Exif image uses JPEG format for thumbnail. In that case, you can get offset of thumbnail
        // by JpegIFOffset(0x0201) Tag in IFD1, size of thumbnail by JpegIFByteCount(0x0202) Tag.
        // Data format is ordinary JPEG format, starts from 0xFFD8 and ends by 0xFFD9. It seems that
        // JPEG format and 160x120pixels of size are recommended thumbnail format for Exif2.1 or later.

        if (thumbTags['Compression']) {

            switch (thumbTags['Compression']) {
                case 6:
                    if (thumbTags.JpegIFOffset && thumbTags.JpegIFByteCount) {
                    // extract the thumbnail
                        var tOffset = tiffStart + thumbTags.JpegIFOffset;
                        var tLength = thumbTags.JpegIFByteCount;
                        thumbTags['blob'] = new Blob([new Uint8Array(dataView.buffer, tOffset, tLength)], {
                            type: 'image/jpeg'
                        });
                    }
                break;

            case 1:
                //Thumbnail image format is TIFF, which is not implemented.
                break;
            default:
                //Unknown thumbnail image format '%s'", thumbTags['Compression']
            }
        }
        else if (thumbTags['PhotometricInterpretation'] == 2) {
            //Thumbnail image format is RGB, which is not implemented.
        }
        return thumbTags;
    }

    function getStringFromDB(buffer, start, length) {
        var outstr = "";
        for (n = start; n < start+length; n++) {
            outstr += String.fromCharCode(buffer.getUint8(n));
        }
        return outstr;
    }

    function readEXIFData(file, start) {
        if (getStringFromDB(file, start, 4) != "Exif") {
            if (debug) console.log("Not valid EXIF data! " + getStringFromDB(file, start, 4));
            return false;
        }

        var bigEnd,
            tags, tag,
            exifData, gpsData,
            tiffOffset = start + 6;

        // test for TIFF validity and endianness
        if (file.getUint16(tiffOffset) == 0x4949) {
            bigEnd = false;
        } else if (file.getUint16(tiffOffset) == 0x4D4D) {
            bigEnd = true;
        } else {
            if (debug) console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)");
            return false;
        }

        if (file.getUint16(tiffOffset+2, !bigEnd) != 0x002A) {
            if (debug) console.log("Not valid TIFF data! (no 0x002A)");
            return false;
        }

        var firstIFDOffset = file.getUint32(tiffOffset+4, !bigEnd);

        if (firstIFDOffset < 0x00000008) {
            if (debug) console.log("Not valid TIFF data! (First offset less than 8)", file.getUint32(tiffOffset+4, !bigEnd));
            return false;
        }

        tags = readTags(file, tiffOffset, tiffOffset + firstIFDOffset, EXIF.TiffTags, bigEnd);

        if (tags.ExifIFDPointer) {
            exifData = readTags(file, tiffOffset, tiffOffset + tags.ExifIFDPointer, EXIF.Tags, bigEnd);
            for (tag in exifData) {
                switch (tag) {
                    case "LightSource" :
                    case "Flash" :
                    case "MeteringMode" :
                    case "ExposureProgram" :
                    case "SensingMethod" :
                    case "SceneCaptureType" :
                    case "SceneType" :
                    case "CustomRendered" :
                    case "WhiteBalance" :
                    case "GainControl" :
                    case "Contrast" :
                    case "Saturation" :
                    case "Sharpness" :
                    case "SubjectDistanceRange" :
                    case "FileSource" :
                        exifData[tag] = EXIF.StringValues[tag][exifData[tag]];
                        break;

                    case "ExifVersion" :
                    case "FlashpixVersion" :
                        exifData[tag] = String.fromCharCode(exifData[tag][0], exifData[tag][1], exifData[tag][2], exifData[tag][3]);
                        break;

                    case "ComponentsConfiguration" :
                        exifData[tag] =
                            EXIF.StringValues.Components[exifData[tag][0]] +
                            EXIF.StringValues.Components[exifData[tag][1]] +
                            EXIF.StringValues.Components[exifData[tag][2]] +
                            EXIF.StringValues.Components[exifData[tag][3]];
                        break;
                }
                tags[tag] = exifData[tag];
            }
        }

        if (tags.GPSInfoIFDPointer) {
            gpsData = readTags(file, tiffOffset, tiffOffset + tags.GPSInfoIFDPointer, EXIF.GPSTags, bigEnd);
            for (tag in gpsData) {
                switch (tag) {
                    case "GPSVersionID" :
                        gpsData[tag] = gpsData[tag][0] +
                            "." + gpsData[tag][1] +
                            "." + gpsData[tag][2] +
                            "." + gpsData[tag][3];
                        break;
                }
                tags[tag] = gpsData[tag];
            }
        }

        // extract thumbnail
        tags['thumbnail'] = readThumbnailImage(file, tiffOffset, firstIFDOffset, bigEnd);

        return tags;
    }

   function findXMPinJPEG(file) {

        if (!('DOMParser' in self)) {
            return;
        }
        var dataView = new DataView(file);

        if (debug) console.log("Got file of length " + file.byteLength);
        if ((dataView.getUint8(0) != 0xFF) || (dataView.getUint8(1) != 0xD8)) {
           if (debug) console.log("Not a valid JPEG");
           return false; // not a valid jpeg
        }

        var offset = 2,
            length = file.byteLength,
            dom = new DOMParser();

        while (offset < (length-4)) {
            if (getStringFromDB(dataView, offset, 4) == "http") {
                var startOffset = offset - 1;
                var sectionLength = dataView.getUint16(offset - 2) - 1;
                var xmpString = getStringFromDB(dataView, startOffset, sectionLength)
                var xmpEndIndex = xmpString.indexOf('xmpmeta>') + 8;
                xmpString = xmpString.substring( xmpString.indexOf( '<x:xmpmeta' ), xmpEndIndex );

                var indexOfXmp = xmpString.indexOf('x:xmpmeta') + 10
                //Many custom written programs embed xmp/xml without any namespace. Following are some of them.
                //Without these namespaces, XML is thought to be invalid by parsers
                xmpString = xmpString.slice(0, indexOfXmp)
                            + 'xmlns:Iptc4xmpCore="http://iptc.org/std/Iptc4xmpCore/1.0/xmlns/" '
                            + 'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" '
                            + 'xmlns:tiff="http://ns.adobe.com/tiff/1.0/" '
                            + 'xmlns:plus="http://schemas.android.com/apk/lib/com.google.android.gms.plus" '
                            + 'xmlns:ext="http://www.gettyimages.com/xsltExtension/1.0" '
                            + 'xmlns:exif="http://ns.adobe.com/exif/1.0/" '
                            + 'xmlns:stEvt="http://ns.adobe.com/xap/1.0/sType/ResourceEvent#" '
                            + 'xmlns:stRef="http://ns.adobe.com/xap/1.0/sType/ResourceRef#" '
                            + 'xmlns:crs="http://ns.adobe.com/camera-raw-settings/1.0/" '
                            + 'xmlns:xapGImg="http://ns.adobe.com/xap/1.0/g/img/" '
                            + 'xmlns:Iptc4xmpExt="http://iptc.org/std/Iptc4xmpExt/2008-02-29/" '
                            + xmpString.slice(indexOfXmp)

                var domDocument = dom.parseFromString( xmpString, 'text/xml' );
                return xml2Object(domDocument);
            } else{
             offset++;
            }
        }
    }

    function xml2Object(xml) {
        try {
            var obj = {};
            if (xml.children.length > 0) {
              for (var i = 0; i < xml.children.length; i++) {
                var item = xml.children.item(i);
                var attributes = item.attributes;
                for(var idx in attributes) {
                    var itemAtt = attributes[idx];
                    var dataKey = itemAtt.nodeName;
                    var dataValue = itemAtt.nodeValue;

                    if(dataKey !== undefined) {
                        obj[dataKey] = dataValue;
                    }
                }
                var nodeName = item.nodeName;

                if (typeof (obj[nodeName]) == "undefined") {
                  obj[nodeName] = xml2json(item);
                } else {
                  if (typeof (obj[nodeName].push) == "undefined") {
                    var old = obj[nodeName];

                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                  }
                  obj[nodeName].push(xml2json(item));
                }
              }
            } else {
              obj = xml.textContent;
            }
            return obj;
          } catch (e) {
              if(debug) console.error(e.message);
          }
    }

    EXIF.getData = function(img, callback) {
        if ((self.Image && img instanceof self.Image)
            || (self.HTMLImageElement && img instanceof self.HTMLImageElement)
            && !img.complete)
            return false;

        if (!imageHasData(img)) {
            getImageData(img, callback);
        } else {
            if (callback) {
                callback.call(img);
            }
        }
        return true;
    }

    EXIF.getTag = function(img, tag) {
        if (!imageHasData(img)) return;
        return img.exifdata[tag];
    }
    
    EXIF.getIptcTag = function(img, tag) {
        if (!imageHasData(img)) return;
        return img.iptcdata[tag];
    }

    EXIF.getAllTags = function(img) {
        if (!imageHasData(img)) return {};
        var a,
            data = img.exifdata,
            tags = {};
        for (a in data) {
            if (data.hasOwnProperty(a)) {
                tags[a] = data[a];
            }
        }
        return tags;
    }
    
    EXIF.getAllIptcTags = function(img) {
        if (!imageHasData(img)) return {};
        var a,
            data = img.iptcdata,
            tags = {};
        for (a in data) {
            if (data.hasOwnProperty(a)) {
                tags[a] = data[a];
            }
        }
        return tags;
    }

    EXIF.pretty = function(img) {
        if (!imageHasData(img)) return "";
        var a,
            data = img.exifdata,
            strPretty = "";
        for (a in data) {
            if (data.hasOwnProperty(a)) {
                if (typeof data[a] == "object") {
                    if (data[a] instanceof Number) {
                        strPretty += a + " : " + data[a] + " [" + data[a].numerator + "/" + data[a].denominator + "]\r\n";
                    } else {
                        strPretty += a + " : [" + data[a].length + " values]\r\n";
                    }
                } else {
                    strPretty += a + " : " + data[a] + "\r\n";
                }
            }
        }
        return strPretty;
    }

    EXIF.readFromBinaryFile = function(file) {
        return findEXIFinJPEG(file);
    }

})();

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

    if(keyword.val() === 'hairbeta') {
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
