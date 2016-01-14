BigList  = new Mongo.Collection("shoppingList");

if (Meteor.isClient) {

  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_EMAIL'
  });

  Meteor.startup(function () {
    // Use Meteor.startup to render the component after the page is ready
    React.render(<App />, document.getElementById("render-target"));
  });
  
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

  Kijiji = Meteor.npmRequire( 'kijiji-scraper' );

  Meteor.methods({  
    'KijijiSearch' : function(keywords) {
      var results;

      Async.runSync(function(done) {
        Kijiji.query(
          {"locationId":"9001"},
          {"keywords": keywords},
          function(error, data) {
            results = data;
            done(error, data);
          });
      });

      return results;
    }
  });

}