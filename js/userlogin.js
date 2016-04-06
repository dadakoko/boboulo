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

var currentUser;

$("#loginmodalsubmit").click(function () {
    $('#loginModal').modal('toggle');
    currentUser = $("#loginEmail").val();
    window.localStorage.setItem("login", currentUser);
    displayLogin();
    $('#loginform').trigger("reset");
    updatePieWithPeriod(0,Number.MAX_SAFE_INTEGER);
});