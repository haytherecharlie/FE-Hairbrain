/*******************************************
* © 2017 Hairbrain inc.
* ---------------------
* Created: February 11th 2017
* Last Modified: June 6th 2017
* Author: Charlie Hay
*
* CLIENT MENU JS FUNCTIONALITY.
/******************************************/

var ClientMenu = (function() {

//----------------------------------------------------------------

						 // CACHE

//---------------------------------------------------------------/

/*******************************************
 * Global Variables
*******************************************/
var menuBox      = $('.clientmenu');
var menuItems    = $('.clientmenu .menuitems');
var menuProfile  = $('.clientmenu .profile');
var menuReport   = $('.clientmenu .report');
var menuLogout   = $('.clientmenu .logout');
var menuOverlay  = $('.clientmenu .menuoverlay');
var stylistModal = $('.stylistmodal');
var reportModal  = $('.reportmodal');


//----------------------------------------------------------------

						 // LISTENERS

//---------------------------------------------------------------/

/*******************************************
 * On Click of Menu Overlay
*******************************************/
menuOverlay.click(function() {
    closeMenu();
});

/*******************************************
 * On Click of Stylist Profile
*******************************************/
menuProfile.click(function() {
    stylistModal.modal('show');
    StylistProfile.stylistRatingAJAX();
    closeMenu();
});


/*******************************************
 * On Click of Report Issue
*******************************************/
menuReport.click(function() {
    reportModal.modal('show');
    closeMenu();
});

/*******************************************
 * On Click of Logout
*******************************************/
menuLogout.click(function() {
	$.removeCookie('jwt', { path: '/' })
    sessionStorage.removeItem('user');
	window.location.href = window.location.origin + '/';
});

/*******************************************
 * On Resize of Window
*******************************************/
$(window).on("resize",function() {
  	repositionMenu();
});


//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/

/*******************************************
 * Open Menu
*******************************************/
function openMenu() {
	menuBox.show();
	menuItems.animate({
		top: 50
	}, 300);
	menuOverlay.animate({
		opacity: 1
	}, 300);
	menuItems.addClass('open');
}

/*******************************************
 * Close Menu
*******************************************/
function closeMenu() {
	menuItems.animate({
		top: 50 - menuItems.height()
	}, 300, function() {
		menuBox.hide();
	});
	menuOverlay.animate({
		opacity: 0
	}, 300);
	menuItems.removeClass('open');
}

/*******************************************
 * Reposition Menu
*******************************************/
function repositionMenu() {
    if(menuItems.hasClass('open'))
	    menuItems.css('top', 50);
    else
        menuItems.css('top', 50 - menuItems.height());
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

        // Main

    })();

    return {
        openMenu: openMenu,
        closeMenu: closeMenu
    }

})(); // END OF CLIENTMENU.JS
