$(function () {
    displayLogin();
});

function displayLogin() {
    var user = window.localStorage.getItem("login");
    if (!(user === "" || user === undefined || user === null)) {
        if ($('#welcomeuser') !== undefined) {
            $('#welcomeuser').remove();
        }
        $('#loginnavbar').append('<span id="welcomeuser" style="color:white">welcome ' + user + '!</span>');
    }
}

function addCatApplicationForm() {

    $.each(categories, function (index, val) {
        $('#categoryid')
            .append($("<option></option>").text(val));
    });

}