Accounts.validateLoginAttempt(function(attempt) {
  if(Roles.userIsInRole(attempt.user._id, ['Disabled'])) {
    attempt.allowed = false;
    throw new Meteor.Error(403, "Your user account is currently disabled. Please contact your administrator");
  }
  return true;
});
