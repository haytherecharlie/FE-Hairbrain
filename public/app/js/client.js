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
var userid      = decodeURI($.cookie('userid'));
var jwt         = decodeURI($.cookie('jwt'));
var name        = decodeURI($.cookie('name'));
var phone       = decodeURI($.cookie('phone'));
var email       = decodeURI($.cookie('email'));
var salon       = decodeURI($.cookie('salon'));
var rating      = decodeURI($.cookie('rating'));


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
    countValidInputs();
    clientAddModal.modal('show');
});

/*******************************************
 * On Click of Submit Button
*******************************************/
clientAddFormSubmit.click( function() {
    showLoading();
    clientAddFormAJAX();
    emptyAddForm();
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

/*******************************************
 * Listens for Change on Inputs (Not Textarea)
*******************************************/
$('.clientaddmodal .clientaddform input').not('input[type="button"]').keydown(function() {
    countValidInputs();
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
    clientAddFormNotes.val('');
    $('.clientaddmodal .clientaddform .photothumb').css('background', 'none');
}

/*******************************************
 * Count Valid Inputs
*******************************************/
function countValidInputs() {
    var numInputs   = $('.clientaddmodal .clientaddform input').length;
    var validInputs = 1; 
    $('.clientaddmodal .clientaddform input').each(function() {
        if ( $(this).val() !== '') {
            validInputs++;
        }
    })
    toggleSubmitBtn(validInputs, numInputs);
}

/*******************************************
 * Toggle Submit Button
*******************************************/
function toggleSubmitBtn(valid, total) {
    if( valid === total )
        clientAddFormSubmit.prop('disabled', false);
    else 
        clientAddFormSubmit.prop('disabled', true);
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
    form.append("notes", clientAddFormNotes.val());
    form.append("photo", $('.clientaddmodal .clientaddform .photoinput')[0].files[0], 'photo.jpg');
    form.append("name", name);

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
                redirect('/learn/mistake/');
            },
            401: function(req, res) {
                redirect('/');
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
var menuBox     = $('.clientmenu');
var menuItems   = $('.clientmenu .menuitems');
var menuReport  = $('.clientmenu .report');
var menuLogout  = $('.clientmenu .logout');
var menuOverlay = $('.clientmenu .menuoverlay');
var reportModal = $('.reportmodal');


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
	$.removeCookie('userid', { path: '/' })
    $.removeCookie('name', { path: '/' })
    $.removeCookie('phone', { path: '/' })
    $.removeCookie('email', { path: '/' })
    $.removeCookie('salon', { path: '/' })
    $.removeCookie('rating', { path: '/' })
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
    clientProfile.attr('id', client._id);
    avatar.attr('src', apiurl+'photo/'+client.userid+'/'+client._id+'/avatar.jpg');
    firstname.text(client.firstname);
    lastname.text(client.lastname);
    phone.html('<a href="tel:' + client.phone + '">' + client.phone + '</a>');
    photo.attr('src', apiurl+'photo/'+client.userid+'/'+client._id+'/photo.jpg');
    notes.val(client.notes);
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
                redirect('/learn/mistake/');
            },
            401: function(req, res) {
                redirect('/');
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
    for(var i in req) {
        insertLeadingLetters(req, i);
        clientList.append('' +
            '<div class="clientcard" id="'+i+'" data-name="' + req[i].firstname + req[i].lastname + '">' +
                '<div class="avatar">' +
                    '<img src="'+apiurl+'photo/'+userid+'/'+req[i]._id+'/avatar.jpg">' +
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
                redirect('/learn/mistake/');
            },
            401: function(req, res) {
                redirect('/');
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
* Last Modified: March 21st 2017
* Author: Charlie Hay
*
* MOTIONGRAPHIC TEMPLATE JS FUNCTIONALITY.
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

//----------------------------------------------------------------

						 // TEMPLATES

//---------------------------------------------------------------/


//----------------------------------------------------------------

						 // LISTENERS

//---------------------------------------------------------------/

function listenForUpload() {
    photoThumb.click(function() {
        photoInput.click();
        detectFile();
    })
}

//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/


//----------------------------------------------------------------

						 // LOGIC

//---------------------------------------------------------------/

function setNavListeners() {
    photoInput  = $('.photowidget .photoinput');
    photoBox    = $('.photowidget .photobox');
    photoThumb  = $('.photowidget .photothumb');
    listenForUpload();
}

function detectFile() {
    photoInput.change(function(evt) {
        resizeImage(this.files[0]);
    })
}

function resizeImage(img) {

    ImageTools.resize(img, {
        width: 400, // maximum width
        height: 300 // maximum height
    }, function(blob, didItResize) {
        getPhotoDimensions(blob)
    });
}

function getPhotoDimensions(blob) {
		    
        var fr = new FileReader;
        fr.onload = function() {
            var img = new Image;
            img.onload = function() {
                showPhoto(img, blob);
            };
            img.src = fr.result;
        };
        fr.readAsDataURL(blob);
}

function showPhoto(img, blob) {

    if (img.height < img.width) {
        photoThumb.removeClass('default');
        photoThumb.addClass('rotate');
    } else {
        photoThumb.removeClass('rotate');
        photoThumb.addClass('default');
    }

    photoThumb.css('background', 'url(' + img.src + ') no-repeat center' );
    photoThumb.css('background-size', 'cover');
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

})(); // END OF PHOTOWIDGET.JS