/*******************************************
* © 2017 Hairbrain inc.
* ---------------------
* Created: February 11th 2017
* Last Modified: June 6th 2017
* Author: Charlie Hay
*
* CLIENT NAV JS FUNCTIONALITY.
/******************************************/

var ClientNav = (function() {

//----------------------------------------------------------------

						 // CACHE

//---------------------------------------------------------------/

/*******************************************
 * Global Variables
*******************************************/
var navHamburger    = $('.clientnav .hamburger');
var navLogo         = $('.clientnav .navlogo');
var navSearch       = $('.clientnav .navsearch');
var navSearchField  = $('.clientnav .searchfield');
var navExitProfile  = $('.clientnav .exitprofile');
var navCancelSearch = $('.clientnav .cancelsearch');
var menuItems       = $('.clientmenu .menuitems');
var clientProfile   = $('.clientprofile');


//----------------------------------------------------------------

						 // LISTENERS

//---------------------------------------------------------------/

/*******************************************
 * On Click of Nav Hamburger
*******************************************/
navHamburger.click(function() {
	if(menuItems.hasClass('open'))
		ClientMenu.closeMenu();
	else
		ClientMenu.openMenu();
});

/*******************************************
 * On Click of "Back" Exit Profile Button
*******************************************/
navExitProfile.click(function() {
	closeClientProfile();
	if(menuItems.hasClass('open'))
		ClientMenu.closeMenu();
})

/*******************************************
 * On Click of Nav Search Field
*******************************************/
navSearchField.click(function() {
	if(navSearchField.hasClass('open'))
		slideSearchClosed();
	else
		slideSearchOpen();
	if(menuItems.hasClass('open'))
		ClientMenu.closeMenu();
});

/*******************************************
 * Window is Resized or Rotated (Mobile)
*******************************************/
$(window).on("resize",function() {
  if(navSearchField.hasClass('open'))
  	repositionSearch();
});

/*******************************************
 * User Types in Nav Search Field
*******************************************/
navSearchField.keyup(function(){
    var searchText = $(this).val();
    $(".clientlist .clientcard").each(function() {
        $(this).toggle(contains($(this).data('name'), searchText));
    });
});

/*******************************************
 * Search is Cancelled
*******************************************/
navCancelSearch.click(function() {
	slideSearchClosed();
});

//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/

/*******************************************
 * Close Client Profile
*******************************************/
function closeClientProfile() {
	clientProfile.animate({
		left: '100vw'
	}, 500, function() {
		clientProfile.scrollTop(0);
	});
	hideBackBtn();
	showSearch();
}

/*******************************************
 * Hide Search Field
*******************************************/
function hideSearch() {
	navSearch.fadeOut();
    navSearchField.hide();
}

/*******************************************
 * Show Search Field
*******************************************/
function showSearch() {
	navSearch.fadeIn();
    navSearchField.show();
}

/*******************************************
 * Show "Back" Exit Profile Button
*******************************************/
function showbackBtn() {
	navExitProfile.fadeIn();
}

/*******************************************
 * Hide "Back" Exit Profile Button
*******************************************/
function hideBackBtn() {
	navExitProfile.fadeOut();
}

/*******************************************
 * Slide Search Open
*******************************************/
function slideSearchOpen() {
	var windowWidth = $(window).width() - 40;
	navHamburger.fadeOut(300);
	navLogo.fadeOut(300);
	navCancelSearch.fadeIn(300);
	fadeOutLetters();
	navSearchField.addClass('open');
	navSearch.animate({
		right: '+=' + (windowWidth - 10) + 'px'
	}, 300, function() {
		navSearchField.show();
        navSearchField.focus();
	})
}

/*******************************************
 * Slide Search Closed
*******************************************/
function slideSearchClosed() {
    navSearchField.blur();
	var windowWidth = $(window).width() - 40;
	navHamburger.fadeIn(300);
	navLogo.fadeIn(300);
	navCancelSearch.fadeOut(300);
	navSearchField.removeClass('open');
	navSearch.animate({
		right: '10px'
	}, 300, function() {
		fadeInLetters();
		navSearchField.val('');
		navSearchField.trigger('keyup');
	});
}

/*******************************************
 * Clear Search and Close
*******************************************/
function quickClearSearch() {
	navLogo.fadeIn();
	navHamburger.fadeIn();
	navSearch.hide();
	navCancelSearch.hide();
	navSearch.css('right', '10px');
	navSearchField.removeClass('open');
}

/*******************************************
 * Restore Letters in Client List
*******************************************/
function restoreList() {
	setTimeout(function() {
		navSearchField.val('');
		navSearchField.trigger('keyup');
		fadeInLetters();
	},300);
}

/*******************************************
 * Reposition Search Field
*******************************************/
function repositionSearch() {
	var windowWidth = $(window).width() - 30;
	navSearch.css('right', (windowWidth - 10));
}

/*******************************************
 * Fade In List Letters
*******************************************/
function fadeInLetters() {
	$('.clientlist .letter').each(function() {
		$(this).fadeIn(300);
	});
}

/*******************************************
 * Fade Out List Letters
*******************************************/
function fadeOutLetters() {
	$('.clientlist .letter').each(function() {
		$(this).fadeOut(300);
	});
}

//----------------------------------------------------------------

						 // LOGIC

//---------------------------------------------------------------/

/*******************************************
 * Contains Substring
*******************************************/
function contains(text_one, text_two) {
    return text_one.toLowerCase().indexOf(text_two.toLowerCase()) != -1;
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

        // Main

    })();

    return {
        hideSearch: hideSearch,
        showBackBtn: showbackBtn,
        quickClearSearch: quickClearSearch,
        restoreList: restoreList,
        closeClientProfile: closeClientProfile
    }

})(); // END OF CLIENTNAV.JS
