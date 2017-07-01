/*******************************************
* © 2017 Hairbrain inc.
* ---------------------
* Created: February 11th 2017
* Last Modified: June 6th 2017
* Author: Charlie Hay
*
* MAP PAGE JS FUNCTIONALITY.
/******************************************/

var MapPage = (function() {

//----------------------------------------------------------------

						 // CACHE

//---------------------------------------------------------------/
var map;
var vicPark   = { lat: 42.9889338, lng: -81.250762 };
var icon = { url: '/app/img/pin.svg', 
    size:       new google.maps.Size(40, 40),
    origin:     new google.maps.Point(0, 0),
    anchor:     new google.maps.Point(0, 32),
    scaledSize: new google.maps.Size(40, 40)
};


//----------------------------------------------------------------

						 // TEMPLATES

//---------------------------------------------------------------/


//----------------------------------------------------------------

						 // LISTENERS

//---------------------------------------------------------------/


//----------------------------------------------------------------

						 // VIEWS

//---------------------------------------------------------------/
function addMarker(position) {
    new google.maps.Marker({
        position: position,
        map: map,
        animation: google.maps.Animation.DROP,
        icon: icon
    });
}

function initPlacesInput() {
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
}

//----------------------------------------------------------------

						 // LOGIC

//---------------------------------------------------------------/
function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: vicPark,
          zoom: 15,
          styles: [{"elementType":"geometry","stylers":[{"color":"#fdfaff"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#666666"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f5f5"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f8f7f9"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#bbf8bc"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#666666"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#f4f1f6"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#666666"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#f3f1f6"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#666666"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ebeaec"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#666666"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#c0e0ff"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]}],
          clickableIcons: false,
          gestureHandling: 'greedy'
        });
        addMarker(vicPark);
        initPlacesInput();
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

        // GOOGLE MAPS CALLED FROM SCRIPT TAG IN MAPS/INDEX.HTML
        initMap();

    })();

    return {

    }

})(); // END OF MAP.JS