// Settings for the AccountsTemplates package - used for our login page
// n.b. this is NOT the same as Meteor.Accounts

AccountsTemplates.configure({
  forbidClientAccountCreation: true,
  showForgotPasswordLink: true,
  homeRoutePath: ''
});
