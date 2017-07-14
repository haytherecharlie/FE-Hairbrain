/*******************************************
* © 2017 Hairbrain inc.
* ---------------------
* Created: February 11th 2017
* Last Modified: June 6th 2017
* Author: Charlie Hay
*
* CLIENT BASE JS FUNCTIONALITY.
/******************************************/

//----------------------------------------------------------------

						 // CACHE

//---------------------------------------------------------------/

/*******************************************
 * Global Variables
*******************************************/

if (!sessionStorage.getItem('user')) {
    redirect('/login/');
}

var jwt         = decodeURI($.cookie('jwt'));
var user        = JSON.parse(sessionStorage.getItem('user'));
var userid      = user.id;
var name        = user.name;
var phone       = user.phone;
var email       = user.email;
var salon       = user.salon;
var avatar      = user.avatar;


//----------------------------------------------------------------

						 // LISTENERS

//---------------------------------------------------------------/


//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/


//----------------------------------------------------------------

						 // LOGIC

//---------------------------------------------------------------/

/*******************************************
 * Check Token Exists
*******************************************/
function cookieCheck() {
    if(!userid || !jwt) {
        window.location.href = window.location.origin + '/';
        return false;
    } else {
        return true;
    }
}

/*******************************************
 * Redirect Page -> URL
*******************************************/
function redirect(path) {
    window.location.href = window.location.origin + path; 
}


//----------------------------------------------------------------

						 // AJAX CALLS

//---------------------------------------------------------------/


//----------------------------------------------------------------

						 // MAIN

//---------------------------------------------------------------/

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
* Last Modified: June 7th 2017
* Author: Charlie Hay
*
* STYLIST PROFILE JS FUNCTIONALITY.
/******************************************/

var StylistProfile = (function() {

//----------------------------------------------------------------

						 // CACHE

//---------------------------------------------------------------/

/*******************************************
 * Global Variables
*******************************************/
var stylistModal   = $('.stylistmodal');
var stylistProfile = $('.stylistprofile');


//----------------------------------------------------------------

						 // LISTENERS

//---------------------------------------------------------------/



//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/

function setStarbarLength(rating) {
    
    if(rating !== 0 ) {
        var value = (Math.round(rating * 2) / 2).toFixed(1) * 50;
        $('.starbar').css('width', value);
    } else {
        $('.ratingtitle').text('No Ratings Yet!');
        $('.starbar').css('width', 0);   
    }
}

function setComments(comments) {

    for(var i in comments) {
        $('.ratingscontainer .comments').append('' +
        '<div class="starholder" id="star'+i+'"></div>');
        for(var j = 0; j < comments[i].stars; j++) {
            $('.starholder#star'+i+'').append('&star;');
        }
        $('.ratingscontainer .comments').append('' +
        '<span class="comment">'+comments[i].comment+'</span>');
    }
}


//----------------------------------------------------------------

						 // LOGIC

//---------------------------------------------------------------/
function populateStylistProfile() {
    stylistProfile.append('' +
    '<div class="avatar"></div>' +
    '<span class="name">'+name+'</span>' +
    '<span class="phone">'+phone+'</span>' +
    '<span class="salon">'+salon+'</span><hr>' +
    '<div class="ratingscontainer">Fetching Rating<img src="/app/img/loading.gif"></div>');

    $('.stylistprofile .avatar').css('background', 'url('+avatar+') no-repeat center');
}

function populateStylistRating(req) {
    $('.ratingscontainer').empty();
    $('.ratingscontainer').append('' +
    '<span class="ratingtitle">5 Star Rating:</span>' +
    '<div class="rating"><div class="stargrid">' +
    '<img src="/app/img/star.png">' +
    '<img src="/app/img/star.png"><img src="/app/img/star.png">' + 
    '<img src="/app/img/star.png"><img src="/app/img/star.png"></div>' +
    '<div class="starbar"></div>' +
    '</div><hr><div class="comments">' +
    '</div>');
    setStarbarLength(req.total);
    setComments(req.raw);
}

//----------------------------------------------------------------

						 // AJAX CALLS

//---------------------------------------------------------------/

/*******************************************
 * Stylist Rating -> GET
*******************************************/
function stylistRatingAJAX() {
    
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": apiurl + "rating/" + userid,
        "method": "GET",
        "headers": {
            "cache-control": "no-cache",
            "Authorization": "Bearer " + jwt
        },
        "processData": false,
        "contentType": false,
        "statusCode": {
            200: function(req, res) {
                populateStylistRating(req);
            },
            400: function(req, res) {
                ErrorModal.populateMessage(req.responseText);
            },
            401: function(req, res) {
                redirect('/');
            },
            500: function(req, res) {
                ErrorModal.populateMessage('Hairbrain isn\'t working right now. Please try again later.');
            }
        }
    }

    $.ajax(settings)

}

//----------------------------------------------------------------

						 // MAIN

//---------------------------------------------------------------/

/*******************************************
 * Main Function
*******************************************/
    var Main = (function() {  

        // Populate Stylist Profile
        populateStylistProfile();

    })();

    return {
        stylistRatingAJAX: stylistRatingAJAX
    }

})(); // END OF STYLISTPROFILE.JS

/*******************************************
* © 2017 Hairbrain inc.
* ---------------------
* Created: February 11th 2017
* Last Modified: June 6th 2017
* Author: Charlie Hay
*
* CLIENT ADD JS FUNCTIONALITY.
/******************************************/

var ClientAdd = (function() {

//----------------------------------------------------------------

						 // CACHE

//---------------------------------------------------------------/

/*******************************************
 * Global Variables
*******************************************/
var clientAddButton           = $('main .clientaddbutton');
var clientAddModal            = $('.clientaddmodal');
var clientAddForm             = $('.clientaddmodal .clientaddform');
var clientAddFormFirstname    = $('.clientaddmodal .clientaddform .firstname');
var clientAddFormLastname     = $('.clientaddmodal .clientaddform .lastname');
var clientAddFormPhone        = $('.clientaddmodal .clientaddform .phone');
var clientAddFormNotes        = $('.clientaddmodal .clientaddform .notes');
var clientAddFormSubmit       = $('.clientaddmodal .clientaddsubmit');
var clientAddModalCloseButton = $('.clientaddmodal .closemodal');
var clientAddModalLoadingGif  = $('.clientaddmodal .savingclient');


//----------------------------------------------------------------

						 // LISTENERS

//---------------------------------------------------------------/

/*******************************************
 * On Click of Client Add Button
*******************************************/
clientAddButton.click( function() {
    clientAddModal.modal('show');
});

/*******************************************
 * On Click of Submit Button
*******************************************/
clientAddFormSubmit.click( function() {
    showLoading();
    clientAddFormAJAX();
});

/*******************************************
 * On Click of Close Modal 
*******************************************/
clientAddModalCloseButton.click( function() {
    emptyAddForm();
});

/*******************************************
 * Doesn't Allow Form Submit on Enter Press
*******************************************/
$(document).keypress(":input:not(textarea)", function(event) {
    return event.keyCode != 13;
});


//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/

/*******************************************
 * Show Loading Animation
*******************************************/
function showLoading() {
    clientAddModalLoadingGif.show();
}

/*******************************************
 * Hide Loading Animation
*******************************************/
function hideLoading() {
    clientAddModalLoadingGif.hide();
}

//----------------------------------------------------------------

						 // LOGIC

//---------------------------------------------------------------/

/*******************************************
 * Empty Client Add Form on Close
*******************************************/
function emptyAddForm() {
    $('.clientaddmodal .clientaddform input').each(function() {
        $(this).val('');
    })
    clientAddFormNotes.text('');
    $('.clientaddmodal .clientaddform .photothumb').attr('src', '/app/img/photoholder.png');
}


//----------------------------------------------------------------

						 // AJAX CALLS

//---------------------------------------------------------------/

/*******************************************
 * Add Client Form -> POST
*******************************************/
function clientAddFormAJAX() {
    var form = new FormData();
    form.append("firstname", clientAddFormFirstname.val());
    form.append("lastname", clientAddFormLastname.val());
    form.append("phone", clientAddFormPhone.val());
    form.append("notes", clientAddFormNotes.text());
    form.append("name", name);
    form.append("photo", PhotoUpload.getResizedImage());
    form.append("avatar", PhotoUpload.getResizedAvatar());

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": apiurl + "client/add/" + userid,
        "method": "POST",
        "headers": {
            "cache-control": "no-cache",
            "Authorization": "Bearer " + jwt
        },
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form,
        "statusCode": {
            200: function(req, res) {
                ClientList.clientListAJAX();
                emptyAddForm();
                clientAddModal.modal('hide');
                hideLoading();
            },
            400: function(req, res) {
                hideLoading();
                ErrorModal.populateMessage(req.responseText);
            },
            401: function(req, res) {
                hideLoading();
                ErrorModal.populateMessage(req.responseText);
            },
            500: function(req, res) {
                hideLoading();
                ErrorModal.populateMessage('Hairbrain isn\'t working right now. Please try again later.');
            }
        }
    }

    // AJAX SETTINGS
    $.ajax(settings)

}

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
        emptyAddForm: emptyAddForm,
        showLoading: showLoading,
        hideLoading: hideLoading
    }

})(); // END OF CLIENTADD.JS

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

/*******************************************
* © 2017 Hairbrain inc.
* ---------------------
* Created: February 11th 2017
* Last Modified: June 6th 2017
* Author: Charlie Hay
*
* CLIENT PROFILE JS FUNCTIONALITY.
/******************************************/

var ClientProfile = (function() {

//----------------------------------------------------------------

						 // CACHE

//---------------------------------------------------------------/

/*******************************************
 * Global Variables
*******************************************/
var clientProfile       = $('.clientprofile');
var avatar              = $('.clientprofile .avatar');
var firstname           = $('.clientprofile .firstname');
var lastname            = $('.clientprofile .lastname');
var phone               = $('.clientprofile .phone');
var photo               = $('.clientprofile .photo');
var notes               = $('.clientprofile .notes');
var deleteClientButton  = $('.clientprofile .deleteclient');
var deleteModal         = $('.deleteModal');
var confirmDelete       = $('.deleteModal .confirmDelete');


//----------------------------------------------------------------

						 // LISTENERS

//---------------------------------------------------------------/

/*******************************************
 * On Click of Delete Client Button
*******************************************/
deleteClientButton.click(function() {
    showDeleteConfirmation();
});

/*******************************************
 * On Click of Confirm Delete
*******************************************/
confirmDelete.click(function() {
    deleteClient();
});


//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/

/*******************************************
 * Populate Client Profile
*******************************************/
function populateProfile(client) {
    var x = Math.floor(Math.random() * 10000);
    clientProfile.attr('id', client._id);
    avatar.attr('src', client.avatar);
    firstname.text(client.firstname);
    lastname.text(client.lastname);
    phone.html('<a href="tel:' + client.phone + '">' + client.phone + '</a>');
    photo.attr('src', client.photo );
    notes.text(client.notes);
}

function showDeleteConfirmation() {
    deleteModal.modal('show');
}

//----------------------------------------------------------------

						 // LOGIC

//---------------------------------------------------------------/

//----------------------------------------------------------------

						 // AJAX CALLS

//---------------------------------------------------------------/

/*******************************************
 * Delete Client -> DELETE
*******************************************/
function deleteClient() {
    var clientid = clientProfile.attr('id');

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": apiurl + "client/delete/" + userid + '/' + clientid,
        "method": "DELETE",
        "headers": {
            "cache-control": "no-cache",
            "Authorization": "Bearer " + jwt
        },
        "processData": false,
        "contentType": false,
        "statusCode": {
            200: function(req, res) {
                ClientList.clientListAJAX();
                ClientNav.closeClientProfile();
            },
            400: function(req, res) {
                ErrorModal.populateMessage(req.responseText);
            },
            401: function(req, res) {
                redirect('/');
            },
            500: function(req, res) {
                ErrorModal.populateMessage('Hairbrain isn\'t working right now. Please try again later.');
            }
        }
    }

    $.ajax(settings)

}


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
        populateProfile: populateProfile
    }

})(); // END OF CLIENTPROFILE.JS

/*******************************************
* © 2017 Hairbrain inc.
* ---------------------
* Created: February 11th 2017
* Last Modified: March 21st 2017
* Author: Charlie Hay
*
* CLIENT LIST JS FUNCTIONALITY.
/******************************************/

var ClientList = (function() {

//----------------------------------------------------------------

						 // CACHE

//---------------------------------------------------------------/

/*******************************************
 * Global Variables
*******************************************/
var clientList    = $('.clientlist');
var clientProfile = $('.clientprofile');


//----------------------------------------------------------------

						 // LISTENERS

//---------------------------------------------------------------/

/*******************************************
 * SET LISTENERS FOR CLIENT CARDS
*******************************************/
function addCCListeners() {
    $('.clientcard').each(function() {
        $(this).click(function() {
            ClientProfile.populateProfile(clientlist[$(this).attr('id')]);
            ClientNav.quickClearSearch();
            clientProfile.animate({
                left: '0'
            }, 500, function() {
                ClientNav.restoreList();
                clientList.scrollTop(0);
            });
            ClientNav.hideSearch();
            ClientNav.showBackBtn();
        })
    })
}

//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/

/*******************************************
 * DISPLAY CLIENTS
*******************************************/
function displayClients(req) {
    var x = Math.floor(Math.random() * 10000);
    for(var i in req) {
        insertLeadingLetters(req, i);
        clientList.append('' +
            '<div class="clientcard" id="'+i+'" data-name="' + req[i].firstname + req[i].lastname + '">' +
                '<div class="avatar">' +
                    '<img src="' + req[i].avatar + '">' +
                '</div>' +
                '<span class="firstname">'+req[i].firstname+'</span>' +
                '<span class="lastname"> '+req[i].lastname+'</span>' +
            '</div>'
        );
    }
    addCCListeners();
}

//----------------------------------------------------------------

						 // LOGIC

//---------------------------------------------------------------/

/*******************************************
 * INSERT LEADING LETTERS FOR CLIENT LIST
*******************************************/
function insertLeadingLetters(req, i) {
    if (i === '0') 
        clientList.append('<div class="letter">'+req[i].firstname.charAt(0)+'</div>');
    if (i > 0 && i < (req.length) ) {
        if (req[i].firstname.charAt(0) !== req[i-1].firstname.charAt(0))
            clientList.append('<div class="letter">'+req[i].firstname.charAt(0).toUpperCase()+'</div>');
    }
}

//----------------------------------------------------------------

						 // AJAX CALLS

//---------------------------------------------------------------/

/*******************************************
 * Client List -> GET
*******************************************/
function clientListAJAX() {
    
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": apiurl + "client/all/" + userid,
        "method": "GET",
        "headers": {
            "cache-control": "no-cache",
            "Authorization": "Bearer " + jwt
        },
        "processData": false,
        "contentType": false,
        "statusCode": {
            200: function(req, res) {
                clientlist = req;
                clientList.empty();
                if(clientlist.length === 0)
                    clientList.append('<div class="empty">You don\'t have any clients, <br> Click the \'+\' below to get started!</div>');
                else 
                    displayClients(req);
            },
            400: function(req, res) {
                ErrorModal.populateMessage(req.responseText);
            },
            401: function(req, res) {
                redirect('/');
            },
            500: function(req, res) {
                ErrorModal.populateMessage('Hairbrain isn\'t working right now. Please try again later.');
            }
        }
    }

    $.ajax(settings)

}

//----------------------------------------------------------------

						 // MAIN

//---------------------------------------------------------------/

/*******************************************
 * Main Function
*******************************************/
    var Main = (function() {
        clientListAJAX();
    })();

    return {
        clientListAJAX: clientListAJAX
    }

})(); // END OF CLIENTLIST.JS

/*******************************************
* © 2017 Hairbrain inc.
* ---------------------
* Created: February 11th 2017
* Last Modified: June 6th 2017
* Author: Charlie Hay
*
* CLIENT REPORT JS FUNCTIONALITY.
/******************************************/

var ReportIssue = (function() {

//----------------------------------------------------------------

						 // CACHE

//---------------------------------------------------------------/

/*******************************************
 * Global Variables
*******************************************/
var reportModal   = $('.reportmodal');
var confirmReport = $('.reportmodal .confirmreport');
var reportTextBox = $('.issueform')


//----------------------------------------------------------------

						 // LISTENERS

//---------------------------------------------------------------/

/*******************************************
 * On Click of Confirm 
*******************************************/
confirmReport.click(function() {
    submitForm();
});


//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/



//----------------------------------------------------------------

						 // LOGIC

//---------------------------------------------------------------/

//----------------------------------------------------------------

						 // AJAX CALLS

//---------------------------------------------------------------/

/*******************************************
 * Submit Form -> POST
*******************************************/
function submitForm() {
    var form = new FormData();
    form.append("name", name);
    form.append("phone", phone);
    form.append("email", email);
    form.append("salon", salon);
    form.append("issue", reportTextBox.val());

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://script.google.com/macros/s/AKfycbxwK0uSZtglD0qBQKwqNOzfM-1JDMjIusr4FL3i6bkpAkL-QCOH/exec",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "data": form,
        "statusCode": {
            200: function(req, res) {
                // Do Nothing
            },
            400: function(req, res) {
                ErrorModal.populateMessage(req.responseText);
            },
            401: function(req, res) {
                redirect('/');
            },
            500: function(req, res) {
                ErrorModal.populateMessage('Hairbrain isn\'t working right now. Please try again later.');
            }
        }
    }

    $.ajax(settings)

}


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

    }

})(); // END OF CLIENTREPORT.JS

/*******************************************
* © 2017 Hairbrain inc.
* ---------------------
* Created: February 11th 2017
* Last Modified: June 6th 2017
* Author: Charlie Hay
*
* CLIENT EDIT JS FUNCTIONALITY.
/******************************************/

var ClientEdit = (function() {

//----------------------------------------------------------------

						 // CACHE

//---------------------------------------------------------------/

/*******************************************
 * Global Variables
*******************************************/
var editClientButton          = $('.clientprofile .editclient'); 
var originalFirstname;
var originalLastname;
var originalPhone;
var originalPhotoSrc;
var originalNotes;
var clientAddFormPhotoWidget;

var clientAddButton           = $('main .clientaddbutton');
var clientAddModal            = $('.clientaddmodal');
var clientAddModalFooter      = $('.clientaddmodal .modal-footer');
var clientAddForm             = $('.clientaddmodal .clientaddform');
var clientAddFormFirstname    = $('.clientaddmodal .clientaddform .firstname');
var clientAddFormLastname     = $('.clientaddmodal .clientaddform .lastname');
var clientAddFormPhone        = $('.clientaddmodal .clientaddform .phone');
var clientAddFormNotes        = $('.clientaddmodal .clientaddform .notes');

var clientAddFormSubmit       = $('.clientaddmodal .clientaddsubmit');
var clientAddModalCloseButton = $('.clientaddmodal .closemodal');

var clientEditFormSubmit       = $('.clientaddmodal .clienteditsubmit');
var clientEditModalCloseButton = $('.clientaddmodal .closeeditmodal');

var clientAddModalLoadingGif  = $('.clientaddmodal .savingclient');


//----------------------------------------------------------------

						 // LISTENERS

//---------------------------------------------------------------/
editClientButton.click(function() {
    loadProfileValues();
});

clientEditModalCloseButton.click(function() {
    removeEditModalFooterButtons();
    ClientAdd.emptyAddForm();
});

clientEditFormSubmit.click(function() {
    ClientAdd.showLoading();
    clientEditFormAJAX();
});

//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/

function displayProfileValues() {

    clientAddFormFirstname.val(originalFirstname);
    clientAddFormLastname.val(originalLastname);
    clientAddFormPhone.val(originalPhone);
    clientAddFormNotes.text(originalNotes);
    clientAddFormPhotoWidget.attr('src', originalPhotoSrc);

    addEditModalFooterButtons();
    

    clientAddModal.modal('show');

}

function addEditModalFooterButtons() {

    clientAddFormSubmit.hide();
    clientAddModalCloseButton.hide();

    clientEditFormSubmit.show()
    clientEditModalCloseButton.show();

}

function removeEditModalFooterButtons() {

    clientAddFormSubmit.show();
    clientAddModalCloseButton.show();

    clientEditFormSubmit.hide()
    clientEditModalCloseButton.hide();

}

//----------------------------------------------------------------

						 // LOGIC

//---------------------------------------------------------------/
function loadProfileValues() {

    originalFirstname        = $('.clientprofile .firstname').text();
    originalLastname         = $('.clientprofile .lastname').text();
    originalPhone            = $('.clientprofile .phone').text();
    originalPhotoSrc         = $('.clientprofile .photo').attr('src');
    originalNotes            = $('.clientprofile .notes').text();
    clientAddFormPhotoWidget = $('.clientaddmodal .clientaddform .photothumb');

    displayProfileValues();

}

//----------------------------------------------------------------

						 // AJAX CALLS

//---------------------------------------------------------------/

/*******************************************
 * Add Client Form -> POST
*******************************************/
function clientEditFormAJAX() {

    var form = new FormData();
    form.append("firstname", clientAddFormFirstname.val());
    form.append("lastname", clientAddFormLastname.val());
    form.append("phone", clientAddFormPhone.val());
    form.append("notes", clientAddFormNotes.text());

    if (PhotoUpload.getResizedImage())  { form.append("photo",  PhotoUpload.getResizedImage());   }
    if (PhotoUpload.getResizedAvatar()) { form.append("avatar", PhotoUpload.getResizedAvatar()); }

    clientid = $('.clientprofile').attr('id');

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": apiurl + "client/edit/" + userid + '/' + clientid + '/',
        "method": "PUT",
        "headers": {
            "cache-control": "no-cache",
            "Authorization": "Bearer " + jwt
        },
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form,
        "statusCode": {
            200: function(req, res) {
                ClientList.clientListAJAX();
                ClientAdd.emptyAddForm();
                clientAddModal.modal('hide');
                ClientAdd.hideLoading();
                ClientNav.closeClientProfile();
                removeEditModalFooterButtons();
            },
            400: function(req, res) {
                hideLoading();
                ErrorModal.populateMessage(req.responseText);
            },
            401: function(req, res) {
                hideLoading();
                ErrorModal.populateMessage(req.responseText);
            },
            500: function(req, res) {
                hideLoading();
                ErrorModal.populateMessage('Hairbrain isn\'t working right now. Please try again later.');
            }
        }
    }

    // AJAX SETTINGS
    $.ajax(settings)

}

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

    }

})(); // END OF CLIENTADD.JS

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


//----------------------------------------------------------------

						 // TEMPLATES

//---------------------------------------------------------------/


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
        if ( url === 'clients') { getOrientation(orientImg, 150, true); }

        // If photoWidget on Register page. 
        if ( url === 'register') { getOrientation(orientImg, 200, false); }

    })
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