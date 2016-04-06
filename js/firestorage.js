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
        addStatesModal();
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
            currentUser = window.localStorage.getItem("login");
            if (!(currentUser === "" || currentUser === undefined || currentUser === null)) {
                updatePie();
            }
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

        applicationsRef.child(currentUser).on("value", function (snap) {
            $.map(snap.val(), function (value, index) {
                apprefMap.set(value.company.toLowerCase(), index);
            });
        });


        getSortedApp(currentUser);

    }

    function updatePieWithPeriod(from, to) {

        if (from === undefined) {
            return;
        }
        if (to === undefined) {
            return;
        }

        $.each(categories, function (i, n) {
            appCat[n] = 0;
        });

        $.each(states, function (i, n) {
            appState[n] = 0;
        });

        clearMarkers();
        apprefMap.clear();

        applicationsRef.child(currentUser)
            .on("value", function (snap) {
                $.map(snap.val(), function (value, index) {
                    apprefMap.set(value.company.toLowerCase(), index);
                });
            });


        getSortedAppWithPeriod(currentUser, from, to);

    }

    function getSortedAppWithPeriod(name, from, to) {

        applicationsRef.child(name)
            .once("value", function (snapshot) {
                appList = [];
                snapshot.forEach(function (data) {
                    var a = data.val();
                    console.log(a.date + " " + from + " " + to);
                    if (a.date < to && a.date > from) {
                        appState[data.val().state]++;
                        $.each(data.val().categories, function (i, n) {
                            appCat[i]++;
                        });
                        var queryRef = companiesRef.child(data.val().company);
                        queryRef.on("value", function (querySnapshot) {
                            var q = querySnapshot.val();
                            geocodeAddress(q.address, q.name, a.state);
                            var comp = new company(q.address, q.name,q.fullname, q.candidates);
                            var app = new application(a.categories, comp, a.date, a.position, a.state);
                            appList.push(app);
                            addApplicationList(appList);
                        });
                    }
                });

                drawCharts();

            });
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
                    var comp = new company(q.address, q.name, q.fullname, q.candidates);
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

    function company(add, na, fn, can) {
        this.address = add;
        this.name = na;
        this.fullname = fn;
        this.candidates = can;
    }

    function user(fr, us) {
        this.friends = fr;
        this.username = us;
    }