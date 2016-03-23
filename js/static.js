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

        });
        //list of categories
        categoriesRef.once("value", function (snap) {
            categories = $.map(snap.val(), function (value, index) {
                return [index];
            });

        });