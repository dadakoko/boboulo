$(function () {

    ///////////////////////////////////////////
    //initFire();

    google.charts.load('current', {
        'packages': ['corechart']
    });

    $("#pieBtn").click(updatePie);

    function updatePie() {

        var appCat = [];
        $.each(categories, function (i, n) {
            appCat[n] = 0;
        });

        var appState = [];
        $.each(states, function (i, n) {
            appState[n] = 0;
        });

        clearMarkers();


        var appPerCategories = [];
        var appPerState = [];
        var name = $("#pieInput").val();

        appPerCategories.push(['Applications', 'number of app per categories']);
        appPerState.push(['Applications', 'number of app per state']);


        applicationsRef.child(name).once("value", function (snapshot) {

            snapshot.forEach(function (data) {
                console.log(name + " applications : company : " + data.val().company);
                appState[data.val().state]++;
                $.each(data.val().categories, function (i, n) {
                    console.log(name + " category : " + i);
                    var tmp = [i, appCat[i]++];
                });
                var queryRef = companiesRef.child(data.val().company);
                queryRef.on("value", function (querySnapshot) {
                    console.log(name + " applications pour company : " + querySnapshot.val().name + " a: " + querySnapshot.val().address);
                    geocodeAddress(querySnapshot.val().address, querySnapshot.val().name,data.val().state);
                });
            });

            for (var i in appCat) {
                var tmp = [i, appCat[i]];
                appPerCategories.push(tmp);
            }

            for (var i in appState) {
                var tmp = [i, appState[i]];
                appPerState.push(tmp);
            }

            var data = google.visualization.arrayToDataTable(appPerState);

            var c = allcolors.slice(0, states.length);

            var options = {
                title: 'So how are your applications?',
                is3D: true,
                colors: c
            };

            var chart = new google.visualization.PieChart(document.getElementById('piechart'));

            chart.draw(data, options);


        });



    }

    ////////////////////////////////////////////////

})