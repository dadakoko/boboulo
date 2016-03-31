    var myDataRef = new Firebase('https://d4riwejbb99.firebaseio-demo.com/');
    var applicationsRef = myDataRef.child("applications");
    var companiesRef = myDataRef.child("companies");
    var categoriesRef = myDataRef.child("categories");
    var statesRef = myDataRef.child("states");
    var usersRef = myDataRef.child("users");

    var companies;
    var users;
    var states;
    var categories;

   $("#pieBtn").click(updatePie);

    //list of companies
    companiesRef.once("value", function (snap) {
        companies = $.map(snap.val(), function (value, index) {
            return [index];
        });

    });
    //list of users
    usersRef.once("value", function (snap) {
        users = $.map(snap.val(), function (value, index) {
            return [index];
        });

    });
    //list of states
    statesRef.once("value", function (snap) {
        states = $.map(snap.val(), function (value, index) {
            return [index];
        });
        //list of categories
        categoriesRef.once("value", function (snap) {
            categories = $.map(snap.val(), function (value, index) {
                return [index];
            });
            initMarkerColor();
        });

        
    });

    function updatePie() {

        $.each(categories, function (i, n) {
            appCat[n] = 0;
        });

        $.each(states, function (i, n) {
            appState[n] = 0;
        });

        clearMarkers();

        getSortedApp($("#pieInput").val());

    }

    function getSortedApp(name) {
        applicationsRef.child(name).once("value", function (snapshot) {
            snapshot.forEach(function (data) {
                appState[data.val().state]++;
                $.each(data.val().categories, function (i, n) {
                    appCat[i]++;
                });
                var queryRef = companiesRef.child(data.val().company);
                queryRef.on("value", function (querySnapshot) {
                    geocodeAddress(querySnapshot.val().address, querySnapshot.val().name, data.val().state);
                });
            });

            drawCharts();

        });
    }