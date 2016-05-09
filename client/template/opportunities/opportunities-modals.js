

var verfiyOpportunityStagesExist = function() {
  if (FlowRouter.subsReady()) {
    var userTenant = Tenants.findOne({
      _id: Meteor.user().group
    });
    if (userTenant) {
      var stages = userTenant.settings.opportunity.stages;
      if (!stages || stages.length === 0) {
        Meteor.call("createDefaultOpportunityStages");
      }
    }
  }
};

var findFirstStageId = function() {
  var userTenant = Tenants.findOne({
    _id: Meteor.user().group
  });
  var stages = userTenant.settings.opportunity.stages;
  if (!stages || stages.length === 0) return null;

  var id = _.result(_.find(stages, function(stg) {
    return stg.order === 0;
  }), 'id');

  return id;
};

Template.insertOpportunityModal.onRendered(function() {
  Session.set('oppComp', null);
  verfiyOpportunityStagesExist();
});

Template.insertOpportunityModal.helpers({
  firstStageId: function() {
    return findFirstStageId();
  },
  createdBy: function() {
    return Meteor.userId();
  }
});

Template.insertCompanyOpportunityModal.onRendered(function() {
  verfiyOpportunityStagesExist();
});

Template.insertCompanyOpportunityModal.helpers({
  firstStageId: function() {
    return findFirstStageId();
  },
  createdBy: function() {
    return Meteor.userId();
  },
  companyName: function() {
    return Companies.findOne(this.companyId).name;
  }
});

Template.insertOpportunityModal.events({
  'change #selectedCompany': function() {
    var c = $('select#selectedCompany').val();
    if (c) {
      Session.set('oppComp', c);
      Meteor.subscribe('contactsByCompanyId', c);
    } else {
      Meteor.subscribe('allContacts', c);
      Session.set('oppComp', null);
    }
  }
});

Template.insertContactOpportunityModal.onRendered(function() {
  verfiyOpportunityStagesExist();
});

Template.insertContactOpportunityModal.helpers({
  firstStageId: function() {
    return findFirstStageId();
  },
  createdBy: function() {
    return Meteor.userId();
  },
  companyName: function() {
    return Companies.findOne({
      _id: this.companyId
    }).name;
  },
  contactName: function() {
    var contact = Contacts.findOne(this.contactId);
    return contact.forename + ' ' + contact.surname;
  }
});

Template.editOpportunityModal.helpers({
  companyName: function() {
    return Companies.findOne({
      _id: this.companyId
    }).name;
  },
  contactName: function() {
    var contact = Contacts.findOne({
      _id: this.contactId
    });
    return contact.forename + ' ' + contact.surname;
  }
});

Template.insertOpportunityItemModal.helpers({
  generatedId: function() {
    return Random.id();
  }
});

Template.insertOpportunityItemModal.events({
  'change input[name=value], blur input[name=value], change input[name=quantity], blur input[name=quantity]': function(event) {
    var totalValue = parseFloat($('input[name=value]').val()) * parseFloat($('input[name=quantity]').val()).toFixed(2);
    if(!isNaN(totalValue)) {
      $('#oppLineTotal').val(totalValue);
    }
  }
});

Template.editOpportunityItemModal.helpers({
  opportunity: function() {
    return Opportunities.findOne(this.oppId);
  },
  fieldName: function() {
    return "items." + this.index + ".name";
  },
  fieldDesc: function() {
    return "items." + this.index + ".description";
  },
  fieldVal: function() {
    return "items." + this.index + ".value";
  },
  fieldQuantity: function() {
    return "items." + this.index + ".quantity";
  },
  fieldLineTotal: function() {
    var value = this.data.value * this.data.quantity;
    if(!isNaN(value)) return value
  }
});

Template.editOpportunityItemModal.events({
  'change #fieldVal, blur #fieldVal, change #fieldQuantity, blur #fieldQuantity': function(event) {
    var totalValue = (parseFloat($('#fieldVal').val()) * parseFloat($('#fieldQuantity').val())).toFixed(2);
    if(!isNaN(totalValue)) {
      $('#oppLineTotal').val(totalValue);
    }
  }
});