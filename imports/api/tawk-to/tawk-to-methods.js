import { Meteor } from 'meteor/meteor';

Meteor.methods({
  'tawkTo.UserInfo': function() {
    if(!Meteor.user()) {
      return false;
    }

    const visitor = Meteor.user();
    const tenant = Tenants.findOne({
      _id: visitor.group
    });
    const tawkToApiKey = process.env.TAWKTO_API_KEY || '';
    const hash = CryptoJS.HmacSHA256(visitor.emails[0].address.toString(), tawkToApiKey);
    const name = (`${visitor.profile.name} [${tenant.name}]`).substring(0, 40);

    return {
      name: name,
      email: visitor.emails[0].address.toString(),
      hash: hash.toString()
    };
  }
});