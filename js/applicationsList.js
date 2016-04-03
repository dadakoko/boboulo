function addApplicationList(appList) {

    var $table = $("#applList");
    $("#applList > *").remove();
    var $panelDefault;

    $.each(appList, function (i, val) {
        console.log(val);

        var cn = val.company.name.replace(" ", "")

        var html = "<tr><td>" + val.company.name + "<small> " + val.state + "  </small></td><td><button data-id='" + i + "' class='delete btn-xs'> Delete </button>" + "</td></tr>";
        var $tr = $($.parseHTML(html));
        $tr.wrap('<a href="#' + cn + '" role="button" data-toggle="collapse" data-parent="#accordion" aria-expanded="true" aria-controls="' + cn + '"></a>');
        var $a = $tr.parent();
        $a.wrap('<h3 class="panel-title"></h3>');
        var $h3 = $a.parent();
        $h3.wrap('<div id="heading"' + cn + '" class="panel-heading" role="tab"></div>');
        var $head = $h3.parent();

        var htmlb = "<p> apply for a position of " + val.position + " on the : " + val.date + "</p>";
        htmlb += "<p> address : " + val.company.address + "</p>";
        var keys = Object.keys(val.company.candidates);
        if (keys.length > 1) {
            htmlb += "<p> other candidates that have apply to " + val.company.name + " are :</p>";
            $.each(keys, function (i, cand) {
                if (cand!=currentUser) {
                    htmlb += "<p>" + cand + "</p>";
                }
            });
        } else {
            htmlb += "<p> nobody else apply to this company!</p>";
        }
        var $trb = $($.parseHTML(htmlb));
        $trb.wrapAll('<div class="panel-body">');
        $trb.parent().wrap('<div role="tabpanel" class="panel-collapse collapse" id="' + cn + '" aria-labelledby="heading' + cn + '"></div>');
        var $body = $trb.parent().parent();

        $table.append($head);
        $head.wrap('<div class="panel panel-default"></div>');
        $body.appendTo($head.parent());

    });

    $("#applList > *").wrapAll('<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true"></div>');

    var $acc = $table.find('#accordion');
    $acc.wrap('<div class="col-xs-12">');
    $acc.before('<h2>Applications List</h2>');



}