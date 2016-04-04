
function addCatApplicationForm() {

    $.each(categories, function (index, val) {
        $('#categoryid')
            .append($("<option></option>").text(val));
    });

}