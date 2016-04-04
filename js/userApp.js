function addCatApplicationForm() {

    $.each(categories, function (index, val) {
        $('#categoryid')
            .append($("<option></option>").text(val));
    });

}

$("#filterid").click(function () {
    var from = $("#from").val();
    var to = $("#to").val();
    updatePieWithPeriod(new Date(from).getTime(),new Date(to).getTime());
});

$(function () {
    $("#from").datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 3,
        onClose: function (selectedDate) {
            $("#to").datepicker("option", "minDate", selectedDate);
        }
    });
    $("#to").datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 3,
        onClose: function (selectedDate) {
            $("#from").datepicker("option", "maxDate", selectedDate);
        }
    });
});