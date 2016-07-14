import { Meteor } from 'meteor/meteor';

function loadTawkTo() {
  /* eslint-disable camelcase */
  if(typeof Tawk_API !== 'undefined') {
    return;
  }
  /* eslint-enable camelcase */
  if(Meteor.isProduction && !Meteor.isTest) {
    // On loading, if user is logged in, Meteor.user() is undefined
    // However if user is on sign-up page, Meteor.user() is null (we want to load Tawk.to in this case).
    // This function is called inside an autorun so that if the user is signed in,
    // Meteor.user() becomes defined and trigger the chat script.
    if(typeof Meteor.user() === 'undefined' || (!!Meteor.user() && Meteor.user().emails[0].address.indexOf('@cambridgesoftware.co.uk') > -1)) {
      return;
    }
    $.getScript('https://embed.tawk.to/56b333a5fe87529955d980fa/default');
  }
}

function updateTawkToVisitor(visitor, tenant) {
  /* eslint-disable camelcase */
  if(typeof visitor !== 'undefined' && !!tenant) {
    Meteor.call('tawkTo.UserInfo', function(err, res) {
      if(!!res && typeof Tawk_API !== 'undefined' && _.get(Tawk_API, 'setAttributes')) {
        Tawk_API.setAttributes(res);
      }
    });
  }
  /* eslint-enable camelcase */
}

export { loadTawkTo, updateTawkToVisitor };