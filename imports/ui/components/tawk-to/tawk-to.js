import { Meteor } from 'meteor/meteor';

function loadTawkTo() {
  if(Meteor.isProduction && !Meteor.isTest) {
    if(Meteor.user() && Meteor.user().emails[0].address.indexOf('@cambridgesoftware.co.uk') > -1) {
      return;
    }
    $.getScript('https://embed.tawk.to/56b333a5fe87529955d980fa/default');
  }
}

function updateTawkToVisitor(visitor, tenant) {
  /* eslint-disable camelcase*/
  if(typeof visitor !== 'undefined' && !!tenant) {
    Meteor.call('tawkTo.UserInfo', function(err, res) {
      if(!!res && typeof Tawk_API !== 'undefined' && _.get(Tawk_API, 'setAttributes')) {
        Tawk_API.setAttributes(res);
      }
    });
  }
  /* eslint-enable camelcase*/
}

export { loadTawkTo, updateTawkToVisitor };