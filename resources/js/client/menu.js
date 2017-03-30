/*******************************************
* © 2017 Hairbrain inc.
* ---------------------
* Created: February 11th 2017
* Last Modified: March 21st 2017
* Author: Charlie Hay
*
* MENU COMPONENT JS FUNCTIONALITY.
/******************************************/

var Menu = (function() {

//----------------------------------------------------------------

						 // CACHE

//---------------------------------------------------------------/

/*******************************************
 * Global Variables
*******************************************/
var menuOverlay = $('.menuoverlay'),
    menuItems   = $('.menuitems'),
    menuBox     = $('menu'),
	reportIssue = $('.report'),
	logout      = $('.logout');

//----------------------------------------------------------------

						 // TEMPLATES

//---------------------------------------------------------------/

//----------------------------------------------------------------

						 // LISTENERS

//---------------------------------------------------------------/
menuOverlay.click(function() {
    closeMenu();
});

logout.click(function() {
	$.removeCookie('jwt', { path: '/' })
	$.removeCookie('userid', { path: '/' })
	window.location.href = window.location.origin + '/';
});

$(window).on("resize",function() {
  	repositionMenu();
});

//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/
function openMenu() {
	menuBox.show();
	menuItems.animate({
		bottom: '-=' + menuItems.height()
	}, 300);
	menuOverlay.animate({
		opacity: 1
	}, 300);
	menuItems.addClass('open');
}

function closeMenu() {
	menuItems.animate({
		bottom: '+=' + menuItems.height()
	}, 300, function() {
		menuBox.hide();
	});
	menuOverlay.animate({
		opacity: 0
	}, 300);
	menuItems.removeClass('open');
}

function repositionMenu() {
    var windowHeight = $(window).height();
    console.log(windowHeight);
    if(menuItems.hasClass('open')) {
        console.log(menuItems.css('bottom'));
	    menuItems.css('bottom', windowHeight - 138);
    } else {
        console.log(menuItems.css('bottom'));
        menuItems.css('bottom', windowHeight - 50);
    }
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
return {
    openMenu: openMenu,
    closeMenu: closeMenu
}

})(); // END OF MENU.JS
