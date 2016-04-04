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

    var colorStateMap = new Map();
    var apprefMap = new Map();

    var appList = [];

    //list of companies
    companiesRef.on("value", function (snap) {
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
        $.each(states, function (i, n) {
            colorStateMap.set(n, allcolors[i]);
        });

        //list of categories
        categoriesRef.once("value", function (snap) {
            categories = $.map(snap.val(), function (value, index) {
                return [index];
            });
            addCatApplicationForm();
            initMarkerColor();
        });


    });

    function updatePie() {

        //initFire();

        $.each(categories, function (i, n) {
            appCat[n] = 0;
        });

        $.each(states, function (i, n) {
            appState[n] = 0;
        });

        clearMarkers();

        //currentUser = $("#pieInput").val();

        //currentUser = "luis";
        
        applicationsRef.child(currentUser).on("value", function (snap) {
            $.map(snap.val(), function (value, index) {
                apprefMap.set(value.company, index);
            });
        });


        getSortedApp(currentUser);

    }

    function getSortedApp(name) {
        applicationsRef.child(name).once("value", function (snapshot) {
            appList = [];
            //apprefMap.clear();
            snapshot.forEach(function (data) {
                var a = data.val();
                appState[data.val().state]++;
                $.each(data.val().categories, function (i, n) {
                    appCat[i]++;
                });
                var queryRef = companiesRef.child(data.val().company);
                queryRef.on("value", function (querySnapshot) {
                    var q = querySnapshot.val();
                    geocodeAddress(q.address, q.name, a.state);
                    var comp = new company(q.address, q.name, q.candidates);
                    var app = new application(a.categories, comp, a.date, a.position, a.state);
                    appList.push(app);
                    addApplicationList(appList);
                });
            });

            drawCharts();

        });
    }

    //Entities
    function application(cat, c, da, po, st) {
        this.categories = cat;
        this.company = c;
        this.date = da;
        this.position = po;
        this.state = st;
    }

    function company(add, na, can) {
        this.address = add;
        this.name = na;
        this.candidates = can;
    }

    function user(fr, us) {
        this.friends = fr;
        this.username = us;
    }