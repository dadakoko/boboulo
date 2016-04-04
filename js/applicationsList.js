       $("#sendapplication").submit(function (event) {
           var compname = $("#compname").val();
           var address = $("#address").val();
           var contactname = $("#contactname").val();
           var areacode = $("#areacode").val();
           var telnum = $("#telnum").val();
           var emailid = $("#emailid").val();
           var categories = $("#categoryid").val();
           var letter = $("#letter").val();
           var date = now();


           //first add the company that is not stored yet
           function findCompany(comp) {
               return comp === compname;
           }

           if (companies.find(findCompany) === undefined) {

               var text = '{ "' + compname + '" : ' +
                   '{ "name":"' + compname.toUpperCase() + '" , "address":"' + address + '" } }';

               var company = JSON.parse(text);

               companiesRef.update(company);

           }

           //second: add dadakoko as a candidate
           var utxt = '{ "' + currentUser + '":true }';
           var user = JSON.parse(utxt);

           companiesRef.child(compname).child("candidates").update(user);

           //finally: add the application
           var cat = ' "categories" : {';
           $.each(categories, function (i, val) {
               cat += ' "' + val + '":true,';
           });
           cat = cat.slice(0, -1);
           cat += ' }';

           var atext = '{ "date":"' + date + '", "state":"ongoing", ' +
               ' "company":"' + compname + '" , "position":"' + letter + '" ,' + cat;
           atext += '}';

           var application = JSON.parse(atext);

           applicationsRef.child(currentUser).push().set(application);


       });

       function now() {
           var today = new Date();
           var dd = today.getDate();
           var mm = today.getMonth() + 1; //January is 0!
           var yyyy = today.getFullYear();

           if (dd < 10) {
               dd = '0' + dd
           }

           if (mm < 10) {
               mm = '0' + mm
           }

           today = mm + '/' + dd + '/' + yyyy;
           return today;
       }

       var $table = $("#applList");

       function addApplicationList(appList) {

           $("#applList > *").remove();
           var $panelDefault;

           $.each(appList, function (i, val) {
               var cn = val.company.name.replace(" ", "");

               var html = "<tr><td>" + val.company.name +"</td></tr>";
               var $tr = $($.parseHTML(html));
               $tr.wrap('<a href="#' + cn + '" role="button" data-toggle="collapse" data-parent="#accordion" aria-expanded="true" aria-controls="' + cn + '"></a>');
               var $a = $tr.parent();
               var $stateBtn = $($.parseHTML("<small data-id='" + val.company.name + i + "' class='state' style='color:" + colorStateMap.get(val.state) + "'> " + val.state + "  </small>"));
               var $trash = $($.parseHTML("<a data-id='" + val.company.name + i + "' class='delete glyphicon glyphicon-trash btn-xs'></a>"));
               $a.wrap('<h3 class="panel-title"></h3>');
               var $h3 = $a.parent();
               $stateBtn.appendTo($h3);
               $trash.appendTo($h3);
               $h3.wrap('<div id="heading"' + cn + '" class="panel-heading" role="tab"></div>');
               var $head = $h3.parent();

               var htmlb = "<p> apply for a position of " + val.position + " on the : " + val.date + "</p>";
               htmlb += "<p> address : " + val.company.address + "</p>";
               var keys = Object.keys(val.company.candidates);
               if (keys.length > 1) {
                   htmlb += "<p> other candidates that have apply to " + val.company.name + " are :</p>";
                   $.each(keys, function (i, cand) {
                       if (cand != currentUser) {
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

       $table.on("click", "a.delete", function () {
           var index = $(this).attr("data-id");
           //deleteEntry(index);
           console.log("delete "+index);
       })

       $table.on("click", "small.state", function () {
           var index = $(this).attr("data-id");
           //deleteEntry(index);
           console.log("state "+index);
       })