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
}


