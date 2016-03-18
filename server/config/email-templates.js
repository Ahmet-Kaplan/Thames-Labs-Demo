/////////////////////////////////////////////////
// Helper functions to wrap our email template //
/////////////////////////////////////////////////

Accounts.buildHtmlEmail = function(templatePath, helpers) {
  // Wraps the given html template in our standard email template
  if (Meteor.isDevelopment) return null
  var doctype = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">';
  SSR.compileTemplate('bodyText', Assets.getText(templatePath));
  SSR.compileTemplate('htmlEmail', Assets.getText('email-template.html'));
  return doctype + SSR.render('htmlEmail', {
    bodyText: SSR.render('bodyText', helpers)
  });
};

Accounts.buildTxtEmail = function(templatePath, helpers) {
  SSR.compileTemplate('textEmail', Assets.getText(templatePath));
  return SSR.render('textEmail', helpers);
}

/////////////////////////////
// Email template settings //
/////////////////////////////

Accounts.emailTemplates.from = "RealTimeCRM Team <admin@realtimecrm.co.uk>";
Accounts.emailTemplates.siteName = "RealtimeCRM";

Accounts.emailTemplates.enrollAccount.subject = function(user) {
  return 'Your RealTimeCRM details';
};
Accounts.emailTemplates.enrollAccount.html = function(user, url) {
  if (user.emails[0].address === 'mario@mariobros.com') {
    return Accounts.buildHtmlEmail('mario-enroll.html', {
      name: user.profile.name,
      url: url
    });
  }

  return Accounts.buildHtmlEmail('email-enroll.html', {
    name: user.profile.name,
    url: url
  });
};
Accounts.emailTemplates.enrollAccount.text = function(user, url) {
  if (user.emails[0].address === 'mario@mariobros.com') {
    return Accounts.buildTxtEmail('mario-enroll.txt', {
      name: user.profile.name,
      url: url
    });
  }

  return Accounts.buildTxtEmail('email-enroll.txt', {
    name: user.profile.name,
    url: url
  });
};

Accounts.emailTemplates.resetPassword.subject = function(user) {
  return 'Your RealTimeCRM password';
};
Accounts.emailTemplates.resetPassword.html = function(user, url) {
  return Accounts.buildHtmlEmail('email-password-reset.html', {
    name: user.profile.name,
    url: url
  });
};
Accounts.emailTemplates.resetPassword.text = function(user, url) {
  return Accounts.buildTxtEmail('email-password-reset.txt', {
    name: user.profile.name,
    url: url
  });
};