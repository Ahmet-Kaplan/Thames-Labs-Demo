Meteor.loginWithElite = function(username, password, callback) {

  if (Meteor.user()) Meteor.logout();

  var loginRequest = {
    username: username,
    password: password
  };

  Accounts.callLoginMethod({
    methodArguments: [loginRequest],
    userCallback: function(error) {
      if (error) {
        callback && callback(error);
      } else {
        callback && callback();
      }
    }
  });

};
