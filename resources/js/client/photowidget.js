/*******************************************
* © 2017 Hairbrain inc.
* ---------------------
* Created: February 11th 2017
* Last Modified: March 21st 2017
* Author: Charlie Hay
*
* PHOTO COMPONENT JS FUNCTIONALITY.
/******************************************/

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
