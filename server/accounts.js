if (Meteor.isServer) {
  Meteor.startup(function () {
	Meteor.methods({
		signUp: function(userDetails) {
			
			var user = Meteor.users.findOne({emails: {$elemMatch: {address: userDetails.email}}});
			if (user !== undefined) {
				return "Your email address is already registered with RealTimeCRM";
			}
			
			var userId = Accounts.createUser(
				{
			      	email: userDetails.email,
			     	password: userDetails.password,
			      	profile: {
				        name: userDetails.name,
				        lastLogin: null,
				        lastActivity: {
					        page: null,
				          	url: null
				        }
					}
		      	}
			);
			
			var tenantId = Tenants.insert({ 	
					name: userDetails.companyName,
					settings: {
						"PurchaseOrderPrefix":"",
						"PurchaseOrderStartingValue": 0
					}
				},
				function(error, result) {
					if (error) {
						//Remove user account as signup wasn't successful
						Meteor.users.remove(userId);
						return "The tenant could not be created. Please contact support";
					}
				}
			);
			
			Partitioner.setUserGroup(userId, tenantId);
			
			SSR.compileTemplate('emailText', Assets.getText('emailtemplate.html'));
		    Template.emailText.helpers({
		      getDoctype: function() {
		        return '!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">';
		      },
		      subject: function() {
		        return 'Your RealTimeCRM details';
		      },
		      name: function() {
		        return userDetails.name;
		      },
		      email: function() {
		        return userDetails.email;
		      },
		      password: function() {
		        return userDetails.password;
		      }
		    });
		    var html = '<' + SSR.render("emailText");
		
		    // See server/startup.js for MAIL_URL environment variable
		
		    Email.send({
		      to: userDetails.email,
		      from: 'admin@realtimecrm.co.uk',
		      subject: 'Your RealTimeCRM details',
		      html: html
		    });
		
			return true; 
		}
	});
  });
}