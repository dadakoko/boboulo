$(function () {

    ///////////////////////////////////////////
    google.charts.load('current', {
        'packages': ['corechart']
    });
    //google.charts.setOnLoadCallback(drawChart);


    $("#pieBtn").click(updatePie);

    function updatePie() {

        var appCat = [];
        $.each(categories, function (i, n) {
            appCat[n] = 0;
        })


        var appPerCategories = [];
        var name = $("#pieInput").val();

        appPerCategories.push(['Applications', 'number of app per categories']);


        applicationsRef.child(name).once("value", function (snapshot) {

            snapshot.forEach(function (data) {
                console.log(name + " applications : company : " + data.val().company);
                $.each(data.val().categories, function (i, n) {
                    console.log(name + " category : " + i);
                    var tmp = [i, appCat[i]++];
                });
                var queryRef = companiesRef.child(data.val().company);
                queryRef.on("value", function (querySnapshot) {
                    console.log(name + " applications pour company : " + querySnapshot.val().name + " a: " + querySnapshot.val().address);
                });
            });

            for (var i in appCat) {
                var tmp = [i, appCat[i]];
                appPerCategories.push(tmp);
            }

            $.each(appCat, function (i, n) {
                var tmp = [i, n];
                appPerCategories.push(tmp);
            });



            var data = google.visualization.arrayToDataTable(appPerCategories);

            var options = {
                title: 'My applications',
                is3D: true,
            };

            var chart = new google.visualization.PieChart(document.getElementById('piechart'));

            chart.draw(data, options);


        });



    }

    ////////////////////////////////////////////////

})