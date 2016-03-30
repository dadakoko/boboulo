        var map;
        var markers = [];
        var geo;
        var geocoder;

        var pinShadow;
        var colorStateMap = new Map();


        function initMap() {
            var myLatlng = {
                lat: -25.363,
                lng: 131.044
            };
            map = new google.maps.Map(document.getElementById('map'), {
                center: myLatlng,
                zoom: 1
            });
            geocoder = new google.maps.Geocoder();
        }

        function initMarkerStateColor() {
            $.each(states, function (index, val) {
                var mImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + allcolors[index].substring(1),
                    new google.maps.Size(21, 34),
                    new google.maps.Point(0, 0),
                    new google.maps.Point(10, 34));
                colorStateMap.set(val, mImage);
            });

            pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
                new google.maps.Size(40, 37),
                new google.maps.Point(0, 0),
                new google.maps.Point(12, 35));

        }


        // Sets the map on all markers in the array.
        function setMapOnAll(map) {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(map);
            }
        }

        // Removes the markers from the map, but keeps them in the array.
        function clearMarkers() {
            setMapOnAll(null);
            markers = [];
        }

        function viewAllMarkers() {
            var bounds = new google.maps.LatLngBounds();
            for (var i = 0; i < markers.length; i++) {
                bounds.extend(markers[i].getPosition());
            }
            map.fitBounds(bounds);
        }


        function geocodeAddress(address, companyName, appState) {
            geocoder.geocode({
                'address': address
            }, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {

                    var ico = colorStateMap.get(appState);

                    var marker = new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location,
                        title: companyName,
                        icon: ico
                            //shadow: pinShadow
                    });
                    var infowindow = new google.maps.InfoWindow({
                        content: companyName
                    });
                    markers.push(marker);
                    marker.addListener('click', function () {
                        infowindow.open(map, marker);
                    });
                    viewAllMarkers();
                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
        }