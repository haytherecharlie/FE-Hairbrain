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
        if(hamburgerBtn.hasClass('open'))
            closeMenu();
        else 
            openMenu();
    });

}

//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/
function openMenu() {
    hamburgerBtn.addClass('open');
    menu.css('display', 'block');
}

function closeMenu() {
    hamburgerBtn.removeClass('open');
    menu.css('display', 'none');
}

//----------------------------------------------------------------

						 // LOGIC

//---------------------------------------------------------------/

function setNavListeners() {
    menu         = $('menu');
    hamburgerBtn = $('button.hamburger');
    hamburgerClick();
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
    motionTitle.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', showButtons);
}

function showButtons() {
    $('div.motionad .container section .motiontitle a').fadeTo(1000, 1);
    $('div.motionad .container section .register').fadeTo(1000, 1);
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