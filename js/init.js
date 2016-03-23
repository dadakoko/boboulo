       function initFire() {
           var users = {
               users: {
                   dadakoko: {
                       username: "California",
                       friends: {
                           luis: true,
                           ella: true
                       }
                   },
                   luis: {
                       username: "luisb",
                       friends: {
                           dadakoko: true
                       }
                   },
                   ella: {
                       username: "elafizt",
                       friends: {
                           dadakoko: true
                       }
                   }
               }
           };

           myDataRef.set(users);

           var luisRef = applicationsRef.child("luis");

           var application1 = {
               date: "10/07",
               state: "ongoing",
               company: "sacpi",
               position: "president director",
               categories: {
                   informatique: true,
                   management: true
               }
           };

           var application3 = {
               date: "10/10",
               state: "rejected",
               company: "pectit",
               position: "trader",
               categories: {
                   shark: true
               }
           };

           luisRef.push().set(application3);
           luisRef.push().set(application1);

           var dadaRef = applicationsRef.child("dadakoko");
           var application2 = {
               date: "23/10",
               state: "ongoing",
               company: "pectit",
               position: "web developer",
               categories: {
                   shark: true
               }
           };

           var application4 = {
               date: "31/12",
               state: "accepted",
               company: "nomades",
               position: "prof",
               categories: {
                   prof: true,
                   informatique: true
               }
           };

           dadaRef.push().set(application4);
           dadaRef.push().set(application2);

           var ellaRef = applicationsRef.child("ella");
           var application5 = {
               date: "31/12",
               state: "accepted",
               company: "nomades",
               position: "prof",
               categories: {
                   prof: true,
                   informatique: true
               }
           };

           ellaRef.push().set(application5);

           var companies = {
               sacpi: {
                   name: "sacpi SA",
                   address: "prilly",
                   candidates: {
                       luis: true
                   }
               },
               pectit: {
                   name: "pectit bank",
                   address: "petit lancy",
                   candidates: {
                       dadakoko: true,
                       luis: true
                   }
               },
               nomades: {
                   name: "nomades ateliers",
                   address: "rue des acacias geneve",
                   candidates: {
                       dadakoko: true,
                       ella: true
                   }
               },
               victoria: {
                   name: "victoria hall",
                   address: "plainpalais geneve",
                   candidates: {}
               }
           };

           companiesRef.set(companies);

           var categories = {
               informatique: true,
               shark: true,
               prof: true,
               cascade: true,
               management: true,
               music: true
           };

           categoriesRef.set(categories);

           var states = {
               accepted: true,
               rejected: true,
               ongoing: true
           };

           statesRef.set(states);

       }