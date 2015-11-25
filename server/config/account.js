Accounts.config({
    sendVerificationEmail: true
});

Accounts.emailTemplates.from = "RealTimeCRM Team <admin@realtimecrm.co.uk>";
Accounts.emailTemplates.siteName = "RealtimeCRM";
Accounts.emailTemplates.verifyEmail.subject = function(user) {
  return 'Verify your RealTimeCRM account';
};
Accounts.emailTemplates.verifyEmail.text = function(user, url) {
  return "Hello, " + user.profile.name + "\n\n" +
    "Click the link below (or copy and paste it into your browser) to activate your RealTimeCRM account:\n\n" +
    url +
    "\n\nThe RealtimeCRM Team";
};
Accounts.emailTemplates.verifyEmail.html = function(user, url) {
  SSR.compileTemplate('emailText', Assets.getText('email-verify-template.html'));
  Template.emailText.helpers({
    getDoctype: function() {
      return '!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">';
    },
    subject: function() {
      return 'Verify your RealTimeCRM account';
    },
    url: function() {
      return url;
    },
    name: function() {
      return user.profile.name;
    }
  });
  var html = '<' + SSR.render("emailText");
  return html;
};

Accounts.emailTemplates.from = "RealTimeCRM Team <admin@realtimecrm.co.uk>";
Accounts.emailTemplates.siteName = "RealtimeCRM";
Accounts.emailTemplates.resetPassword.subject = function(user) {
  return 'Your RealTimeCRM Password';
};
Accounts.emailTemplates.resetPassword.text = function(user, url) {
  return "Dear " + user.profile.name + "\n\n" +
    "You have made a request to reset your RealTimeCRM password.\n\n" +
    "By clicking the link below you will be able to enter a new password which you can use to access RealTimeCRM from now on.\n\n" +
    url +
    "\n\nPlease ensure the new password that you choose is something that you can remember but is not too easy for others to guess. A combination of words and numbers is often ideal.\n\n" +
    "If you did not request a password reset then please ignore this email. No changes have been made to your account and you will be able to continue to login as normal.\n\n" +
    "Should you continue to have problems logging in then you can contact us [http://realtimecrm.co.uk/about/] for help and advice.\n\n" +
    "We hope you're enjoying your RealTimeCRM experience.\n\n" +
    "Best wishes,\n" +
    "The RealtimeCRM Team";
};
Accounts.emailTemplates.resetPassword.html = function(user, url) {
  SSR.compileTemplate('emailText', Assets.getText('email-password-template.html'));
  Template.emailText.helpers({
    getDoctype: function() {
      return '!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">';
    },
    subject: function() {
      return 'Your RealTimeCRM Password';
    },
    url: function() {
      return url;
    },
    name: function() {
      return user.profile.name;
    }
  });
  var html = '<' + SSR.render("emailText");
  return html;
};
