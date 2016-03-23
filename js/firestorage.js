                //list of all applications (company name and position) for a user
                applicationsRef.child("luis").on("child_added", function (snapshot) {
                    console.log("luis applications : " + snapshot.val().company + " " + snapshot.val().position);
                }, function (errorObject) {
                    console.log("The read failed: " + errorObject.code);
                });

                applicationsRef.child("dadakoko").on("child_added", function (snapshot) {
                    console.log("david applications : " + snapshot.val().company + " " + snapshot.val().position);
                });

                //list of all applications (company name and address) for a user
                applicationsRef.child("dadakoko").on("value", function (snapshot) {
                    snapshot.forEach(function (data) {
                        var queryRef = companiesRef.child(data.val().company);
                        queryRef.on("value", function (querySnapshot) {
                            console.log("david applications pour company : " + querySnapshot.val().name + " a: " + querySnapshot.val().address);
                        });
                    });
                });


        /*
                //dadakoko add a new application
                //first add the company that is not stored yet
                var cern = {
                    cern: {
                        name: "CERN",
                        address: "meyrin"
                    }
                };
                companiesRef.update(cern);
                //second: add dadakoko as a candidate
                companiesRef.child("cern").child("candidates").update({
                    "dadakoko": true
                });
                //finally: add the application
                var application6 = {
                    date: "31/12",
                    state: "ongoing",
                    company: "cern",
                    position: "particule elementaire",
                    categories: {
                        cascade: true
                    }
                };
                applicationsRef.child("dadakoko").push().set(application6);
        */
