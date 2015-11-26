Accounts.emailTemplates.from = "RealTimeCRM Team <admin@realtimecrm.co.uk>";
Accounts.emailTemplates.siteName = "RealtimeCRM";

var buildHtmlEmail = function(templatePath, helpers) {
  var doctype = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">';
  SSR.compileTemplate('bodyText', Assets.getText(templatePath));
  SSR.compileTemplate('htmlEmail', Assets.getText('email-template.html'));
  return doctype + SSR.render('htmlEmail', {
    bodyText: SSR.render('bodyText', helpers)
  });
};

Accounts.emailTemplates.enrollAccount.subject = function(user) {
  return 'Your RealTimeCRM details';
};
Accounts.emailTemplates.enrollAccount.html = function(user, url) {
  return buildHtmlEmail('email-enroll.html', {
    name: user.profile.name,
    url: url
  });
};
Accounts.emailTemplates.enrollAccount.text = function(user, url) {
  SSR.compileTemplate('textEmail', Assets.getText('email-enroll.txt'));
  return SSR.render('textEmail', {
    name: user.profile.name,
    url: url
  });
};
