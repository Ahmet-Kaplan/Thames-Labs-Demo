ServerSession.setCondition(function(key, value) {
  // Check for user ID. If not there, forcibly return true to ensure that the server can do whatever it needs to.
  // If this is a user request, check which key they're trying to set and whether or not they're a super
  // before allowing the change to take place
  if(Meteor.userId()) {
    if(key !== "DocxToPdfRemaining" && Roles.userIsInRole(Meteor.userId(), 'superadmin')) {
      return true;
    }
    return false;
  }
  return true;
});
