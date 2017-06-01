/*******************************************
* © 2017 Hairbrain inc.
* ---------------------
* Created: February 11th 2017
* Last Modified: March 21st 2017
* Author: Charlie Hay
*
* BASE JS FUNCTIONALITY.
/******************************************/

var userid      = decodeURI($.cookie('userid')),
    jwt         = decodeURI($.cookie('jwt')),
    name        = decodeURI($.cookie('name')),
    phone       = decodeURI($.cookie('phone')),
    email       = decodeURI($.cookie('email')),
    salon       = decodeURI($.cookie('salon'));

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
    addFormInputs  = $('.clientaddform input')
    addFormSubmit  = $('.clientaddsubmit'),
    clientAddBtn   = $('.clientadd'),
    closeModal     = $('.closemodal'),
    addClientModal = $('.addmodal'),
    firstname      = $('.clientaddform input[name="firstname"]'),
    lastname       = $('.clientaddform input[name="lastname"]'),
    phone          = $('.clientaddform input[name="phone"]')
    notes          = $('.clientaddform textarea[name="notes"]'),
    photofront     = $('.clientaddform input[name="photofront"]'),
    thumbFront     = $('#photo-front'),
    loadingGif     = $('.savingclient');

//----------------------------------------------------------------

						 // TEMPLATES

//---------------------------------------------------------------/


//----------------------------------------------------------------

						 // LISTENERS

//---------------------------------------------------------------/
clientAddForm.submit( function(e) {
    e.preventDefault();
    showLoading();
    clientAddFormAJAX();
    emptyAddForm();
});

clientAddBtn.click( function() {
    countValidInputs();
    addClientModal.modal('show');
});

closeModal.click( function() {
    emptyAddForm();
});

// Doesn't allow form submit on enter press.
$(document).keypress(":input:not(textarea)", function(event) {
    return event.keyCode != 13;
});

// Listens for change on each input. NOTE:Doesn't listen to textarea.
addFormInputs.not('input[type="button"]').change(function() {
    countValidInputs();
});


//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/
function showLoading() {
    loadingGif.show();
}

function hideLoading() {
    loadingGif.hide();
}

//----------------------------------------------------------------

						 // LOGIC

//---------------------------------------------------------------/
function emptyAddForm() {
    addFormInputs.each(function() {
        $(this).val('');
    })
    notes.val('');
    $('#photo-front').css('background', 'none');
}

function countValidInputs() {
    var numInputs   = addFormInputs.length;
    var validInputs = 0; 
    addFormInputs.each(function() {
        if ( $(this).val() !== '') {
            validInputs++;
        }
    })
    toggleSubmitBtn(validInputs, numInputs);
}

function toggleSubmitBtn(valid, total) {
    if( valid === total )
        addFormSubmit.prop('disabled', false);
    else 
        addFormSubmit.prop('disabled', true);
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
    form.append("phone", phone.val());
    form.append("notes", notes.val());
    form.append("photofront", photofront[0].files[0], 'photofront.jpg');
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
    "data": form
    }

    $.ajax(settings)
    .done(function (req, res) {
        if(res === "success") { 
            ClientList.clientListAJAX();
            emptyAddForm();
            addClientModal.modal('hide');
            hideLoading();
        }
    });
}

//----------------------------------------------------------------

						 // MAIN

//---------------------------------------------------------------/

/*******************************************
 * Main Function
*******************************************/
(function() {
    // validateform();
})();
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

reportIssue.click(function() {
    $('.issueModal').modal('show');
    closeMenu();
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
		top: 50
	}, 300);
	menuOverlay.animate({
		opacity: 1
	}, 300);
	menuItems.addClass('open');
}

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
var hamburger     = $('.hamburger'),
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
hamburger.click(function() {
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
    searchField.hide();
}

function showSearch() {
	navSearch.fadeIn();
    searchField.show();
}

function showbackBtn() {
	exitProfile.fadeIn();
}

function hideBackBtn() {
	exitProfile.fadeOut();
}

function slideSearchOpen() {
	var windowWidth = $(window).width() - 40;
	hamburger.fadeOut(300);
	navLogo.fadeOut(300);
	cancelSearch.fadeIn(300);
	fadeOutLetters();
	searchField.addClass('open');
	navSearch.animate({
		right: '+=' + (windowWidth - 10) + 'px'
	}, 300, function() {
		searchField.show();
        searchField.focus();
	})
}

function slideSearchClosed() {
    searchField.blur();
	var windowWidth = $(window).width() - 40;
	hamburger.fadeIn(300);
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
	hamburger.fadeIn();
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
	navSearch.css('right', (windowWidth - 10));
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
    clientProfile.attr('id', client._id);
    avatar.attr('src', apiurl+'photo/'+client.userid+'/'+client._id+'/avatar.jpg');
    firstname.text(client.firstname);
    lastname.text(client.lastname);
    phone.html('<a href="tel:' + client.phone + '">' + client.phone + '</a>');
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
        "url": apiurl + "client/delete/" + userid + '/' + clientid,
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
            // Success
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
    cookieCheck();

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
        "contentType": false
    }

    $.ajax(settings)
    .done(function (req, res) {
        if(res === 'success') {
            clientlist = req;
            clientList.empty();
            if(clientlist.length === 0)
                clientList.append('<div class="empty">You don\'t have any clients, <br> Click the \'+\' below to get started!</div>');
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

// http://stackoverflow.com/questions/23945494/use-html5-to-resize-an-image-before-upload
// Answer # 69 is the reference you wanna check ;)

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

		    if (img.height < img.width) {

		        PhotoUpload.$src.removeClass('default');
		        PhotoUpload.$src.addClass('rotate');

		    } else {

		        PhotoUpload.$src.removeClass('rotate');
		        PhotoUpload.$src.addClass('default');

		    }

		    PhotoUpload.$src.css('background', 'url(' + img.src + ') no-repeat center' );
		    PhotoUpload.$src.css('background-size', 'cover');

            console.log(img.src);
		}
	};

	PhotoUpload.photoListeners();

})()
/*******************************************
* © 2017 Hairbrain inc.
* ---------------------
* Created: February 11th 2017
* Last Modified: March 21st 2017
* Author: Charlie Hay
*
* PHOTO COMPONENT JS FUNCTIONALITY.
/******************************************/

var PhotoWidget = (function() {
    
    var thumbFront   = $('.thumbfront'),
        thumbArray   = [thumbFront],
        currentFocus = thumbFront; 

    for(var thumb in thumbArray) {
        thumbArray[thumb].click(function() {
            expandPhoto($(this));
        })
    }

    function expandPhoto($this) {
        currentFocus.removeClass('focus');
        $this.addClass('focus');
        currentFocus = $this;
    }

})(); // END OF PHOTO WIDGET

var ReportIssue = (function() {

$('.confirmReport').click(function() {
    submitForm();
});

function submitForm() {
    var form = new FormData();
    form.append("name", name);
    form.append("phone", phone);
    form.append("email", email);
    form.append("salon", salon);
    form.append("issue", $('.issueform').val());

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://script.google.com/macros/s/AKfycbxwK0uSZtglD0qBQKwqNOzfM-1JDMjIusr4FL3i6bkpAkL-QCOH/exec",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "data": form
    }

    $.ajax(settings)
    .done(function (req, res) {
        if(res === "success") { 
            // Success
        }
    });
}

})();
/*******************************************
* © 2017 Hairbrain inc.
* ---------------------
* Created: February 11th 2017
* Last Modified: March 21st 2017
* Author: Charlie Hay
*
* NAV COMPONENT JS FUNCTIONALITY.
/******************************************/

var ProfileModal = (function() {

//----------------------------------------------------------------

						 // CACHE

//---------------------------------------------------------------/

/*******************************************
 * Global Variables
*******************************************/
var profilemodal = $('.profilemodal');
var profilephoto = $('.profilemodal #profilephoto');
var profilename  = $('.profilemodal #name');
var profilephone  = $('.profilemodal #phone');
var profileemail = $('.profilemodal #phone');
var profilesalon = $('.profilemodal #salon');


//----------------------------------------------------------------

						 // TEMPLATES

//---------------------------------------------------------------/

//----------------------------------------------------------------

						 // LISTENERS

//---------------------------------------------------------------/



//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/
function setPhoto() {
    profilephoto.attr('src', '');
}

function setName() {
    profilename.text(name);
}

function setPhone() {
    profilephone.text(phone);
}

function setEmail() {
    profileemail.text(email);
}
function setSalon() {
    profilesalon.text(salon);
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
    setPhoto();
    setName();
    setPhone();
    setEmail();
    setSalon();
})();

})(); // END OF NAV.JS