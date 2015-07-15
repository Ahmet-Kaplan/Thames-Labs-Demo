Template.signUp.events({
	'click #sign-up-btn': function() {
		
		var userDetails = {
			name: $("#name").val(),
			email: $("#email").val(),
			password: $("#password").val(),
			confirmPassword: $("#confirm-password").val(),
			companyName: $("#company-name").val()
		};
			
		var validated = true;
		var errorMessage = "";
		
		//Validate fields clientside
		if (userDetails.password !== userDetails.confirmPassword) {
			validated = false;
			errorMessage = "Your passwords do not match";
		}
		
		if (userDetails.password.length < 6) {
			validated = false;
			errorMessage = "Your password must be 6 or more characters long";
		}
		
		if (userDetails.name.length < 1) {
			validated = false;
			errorMessage = "You must enter your name";
		}
		
		if (userDetails.companyName.length < 1) {
			validated = false;
			errorMessage = "You must enter a company name";
		}
		
		if (!SimpleSchema.RegEx.Email.test(userDetails.email)) {
			validated = false;
			errorMessage = "Enter a valid email address";
		}
		
		if (!$('#terms').is(':checked')) {
			validated = false;
			errorMessage = "Please accept the terms and conditions";
		}
		
		if (validated) {
			Meteor.call('signUp', userDetails, function(err, response) {
				if (response !== true) {
					$("#error-message").text(response);
				}
				else {
					Meteor.loginWithPassword(userDetails.email, userDetails.password, function(err) {
						FlowRouter.redirect("/");
					});
				}
			});
		}
		else {
			$("#error-message").text(errorMessage);
		}
	} 
}); 