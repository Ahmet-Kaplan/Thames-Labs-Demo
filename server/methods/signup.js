Meteor.methods({
  signUp: function(userDetails) {

    check(userDetails, Schemas.UserSignUp);

    var userId = Accounts.createUser({
      email: userDetails.email,
      profile: {
        name: userDetails.name,
        lastLogin: null,
        lastActivity: {
          page: null,
          url: null
        },
        poAuthLevel: 100000
      }
    });

    Roles.addUsersToRoles(userId, ["Administrator"]);
    Roles.addUsersToRoles(userId, defaultPermissionsList);

    var tenantId = Tenants.insert({
      name: userDetails.companyName,
      stripe: {
        "coupon": userDetails.coupon
      },
      createdAt: new Date()
    }, function(error, result) {
      if (error) {
        Meteor.users.remove(userId);
        throw new Meteor.Error(500, "Sign up could not be completed. Please contact support");
      }
      Partitioner.setUserGroup(userId, tenantId);

      Accounts.sendEnrollmentEmail(userId);

      Email.send({
        to: 'realtimecrm-notifications@cambridgesoftware.co.uk',
        from: 'RealTimeCRM <admin@realtimecrm.co.uk>',
        subject: 'New RealTimeCRM sign up!',
        text: `New sign up from ${userDetails.name} at company ${userDetails.companyName} with email address ${userDetails.email}`
      });
    });
  },

  'notify.telephoneUpdated': function() {

    if(!this.userId) {
      throw new Meteor.Error('No users', 'Needs to be logged in.');
    }

    const user = Meteor.users.findOne(this.userId);

    if(!user) {
      throw new Meteor.Error('Not found', 'User not found.');
    }

    const tenant = Tenants.findOne(user.group);

    const txt = `Telephone number updated for user ${user.profile.name} (${user.emails[0].address}) at ${tenant.name}: ${user.profile.telephone}.`;
    Email.send({
      to: 'realtimecrm-notifications@cambridgesoftware.co.uk',
      from: 'RealTimeCRM <admin@realtimecrm.co.uk>',
      subject: 'RealTimeCRM User - Updated Telephone Number',
      text: txt
    });
  }

});
