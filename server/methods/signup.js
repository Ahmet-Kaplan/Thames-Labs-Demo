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

    var tenantId = Tenants.insert({
        name: userDetails.companyName,
        settings: {
          "PurchaseOrderPrefix": "",
          "PurchaseOrderStartingValue": 0,
          extInfo: {
            company: [],
            contact: [],
            project: []
          },
          opportunity: {
            stages: []
          }
        },
        stripe: {
          "totalRecords": 0,
          "paying": false,
          "blocked": false,
          "coupon": userDetails.coupon
        },
        createdAt: new Date()
      },
      function(error, result) {
        if (error) {
          //Remove user account as signup wasn't successful
          Meteor.users.remove(userId);
          throw new Meteor.Error(500, "The tenant could not be created. Please contact support");
        }
      }
    );

    if (userId && tenantId) {
      Partitioner.setUserGroup(userId, tenantId);

      Accounts.sendEnrollmentEmail(userId);

      var txt = 'New sign up from ' + userDetails.name + ' at company ' + userDetails.companyName;
      Email.send({
        to: 'david.mcleary@cambridgesoftware.co.uk',
        from: 'RealTimeCRM <admin@realtimecrm.co.uk>',
        subject: 'New RealTimeCRM sign up!',
        text: txt
      });

      return true;
    } else {
      return false;
    }

  }

});
