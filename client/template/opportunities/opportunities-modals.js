var verfiyOpportunityStagesExist = function() {
  if (FlowRouter.subsReady()) {
    var count = OpportunityStages.find({}).count();
    if (count == 0) {
      Meteor.call("createDefaultOpportunityStages");
    }
  }
};

Template.insertOpportunityModal.onRendered(function() {
  Session.set('oppComp', null);
  verfiyOpportunityStagesExist();
});

Template.insertOpportunityModal.helpers({
	firstStageId: function() {
    var count = OpportunityStages.find({}).count();
    if (count == 0) return null;
    var id = OpportunityStages.findOne({"order": 0})._id;
    return id;
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
    var count = OpportunityStages.find({}).count();
    if (count == 0) return null;
    var id = OpportunityStages.findOne({"order": 0})._id;
    return id;
  },
  createdBy: function() {
    return Meteor.userId();
  },
  companyName: function() {
    return Companies.findOne().name;
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
    var count = OpportunityStages.find({}).count();
    if (count == 0) return null;
    var id = OpportunityStages.findOne({"order": 0})._id;
    return id;
  },
  createdBy: function() {
    return Meteor.userId();
  },
  companyName: function() {
    return Companies.findOne().name;
  },
  contactName: function() {
    var contact = Contacts.findOne();
    return contact.forename + ' ' + contact.surname;
  }
});

Template.editOpportunityModal.helpers({
  companyName: function() {
    return Companies.findOne().name
  },
  contactName: function() {
    var contact = Contacts.findOne();
    return contact.forename + ' ' + contact.surname;
  }
})

Template.insertOpportunityItemModal.helpers({
  generatedId: function() {
    return Random.id();
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
  }
});
