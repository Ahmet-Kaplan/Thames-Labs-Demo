AutoForm.hooks({
  newProjectForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Project created.');
    }
  },
  updateProjectForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Project updated.');
    }
  }
});

Session.set('sc', null);

Template.newProjectForm.events({
  'change #selectedCompany': function() {
    var c = $('select#selectedCompany').val();
    if (c)
      Session.set('sc', c);
    else
      Session.set('sc', null);
  }
});

Template.updateProjectForm.onRendered(function() {
  var c = this.data.companyId;
  if (c)
    Session.set('sc', c);
  else
    Session.set('sc', null);
});

Template.updateProjectForm.helpers({
  companiesAsOptions: function() {
    return Companies.find({}).map(function(company) {
      return {
        'label': company.name,
        'value': company._id
      };
    });
  },
  contactsAsOptions: function() {
    return Contacts.find({
      companyId: Session.get('sc')
    }).map(function(contact) {
      return {
        'label': contact.forename + " " + contact.surname,
        'value': contact._id
      };
    });
  },
  usersAsOptions: function() {
    return Meteor.users.find({}).map(function(user) {
      return {
        'label': user.profile.name,
        'value': user._id
      };
    });
  }
});


Template.newProjectForm.helpers({
  showContacts: function() {
    console.log(Session.get('sc'));
    if (Session.get('sc') === null) {
      return false;
    } else {
      return true;
    }
  },
  currentDateTime: function() {
    return new Date();
  },
  datePlusOneWeek: function() {
    var now = new Date();
    now.setDate(now.getDate() + 7);
    return now;
  },
  companiesAsOptions: function() {
    return Companies.find({}).map(function(company) {
      return {
        'label': company.name,
        'value': company._id
      };
    });
  },
  contactsAsOptions: function() {
    return Contacts.find({
      companyId: Session.get('sc')
    }).map(function(contact) {
      return {
        'label': contact.forename + " " + contact.surname,
        'value': contact._id
      };
    });
  },
  usersAsOptions: function() {
    return Meteor.users.find({}).map(function(user) {
      return {
        'label': user.profile.name,
        'value': user._id
      };
    });
  }
});
