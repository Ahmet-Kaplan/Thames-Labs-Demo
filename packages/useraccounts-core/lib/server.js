// Initialization

AT.prototype.init = function() {
    console.warn("[AccountsTemplates] There is no more need to call AccountsTemplates.init()! Simply remove the call ;-)");
};

AT.prototype._init = function() {
    if (this._initialized)
        return;

    // Checks there is at least one account service installed
    if (!Package["accounts-password"] && (!Accounts.oauth || Accounts.oauth.serviceNames().length === 0))
        throw Error("AccountsTemplates: You must add at least one account service!");

    // A password field is strictly required
    var password = this.getField("password");
    if (!password)
        throw Error("A password field is strictly required!");
    if (password.type !== "password")
        throw Error("The type of password field should be password!");

    // Then we can have "username" or "email" or even both of them
    // but at least one of the two is strictly required
    var username = this.getField("username");
    var email = this.getField("email");
    if (!username && !email)
        throw Error("At least one field out of username and email is strictly required!");
    if (username && !username.required)
        throw Error("The username field should be required!");
    if (email){
        if (email.type !== "email")
            throw Error("The type of email field should be email!");
        if (username){
            // username and email
            if (username.type !== "text")
                throw Error("The type of username field should be text when email field is present!");
        }else{
            // email only
            if (!email.required)
                throw Error("The email field should be required when username is not present!");
        }
    }
    else{
        // username only
        if (username.type !== "text" && username.type !== "tel")
            throw Error("The type of username field should be text or tel!");
    }

    // Possibly publish more user data in order to be able to show add/remove
    // buttons for 3rd-party services
    if (this.options.showAddRemoveServices){
        // Publish additional current user info to get the list of registered services
        // XXX TODO: use
        // Accounts.addAutopublishFields({
        //   forLoggedInUser: ['services.facebook'],
        //   forOtherUsers: [],
        // })
        // ...adds only user.services.*.id
        Meteor.publish("userRegisteredServices", function() {
            var userId = this.userId;
            return Meteor.users.find(userId, {fields: {services: 1}});
            /*
            if (userId){
                var user = Meteor.users.findOne(userId);
                var services_id = _.chain(user.services)
                    .keys()
                    .reject(function(service){return service === "resume";})
                    .map(function(service){return "services." + service + ".id";})
                    .value();
                var projection = {};
                _.each(services_id, function(key){projection[key] = 1;});
                return Meteor.users.find(userId, {fields: projection});
            }
            */
        });
    }

    // Security stuff
    if (this.options.overrideLoginErrors){
        Accounts.validateLoginAttempt(function(attempt){
            if (attempt.error){
                var reason = attempt.error.reason;
                if (reason === "User not found" || reason === "Incorrect password")
                    throw new Meteor.Error(403, AccountsTemplates.texts.errors.loginForbidden);
            }
            return attempt.allowed;
        });
    }

    if (this.options.sendVerificationEmail && this.options.enforceEmailVerification){
        Accounts.validateLoginAttempt(function(attempt){
            if (!attempt.allowed) {
              return false;
            }
            if (!attempt.allowedinfo.type !== "password" || attempt.methodName !== "login") {
                return attempt.allowed;
            }
            var user = attempt.user;
            if (!user) {
                return attempt.allowed;
            }
            var ok = true;
            var loginEmail = attempt.methodArguments[0].user.email;
            if (loginEmail){
              var email = _.filter(user.emails, function(obj){
                  return obj.address === loginEmail;
              });
              if (!email.length || !email[0].verified) {
                  ok = false;
              }
            }
            else {
              // we got the username, lets check there's at lease one verified email
              var emailVerified = _.chain(user.emails)
                .pluck('verified')
                .any()
                .value();
              if (!emailVerified) {
                ok = false;
              }
            }
            if (!ok) {
              throw new Meteor.Error(401, AccountsTemplates.texts.errors.verifyEmailFirst);
              return false;
            }
            return attempt.allowed;
        });
    }

    //Check that reCaptcha secret keys are available
    if (this.options.showReCaptcha) {
        var atSecretKey = AccountsTemplates.options.reCaptcha && AccountsTemplates.options.reCaptcha.secretKey;
        var settingsSecretKey = Meteor.settings.reCaptcha && Meteor.settings.reCaptcha.secretKey;

        if (!atSecretKey && !settingsSecretKey) {
            throw new Meteor.Error(401, "User Accounts: reCaptcha secret key not found! Please provide it or set showReCaptcha to false." );
        }
    }

    // ------------
    // Server-Side Routes Definition
    //
    //   this allows for server-side iron-router usage, like, e.g.
    //   Router.map(function(){
    //       this.route("fullPageSigninForm", {
    //           path: "*",
    //           where: "server"
    //           action: function() {
    //               this.response.statusCode = 404;
    //               return this.response.end(Handlebars.templates["404"]());
    //           }
    //       });
    //   })
    // ------------
    // This already happens now as long as the user calls configureRoute in both
    //  client and server
    // AccountsTemplates.setupRoutes();
    

    // moved from core.js/->setupRoutes()
    // Possibly prints a warning in case showForgotPasswordLink is set to true but the route is not configured
    // if (AccountsTemplates.options.showForgotPasswordLink && !("forgotPwd" in  AccountsTemplates.routes))
    //    console.warn("[AccountsTemplates] WARNING: showForgotPasswordLink set to true, but forgotPwd route is not configured!");
    // Configures "reset password" email link
    if ("resetPwd" in AccountsTemplates.routes){
        var resetPwdPath = AccountsTemplates.routes["resetPwd"].path.substr(1);
        Accounts.urls.resetPassword = function(token){
            return Meteor.absoluteUrl(resetPwdPath + "/" + token);
        };
    }
    // Configures "enroll account" email link
    if ("enrollAccount" in AccountsTemplates.routes){
        var enrollAccountPath = AccountsTemplates.routes["enrollAccount"].path.substr(1);
        Accounts.urls.enrollAccount = function(token){
            return Meteor.absoluteUrl(enrollAccountPath + "/" + token);
        };
    }
    // Configures "verify email" email link
    if ("verifyEmail" in AccountsTemplates.routes){
        var verifyEmailPath = AccountsTemplates.routes["verifyEmail"].path.substr(1);
        Accounts.urls.verifyEmail = function(token){
            return Meteor.absoluteUrl(verifyEmailPath + "/" + token);
        };
    }

    // Marks AccountsTemplates as initialized
    this._initialized = true;
};


// Fake server-side IR plugin to allow for shared routing files
// Iron.Router.plugins.ensureSignedIn = function (router, options) {};


AccountsTemplates = new AT();


// Client side account creation is disabled by default:
// the methos ATCreateUserServer is used instead!
// to actually disable client side account creation use:
//
//    AccountsTemplates.config({
//        forbidClientAccountCreation: true
//    });
Accounts.config({
    forbidClientAccountCreation: true
});


// Initialization
Meteor.startup(function(){
    AccountsTemplates._init();
});
