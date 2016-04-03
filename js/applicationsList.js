function addApplicationList(appList) {

    var $table = $("#applList");
    $("#applList > *").remove();
    var $panelDefault;

    $.each(appList, function (i, val) {
        console.log(val);

        var html = "<tr><td>" + val.company + "<small> Company blabla  </small></td><td><button data-id='" + i + "'class='delete btn-xs'> Delete </button>" + "</td></tr>";
        var $tr = $($.parseHTML(html));
        $tr.wrap('<a href="#' + val.company + '" role="button" data-toggle="collapse" data-parent="#accordion" aria-expanded="true" aria-controls="' + val.company + '"></a>');
        var $a = $tr.parent();
        $a.wrap('<h3 class="panel-title"></h3>');
        var $h3 = $a.parent();
        $h3.wrap('<div id="heading"' + val.company + '" class="panel-heading" role="tab"></div>');
        var $head = $h3.parent();

        var htmlb = "<p> apply for a position of " + val.position + " on the : " + val.date + "</p>";
        var $trb = $($.parseHTML(htmlb));
        $trb.wrap('<div class="panel-body">');
        $trb.parent().wrap('<div role="tabpanel" class="panel-collapse collapse in" id="' + val.company + '" aria-labelledby="heading' + val.company + '"></div>');
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