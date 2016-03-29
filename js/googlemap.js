        var map;
        var markers = [];
        var myLatlng = {
            lat: -25.363,
            lng: 131.044
        };
        var geo;
        var geocoder;

        function initMap() {
            map = new google.maps.Map(document.getElementById('map'), {
                center: myLatlng,
                zoom: 4
            });

            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                title: 'Click to zoom'
            });

            marker.addListener('click', function () {
                map.setZoom(8);
                map.setCenter(marker.getPosition());
            });

            geocoder = new google.maps.Geocoder();

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


        function geocodeAddress(address, companyName) {
            geocoder.geocode({
                'address': address
            }, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    //map.setCenter(results[0].geometry.location);
                    //map.setZoom(12);
                    var marker = new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location,
                        title: companyName
                    });
                    markers.push(marker);
                    viewAllMarkers();
                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
        }

        document.getElementById("btn").addEventListener("click", function () {
            geocodeAddress("marinduque philippines", "bla");
        });

        var x = -25;
        var y = 133;

        function addMarker() {
            var marker = new google.maps.Marker({
                position: {
                    lat: x++,
                    lng: y++
                },
                map: map,
                title: 'Click to zoom'
            });
        }