import './insert-contact-modal.html';

Template.insertContactModal.onCreated(function() {
  this.showAddress = new ReactiveVar(true);
});

Template.insertContactModal.onRendered(function() {
  if (Meteor.user()) {
    const tenant = Tenants.findOne({
      _id: Meteor.user().group
    });
    if (tenant) {
      let options = [];
      if (tenant.settings.contact.titles) {
        options = _.map(tenant.settings.contact.titles.split(','), function(input) {
          return {
            value: input,
            text: input
          };
        });
      }

      this.$("#contactTitlePicklist").selectize({
        delimiter: ',',
        create: false,
        options: options,
        maxItems: 1,
        selectOnTab: true,
        allowEmptyOption: true,
        sortField: 'text'
      });
    }
  }

  $('#draggableModal').draggable({
    grid: [50, 50],
    handle: '.modal-header',
    opacity: 0.35
  });
});

Template.insertContactModal.helpers({
  currentUser: function() {
    return Meteor.userId();
  },
  showTitleField: function() {
    const tenant = Tenants.findOne({
      _id: Meteor.user().group
    });
    if (tenant && tenant.settings.contact.titles && tenant.settings.contact.titles.length > 0) return true;
    return false;
  },
  showAddress: function() {
    return Template.instance().showAddress.get();
  }
});

Template.insertContactModal.events({
  'change #companyId': function() {
    if ($('#companyId').val() != '') {
      Template.instance().showAddress.set(false);
    } else {
      Template.instance().showAddress.set(true);
    }
  }
});

AutoForm.hooks({
  insertContactForm: {
    onSuccess: function() {
      toastr.success('Contact created.');
      Modal.hide();
    },
    after: {
      insert: function(error, result) {
        if (error) {
          toastr.error('Contact creation error: ' + error);
          return false;
        }

        FlowRouter.go('/contacts/' + result);
      }
    },
    onError: function(formType, error) {
      toastr.error('Contact creation error: ' + error);
    }
  }
});