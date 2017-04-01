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
	navSearch     = $('.navsearch'),
	exitProfile   = $('.exitprofile'),
	clientProfile = $('.clientprofile'),
	searchField   = $('.searchfield'),
	navLogo       = $('.navlogo'),
	cancelSearch  = $('.cancelsearch');

//----------------------------------------------------------------

						 // TEMPLATES

//---------------------------------------------------------------/

//----------------------------------------------------------------

						 // LISTENERS

//---------------------------------------------------------------/
navMenu.click(function() {
	if(menuItems.hasClass('open'))
		Menu.closeMenu();
	else
		Menu.openMenu();
});

exitProfile.click(function() {
	slideClientProfile();
	if(menuItems.hasClass('open'))
		Menu.closeMenu();
})

searchField.click(function() {
	if(searchField.hasClass('open'))
		slideSearchClosed();
	else
		slideSearchOpen();
	if(menuItems.hasClass('open'))
		Menu.closeMenu();
});

$(window).on("resize",function() {
  if(searchField.hasClass('open'))
  	repositionSearch();
});

searchField.keyup(function(){
    var searchText = $(this).val();
    $(".clientcard").each(function() {
        $(this).toggle(contains($(this).data('name'), searchText));
    });
});

cancelSearch.click(function() {
	slideSearchClosed();
});

//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/

function slideClientProfile() {
	clientProfile.animate({
		left: '100vw'
	}, 500, function() {
		clientProfile.scrollTop(0);
	});
	hideBackBtn();
	showSearch();
}

function hideSearch() {
	navSearch.fadeOut();
}

function showSearch() {
	navSearch.fadeIn();
}

function showbackBtn() {
	exitProfile.fadeIn();
}

function hideBackBtn() {
	exitProfile.fadeOut();
}

function slideSearchOpen() {
	var windowWidth = $(window).width() - 40;
	navMenu.fadeOut(300);
	navLogo.fadeOut(300);
	cancelSearch.fadeIn(300);
	fadeOutLetters();
	searchField.addClass('open');
	navSearch.animate({
		right: '+=' + windowWidth + 'px'
	}, 300, function() {
		searchField.show();
        searchField.focus();
	})
}

function slideSearchClosed() {
    searchField.blur();
	var windowWidth = $(window).width() - 40;
	navMenu.fadeIn(300);
	navLogo.fadeIn(300);
	cancelSearch.fadeOut(300);
	searchField.removeClass('open');
	navSearch.animate({
		right: '10px'
	}, 300, function() {
		fadeInLetters();
		searchField.val('');
		searchField.trigger('keyup');
	});
}

function quickClearSearch() {
	navLogo.fadeIn();
	navMenu.fadeIn();
	navSearch.hide();
	cancelSearch.hide();
	navSearch.css('right', '10px');
	searchField.removeClass('open');
	searchField.removeClass('open');	
}

function restoreList() {
	setTimeout(function() {
		searchField.val('');
		searchField.trigger('keyup');
		fadeInLetters();
	},300);
}

function repositionSearch() {
	var windowWidth = $(window).width() - 30;
	navSearch.css('right', windowWidth);
}

function fadeInLetters() {
	$('.letter').each(function() {
		$(this).fadeIn(300);
	});
}

function fadeOutLetters() {
	$('.letter').each(function() {
		$(this).fadeOut(300);
	});
}

//----------------------------------------------------------------

						 // LOGIC

//---------------------------------------------------------------/
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
return {
	showSearch: showSearch,
	hideSearch: hideSearch,
	showBackBtn: showbackBtn,
	hideBackBtn: hideBackBtn,
	slideSearchClosed: slideSearchClosed,
	quickClearSearch: quickClearSearch,
	restoreList: restoreList,
	slideClientProfile: slideClientProfile
}

})(); // END OF NAV.JS