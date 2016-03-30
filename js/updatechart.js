    ///////////////////////////////////////////

    google.charts.load('current', {
        'packages': ['corechart']
    });
    var appCat = [];
    var appState = [];

    $("#pieBtn").click(updatePie);

    function drawChart() {

        var appPerCategories = [];
        var appPerState = [];
        appPerCategories.push(['Applications per categories', 'number of app per categories']);
        appPerState.push(['Applications per state', 'number of app per state']);

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

    }


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

    ////////////////////////////////////////////////