// c.f. https://meteorhacks.com/extending-meteor-accounts

var bcrypt = NpmModuleBcrypt;
var bcryptCompare = Meteor.wrapAsync(bcrypt.compare);

Accounts.registerLoginHandler(function(loginRequest) {

  if (!loginRequest.password || !loginRequest.username) {
    return undefined;
  }

  eliteUser = eliteUsers.filter(function(user) {
    return user.UserName == loginRequest.username;
  })[0];

  if (!eliteUser)
    throw new Meteor.Error(403, "User not found");

  if (!bcryptCompare(loginRequest.password, eliteUser.Password))
    throw new Meteor.Error(403, "Incorrect password");

  if (eliteUser.Active === 0) {
    console.log('user not active');
    throw new Meteor.Error(403, "User not active");
  }

  var userId = null;
  var existingUser = Meteor.users.findOne({username: loginRequest.username});
  if (existingUser) {
    userId = existingUser._id;
  } else {
    var user = {
      username: loginRequest.username,
      profile: eliteUser,
    };
    userId = Accounts.insertUserDoc({}, user);
  }

  return {
    userId: userId
  }

});
