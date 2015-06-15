Meteor.startup(function() {
  //Uses MailGun (mailgun.com), mailbox settings: email: damien.robson@cambridgesoftware.co.uk, password: kM3975Ub
  process.env.MAIL_URL = 'smtp://postmaster%40sandboxeacc9610dcf248de99f4a0caeae61dff.mailgun.org:e03001020e656e0da764a0b636abcbcf@smtp.mailgun.org:587';
});
