var airport = {
  city: "San Francisco",                  // Airport's city
  state: "California",                    // Airport's state
  IATA: "SFO",                            // IATA code
  ICAO: "KSFO",                            // ICAO code
  weather: {
    wind: "West at 13.8mph",              // Wind Direction/Speed
    weather: "A Few Clouds",              // Human Readable Weather Info
    temp: "77.0 F (25.0 C)",              // Temperature
    visibility: 10                        // Visibility in miles
  },
  delay: true,                            // Airport's delay status
  name: "San Francisco International",    // Airport's full name
  status: {
    minDelay: "10 minutes",               // Minimum Flight Delay
    maxDelay: "168 minutes",              // Maximum Delay
    avgDelay: "58 minutes",               // Average Delay
    type: "Ground Delay",                 // Type of Delay
    reason: "RWY-TAXI CONSTRUCTION"       // Reason for Delay
  },
}

console.log("bla "+airport.weather.temp);


var ref = new Firebase('https://publicdata-parking.firebaseio.com');
var geoFire = new GeoFire(ref.child('garages'));
var location = [37.8197, -122.4786];
var distance = 6;
var geoQuery = geoFire.query({
  center: location,
  radius: distance
});
geoQuery.on("key_entered", function(id, location) {
    console.log("Found a garage: " + id);
});


var user = {
  updated: "31-12-2015",                  // a timestamp of the last update
  username: "California",                    // a name for the user
  application: {                             
    company: {
        friendlyName: "sacpi",              // a name for a company
        points: {
            latitude: "0.0",                // latitude of the location
            longitude:"0.0"                 // longitude of the location
        },                
        address: "avenue blanc geneve"      //address of the company
    },             
    date: "10-07-1971",                     // a timestamp of the application creation
    state: "ongoing",                       // current state of the application
  },
}

{
    $user: {
        _updated: String,               // A timestamp of the last update.
        _username: String,              // a name for the user
        $applications: {                // A list of applications
                company: [
                    friendlyName: String,   // A name for this company
                    points: [
                        Number,             // Latitude of location
                        Number             // Longitude of location
                    ]
                ],
                date: String,           //date when the application was sent
                state: String           //state of the application: ongoing, rejected, success
        }
    }
}


{
    san_francisco: {
        _credits: String,               // The source of the data.
        _updated: String,               // A timestamp of the last update.
        (garages, streets): {            // A list of garages or streets
            $location: {
                friendlyName: String,   // A name for this location
                open_spaces: String,    // The number of open parking spaces
                total_spaces: String,   // The number of total parking spaces
                points: [
                    Number,             // Latitude of location
                    Number             // Longitude of location
                ],
                rates: {                // Pricing info for location
                    $time: {
                        BEG: String,    // Begin time
                        END: String,    // End time
                        RATE: String,   // Dollar rate
                        RQ: String      // Type of rate (i.e. Per Hour)
                    }
                }
                hours: {                // Operating hours for location
                    $time: {
                        BEG: String,    // Begin time
                        END: String,    // End time
                        FROM: String,   // A day of the week
                        TO: String      // A day of the week
                    }
                }
            }
        }
    }
}


