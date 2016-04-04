    ///////////////////////////////////////////


    google.charts.load('current', {
        'packages': ['corechart']
    });
    var appCat = [];
    var appState = [];

 

    function drawCharts() {

        var appPerCategories = [];
        var appPerState = [];
        appPerCategories.push(['Applications per categories', 'number of app per categories']);
        appPerState.push(['Applications per state', 'number of app per state']);

        for (var i in appCat) {
            var tmp = [i, appCat[i]];
            appPerCategories.push(tmp);
        }

        for (var item in appState) {
            var tmp = [item, appState[item]];
            appPerState.push(tmp);
        }

        
        drawChart('piechartCategory', appPerCategories, allcolors.slice(states.length, states.length + categories.length));
        drawChart('piechartState', appPerState, allcolors.slice(0, states.length));

    }

    function drawChart(pieId, appPer, color) {
        var data = google.visualization.arrayToDataTable(appPer);

        var options = {
            is3D: true,
            colors: color
        };

        var chart = new google.visualization.PieChart(document.getElementById(pieId));

        chart.draw(data, options);
    }


    ////////////////////////////////////////////////