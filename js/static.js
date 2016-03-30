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

        var allcolors = ["#FFFFFF", "#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395",
            "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#5574a6", "#3b3eac", "#b77322",
            "#16d620", "#b91383", "#f4359e", "#9c5935", "#a9c413", "#2a778d", "#668d1c", "#bea413", "#0c5922", "#743411"];

    
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
            initColor();

        });
        //list of categories
        categoriesRef.once("value", function (snap) {
            categories = $.map(snap.val(), function (value, index) {
                return [index];
            });

        });