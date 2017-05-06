function loadScript() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDHI1kN2owdq5XTq4aRtLkWD_d4rUoLFaA&libraries=places&callback=initialize';
    document.body.appendChild(script);
}

function initialize() {

    // Global Variables.
    var map = new google.maps.Map(document.getElementById('map'), mapSettings());
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    var image = imageSettings();

    setUI();
    setListeners();

    function setUI() {
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    }

    function setListeners() {
        
        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
            searchBox.setBounds(map.getBounds());
        });

        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
            placesChanged();
        });
    }

    function placesChanged() {
        var markers = [];
        var places = searchBox.getPlaces();

        if (places.length == 0) return;

        // Clear out the old markers.
        markers.forEach(function(marker) { marker.setMap(null) });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        
        places.forEach(function(place) {
            if (!place.geometry) return;

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
                animation: google.maps.Animation.DROP,
                map: map,
                icon: image,
                title: place.name,
                position: place.geometry.location
            }));

            if (place.geometry.viewport)
                bounds.union(place.geometry.viewport);
            else
                bounds.extend(place.geometry.location);
        });
        map.fitBounds(bounds);
    }

    function mapSettings() {
        return {
            center: {lat: 42.9854508, lng: -81.2492824 },
            styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#cccccc"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}],
            zoom: 12, // Default Zoom
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false,
            scrollwheel: true, 
            disableDoubleClickZoom: false,
        }
    };

    function imageSettings() {
        return {
            url: '/app/img/marker.png',
            size: new google.maps.Size(96, 96),
            scaledSize: new google.maps.Size(32, 32),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 32)
        }
    }
}

(function() {
    loadScript();
})();