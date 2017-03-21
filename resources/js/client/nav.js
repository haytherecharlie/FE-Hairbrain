/*******************************************
* © 2017 Hairbrain inc.
* ---------------------
* Created: February 11th 2017
* Last Modified: March 21st 2017
* Author: Charlie Hay
*
* NAV COMPONENT JS FUNCTIONALITY.
/******************************************/

var Nav = (function() {

//----------------------------------------------------------------

						 // CACHE

//---------------------------------------------------------------/

/*******************************************
 * Global Variables
*******************************************/
var navMenu       = $('.navmenu'),
	menuItems     = $('.menuitems'),
	menuBox       = $('menu'),
	navSearch     = $('.navsearch'),
	exitProfile   = $('.exitprofile'),
	clientProfile = $('.clientprofile');

//----------------------------------------------------------------

						 // TEMPLATES

//---------------------------------------------------------------/

//----------------------------------------------------------------

						 // LISTENERS

//---------------------------------------------------------------/
navMenu.click(function() {
	if(menuItems.hasClass('open'))
		closeMenu();
	else
		openMenu();
});

exitProfile.click(function() {
	slideClientProfile();
})

//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/
function openMenu() {
	menuBox.show();
	menuItems.animate({
		bottom: '-=' + menuItems.height()
	}, 300);
	menuItems.addClass('open');
}

function closeMenu() {
	menuItems.animate({
		bottom: '+=' + menuItems.height()
	}, 300, function() {
		menuBox.hide();
	});
	menuItems.removeClass('open');
}

function slideClientProfile() {
	clientProfile.animate({
		left: '100vw'
	}, 500);
	hideBackBtn();
	showSearch();
}

function hideSearch() {
	navSearch.hide();
}

function showSearch() {
	navSearch.show();
}

function showbackBtn() {
	exitProfile.show();
}

function hideBackBtn() {
	exitProfile.hide();
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
	showSearch: showSearch,
	hideSearch: hideSearch,
	showBackBtn: showbackBtn,
	hideBackBtn: hideBackBtn
}

})(); // END OF NAV.JS