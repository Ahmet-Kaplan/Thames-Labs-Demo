AccountsTemplates.configure({
  forbidClientAccountCreation: true,
  showForgotPasswordLink: true,
  homeRoutePath: ''
});

if (Meteor.isServer) {
  Accounts.emailTemplates.siteName = "RealTimeCRM";
  Accounts.emailTemplates.from = "RealTimeCRM <team@realtimecrm.co.uk>";
}
