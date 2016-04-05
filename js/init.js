       function initFire() {
           var users = {
               users: {
                   david: {
                       username: "davidk",
                       friends: {
                           alfred: true,
                           ella: true
                       }
                   },
                   alfred: {
                       username: "alfredb",
                       friends: {
                           david: true
                       }
                   },
                   ella: {
                       username: "elafizt",
                       friends: {
                           david: true
                       }
                   }
               }
           };

           myDataRef.set(users);

           var alfredRef = applicationsRef.child("alfred");

           var application1 = {
               date: "1359807283356",
               state: "ongoing",
               company: "sacpi",
               position: "president director",
               categories: {
                   informatique: true,
                   management: true
               }
           };

           var application3 = {
               date: "1357707283356",
               state: "rejected",
               company: "pectit",
               position: "trader",
               categories: {
                   musique: true
               }
           };

           alfredRef.push().set(application3);
           alfredRef.push().set(application1);

           var dadaRef = applicationsRef.child("david");
           var application2 = {
               date: "1389807283356",
               state: "ongoing",
               company: "pectit",
               position: "web developer",
               categories: {
                   musique: true
               }
           };

           var application4 = {
               date: "1399807283356",
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
               date: "1372807283356",
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
                       alfred: true
                   }
               },
               pectit: {
                   name: "pectit bank",
                   address: "petit lancy",
                   candidates: {
                       david: true,
                       alfred: true
                   }
               },
               nomades: {
                   name: "nomades ateliers",
                   address: "rue des acacias geneve",
                   candidates: {
                       david: true,
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
               prof: true,
               management: true,
               musique: true
           };

           categoriesRef.set(categories);

           var states = {
               accepted: true,
               rejected: true,
               ongoing: true
           };

           statesRef.set(states);

       }