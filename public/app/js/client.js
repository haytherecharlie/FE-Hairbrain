/*******************************************
* © 2017 Hairbrain inc.
* ---------------------
* Created: February 11th 2017
* Last Modified: March 21st 2017
* Author: Charlie Hay
*
* BASE JS FUNCTIONALITY.
/******************************************/

var userid      = $.cookie('userid'),
    jwt         = $.cookie('jwt'),
    clients     = [];
    apiurl      = 'http://localhost:8080/';

function cookieCheck() {
    if(!userid || !jwt) {
        window.location.href = window.location.origin + '/';
        return false;
    }
}

/*******************************************
* © 2017 Hairbrain inc.
* ---------------------
* Created: February 11th 2017
* Last Modified: March 21st 2017
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
var clientAddForm  = $('.clientaddform'),
    clientAddBtn   = $('.clientadd'),
    addClientModal = $('.addModal'),
    firstname      = $('.clientaddform input[name="firstname"]'),
    lastname       = $('.clientaddform input[name="lastname"]'),
    email          = $('.clientaddform input[name="email"]'),
    phone          = $('.clientaddform input[name="phone"]')
    notes          = $('.clientaddform textarea[name="notes"]');
    photofront     = $('.clientaddform input[name="photofront"]');
    photoleft      = $('.clientaddform input[name="photoleft"]');
    photoback      = $('.clientaddform input[name="photoback"]');
    photoright     = $('.clientaddform input[name="photoright"]');

//----------------------------------------------------------------

						 // TEMPLATES

//---------------------------------------------------------------/


//----------------------------------------------------------------

						 // LISTENERS

//---------------------------------------------------------------/
clientAddForm.submit( function(e) {
    e.preventDefault();
    clientAddFormAJAX();
    emptyAddForm();
});

clientAddBtn.click(function() {
    addClientModal.modal('show');
});


//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/


//----------------------------------------------------------------

						 // LOGIC

//---------------------------------------------------------------/
function emptyAddForm() {
    $('#clientaddform input').each(function() {
        $(this).val('');
    })
    notes.val('');
}

//----------------------------------------------------------------

						 // AJAX CALLS

//---------------------------------------------------------------/

/*******************************************
 * Add Client Form -> POST
*******************************************/
function clientAddFormAJAX() {
    var form = new FormData();
    form.append("firstname", firstname.val());
    form.append("lastname", lastname.val());
    form.append("email", email.val());
    form.append("phone", phone.val());
    form.append("notes", notes.val());
    form.append("photofront", photofront[0].files[0], 'photofront.jpg');
    form.append("photoleft", photoleft[0].files[0], 'photoleft.jpg');
    form.append("photoback", photoback[0].files[0], 'photoback.jpg');
    form.append("photoright", photoright[0].files[0], 'photoright.jpg');

    var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost:8080/client/add/" + userid,
    "method": "POST",
    "headers": {
        "cache-control": "no-cache",
        "Authorization": "Bearer " + jwt
    },
    "processData": false,
    "contentType": false,
    "mimeType": "multipart/form-data",
    "data": form
    }

    $.ajax(settings)
    .done(function (req, res) {
        console.log(res);
        if(res === "success") { 
            ClientList.clientListAJAX();
            emptyAddForm();
            addClientModal.modal('hide');
        }
    });
}

//----------------------------------------------------------------

						 // MAIN

//---------------------------------------------------------------/

/*******************************************
 * Main Function
*******************************************/

})(); // END OF LOGIN.JS
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

navSearch.click(function() {
	if(navSearch.hasClass('open'))
		slideSearchClosed();
	else
		slideSearchOpen();
	if(menuItems.hasClass('open'))
		Menu.closeMenu();
});

$(window).on("resize",function() {
  if(navSearch.hasClass('open'))
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
	navSearch.addClass('open');
	navSearch.animate({
		right: '+=' + windowWidth + 'px'
	}, 300, function() {
		searchField.show();
		searchField.focus();
	})
}

function slideSearchClosed() {
	var windowWidth = $(window).width() - 40;
	searchField.hide();
	navMenu.fadeIn(300);
	navLogo.fadeIn(300);
	cancelSearch.fadeOut(300);
	navSearch.removeClass('open');
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
	searchField.hide();
	navSearch.removeClass('open');	
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
/*******************************************
* © 2017 Hairbrain inc.
* ---------------------
* Created: February 11th 2017
* Last Modified: March 21st 2017
* Author: Charlie Hay
*
* CLIENT PROFILES JS FUNCTIONALITY.
/******************************************/

var ClientProfile = (function() {

//----------------------------------------------------------------

						 // CACHE

//---------------------------------------------------------------/

/*******************************************
 * Global Variables
*******************************************/
var clientProfile = $('.clientprofile'),
    avatar        = $('.avatar'),
    firstname     = $('.clientprofile .firstname'),
    lastname      = $('.clientprofile .lastname'),
    email         = $('.clientprofile .email'),
    phone         = $('.clientprofile .phone'),
    photofront    = $('.clientprofile .photofront'),
    photoleft     = $('.clientprofile .photoleft'),
    photoback     = $('.clientprofile .photoback'),
    photoright    = $('.clientprofile .photoright'),
    notes         = $('.clientprofile .notes');
    deleteModal   = $('.deleteModal');

//----------------------------------------------------------------

						 // TEMPLATES

//---------------------------------------------------------------/

//----------------------------------------------------------------

						 // LISTENERS

//---------------------------------------------------------------/
$('.deleteclient').click(function() {
    showDeleteConfirmation();
});

$('.confirmDelete').click(function() {
    deleteClient();
    ClientList.clientListAJAX();
    Nav.slideClientProfile();
});

//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/
function populateProfile(client) {
    console.log(client);
    clientProfile.attr('id', client._id);
    avatar.attr('src', apiurl+'photo/'+client.userid+'/'+client._id+'/photofront.jpg');
    firstname.text(client.firstname);
    lastname.text(client.lastname);
    phone.text(client.phone);
    email.text(client.email);
    photofront.attr('src', apiurl+'photo/'+client.userid+'/'+client._id+'/photofront.jpg');
    photoleft.attr('src', apiurl+'photo/'+client.userid+'/'+client._id+'/photoleft.jpg');
    photoback.attr('src', apiurl+'photo/'+client.userid+'/'+client._id+'/photoback.jpg');
    photoright.attr('src', apiurl+'photo/'+client.userid+'/'+client._id+'/photoright.jpg');
    notes.val(client.notes);
}

function showDeleteConfirmation() {
    deleteModal.modal('show');
}

//----------------------------------------------------------------

						 // LOGIC

//---------------------------------------------------------------/
function deleteClient() {
    var clientid = clientProfile.attr('id');

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:8080/client/delete/" + userid + '/' + clientid,
        "method": "DELETE",
        "headers": {
            "cache-control": "no-cache",
            "Authorization": "Bearer " + jwt
        },
        "processData": false,
        "contentType": false,
    }

    $.ajax(settings)
    .done(function (req, res) {
        if(res === "success") { 
            console.log('success');
        }
    });
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
    populateProfile: populateProfile
}

})(); // END OF LOGIN.JS
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
var clientList    = $('.clientlist'),
    clientProfile = $('.clientprofile');

//----------------------------------------------------------------

						 // TEMPLATES

//---------------------------------------------------------------/

//----------------------------------------------------------------

						 // LISTENERS

//---------------------------------------------------------------/
function addCCListeners() {
    $('.clientcard').each(function() {
        $(this).click(function() {
            ClientProfile.populateProfile(clientlist[$(this).attr('id')]);
            Nav.quickClearSearch();
            clientProfile.animate({
                left: '0'
            }, 500, function() {
                Nav.restoreList();
                clientList.scrollTop(0);
            });
            Nav.hideSearch();
            Nav.showBackBtn();
        })
    })
}

//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/
function displayClients(req) {
    for(var i in req) {
        insertLeadingLetters(req, i);
        clientList.append(`
            <div class="clientcard" id="${i}" data-name="${req[i].firstname} ${req[i].lastname}">
                <div class="avatar">
                    <img src="${apiurl}photo/${userid}/${req[i]._id}/photofront.jpg" height="30">
                </div>
                <span class="firstname">${req[i].firstname}</span>
                <span class="lastname">${req[i].lastname}</span>
            </div>
        `);
    }
    addCCListeners();
}

//----------------------------------------------------------------

						 // LOGIC

//---------------------------------------------------------------/
function insertLeadingLetters(req, i) {
    if (i === '0') 
        clientList.append(`<div class="letter">${req[i].firstname.charAt(0)}</div>`)
    if (i > 0 && i < (req.length) ) {
        if (req[i].firstname.charAt(0) !== req[i-1].firstname.charAt(0))
            clientList.append(`<div class="letter">${req[i].firstname.charAt(0).toUpperCase()}</div>`);
    }
}

//----------------------------------------------------------------

						 // AJAX CALLS

//---------------------------------------------------------------/

/*******************************************
 * Client List -> GET
*******************************************/
function clientListAJAX() {
    cookieCheck();

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:8080/client/all/" + userid,
        "method": "GET",
        "headers": {
            "cache-control": "no-cache",
            "Authorization": "Bearer " + jwt
        },
        "processData": false,
        "contentType": false
    }

    $.ajax(settings)
    .done(function (req, res) {
        if(res === 'success') {
            clientlist = req;
            clientList.empty();
            if(clientlist.length === 0)
                clientList.append('<div class="empty">You don\'t have any clients, <br> Why not click the plus below to get started!</div>');
            else 
                displayClients(req);
        }
    });
}

//----------------------------------------------------------------

						 // MAIN

//---------------------------------------------------------------/

/*******************************************
 * Main Function
*******************************************/
clientListAJAX();

return {
    clientListAJAX: clientListAJAX
}

})(); // END OF LOGIN.JS
(function() {
	
	var PhotoUpload = {

		$src: '',
		$dest: '',

		photoListeners: function() {
			$('.thumbnail').each(function() {

			    $(this).click( function() {

			        var id = $(this).attr('id');
			            PhotoUpload.$src = $('#' + id);
			            PhotoUpload.$dest = $('#select-' + id);
			        
			        PhotoUpload.$dest.click();

			        PhotoUpload.photoUploaded();

			    })
			})
		},

		photoUploaded: function() {

		    PhotoUpload.$dest.change(function(evt) {

		        PhotoUpload.resizeImage(this.files[0])

		    });
		},

		resizeImage: function(img) {

		    ImageTools.resize(img, {

		        width: 320, // maximum width
		        height: 440 // maximum height

		    }, function(blob, didItResize) {

		        PhotoUpload.getPhotoDimensions(blob);

		    });
		},

		getPhotoDimensions: function(blob) {

		    var fr = new FileReader;
		    
		    fr.onload = function() {
		        
		        var img = new Image;
		        
		        img.onload = function() {
		            PhotoUpload.rotatePhoto(img, blob);
		        };

		        img.src = fr.result;
		    };
		    
		    fr.readAsDataURL(blob);
		},

		rotatePhoto: function(img, blob) {

			console.log(blob);

		    if (img.height < img.width) {

		        PhotoUpload.$src.removeClass('default');
		        PhotoUpload.$src.addClass('rotate');

		    } else {

		        PhotoUpload.$src.removeClass('rotate');
		        PhotoUpload.$src.addClass('default');

		    }

		    PhotoUpload.$src.css('background-image', 'url(' + img.src + ')' );
		    PhotoUpload.$src.css('background-size', 'cover');
		}
	};

	PhotoUpload.photoListeners();

})()