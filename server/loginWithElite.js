// c.f. https://meteorhacks.com/extending-meteor-accounts

//Behind-the-scenes Node utilities (wrapped for Meteor)
var bcrypt = NpmModuleBcrypt;
var bcryptCompare = Meteor.wrapAsync(bcrypt.compare);

//Add a handler to the global Accounts Meteor package that monitors login procedures
Accounts.registerLoginHandler(function(loginRequest) {
  //If the username or password are missing, fail the login
  if (!loginRequest.password || !loginRequest.username) {
    return undefined;
  }

  //Find the first user in the Users collection that matches the provided username
  eliteUser = eliteUsers.filter(function(user) {
    return user.UserName.toLowerCase() == loginRequest.username.toLowerCase();
  })[0];

  //If no match was found, throw an error
  if (!eliteUser)
    throw new Meteor.Error(403, "User not found");

  //If the user was found but the password is wrong, throw an error
  if (!bcryptCompare(loginRequest.password, eliteUser.Password))
    throw new Meteor.Error(403, "Incorrect password");

  //If the user account was found but is not active, throw an error
  if (eliteUser.Active === 0) {
    console.log('user not active');
    throw new Meteor.Error(403, "User not active");
  }

  //Determine whether this user has already logged in
  var userId = null;
  var existingUser = Meteor.users.findOne({username: loginRequest.username});
  //If the user has previously logged in, update the application's ID for the current user
  if (existingUser) {
    userId = existingUser._id;
  } else {
    //This is a "new" user - retrieve the details.
    var user = {
      username: loginRequest.username,
      profile: eliteUser,
    };
    userId = Accounts.insertUserDoc({}, user);
  }

  //Return the user ID
  return {
    userId: userId
  }
});
