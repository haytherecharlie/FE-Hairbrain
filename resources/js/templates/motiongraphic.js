/*******************************************
* © 2017 Hairbrain inc.
* ---------------------
* Created: February 11th 2017
* Last Modified: March 21st 2017
* Author: Charlie Hay
*
* MOTIONGRAPHIC TEMPLATE JS FUNCTIONALITY.
/******************************************/

var MotionGraphic = (function() {

//----------------------------------------------------------------

						 // CACHE

//---------------------------------------------------------------/

/*******************************************
 * Global Variables
*******************************************/
var motionGraphicTplPath   = '/templates/motiongraphic.tpl.html';
var motionGraphicContainer = $('div.motionad'); 

//----------------------------------------------------------------

						 // TEMPLATES

//---------------------------------------------------------------/


//----------------------------------------------------------------

						 // LISTENERS

//---------------------------------------------------------------/


//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/
function backgroundFadeIn() {
    motionGraphicContainer.find('.container').fadeIn(500, function() {
        textFadeIn();
    });
}

function textFadeIn() { 
    var motionTitle = $('div.motionad .container section .motiontitle');
    motionTitle.css('display', 'table-cell');
    motionTitle.addClass('animated zoomInDown');
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
    
    // If graphics container exists, fill it with graphic and start animation.
    if(motionGraphicContainer) {
        motionGraphicContainer.load(motionGraphicTplPath, function() {
            backgroundFadeIn();
        });
    }

})();

})(); // END OF MOTIONGRAPHIC.JS