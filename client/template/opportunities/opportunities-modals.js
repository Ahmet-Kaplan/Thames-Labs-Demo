var verfiyOpportunityStagesExist = function() {
  if (FlowRouter.subsReady()) {
    var count = OpportunityStages.find({}).count();
    if (count == 0) {
      Meteor.call("createDefaultOpportunityStages");
    }
  }
}

Template.insertOpportunityModal.onRendered(function() {
  Session.set('oppComp', null);
  verfiyOpportunityStagesExist();
});

Template.insertOpportunityModal.helpers({
  companiesAsOptions: function() {
    return Companies.find({}).map(function(company) {
      return {
        'label': company.name,
        'value': company._id
      };
    });
  },
  contactsAsOptions: function() {
    if (Session.get('oppComp') !== null) {
      return Contacts.find({
        companyId: Session.get('oppComp')
      }).map(function(contact) {
        return {
          'label': contact.forename + " " + contact.surname,
          'value': contact._id
        };
      });
    } else {
      return Contacts.find({
        companyId: undefined
      }).map(function(contact) {
        return {
          'label': contact.forename + " " + contact.surname,
          'value': contact._id
        };
      });
    }
  },
  emptyArray: function() {
    return [];
  },
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

Template.insertCompanyOpportunityModal.onRendered(function() {
  verfiyOpportunityStagesExist();
});

Template.insertCompanyOpportunityModal.helpers({
  emptyArray: function() {
    return [];
  },
	firstStageId: function() {
    var count = OpportunityStages.find({}).count();
    if (count == 0) return null;
    var id = OpportunityStages.findOne({"order": 0})._id;
    return id;
  },
  createdBy: function() {
    return Meteor.userId();
  },
  contactsAsOptions: function() {
    return Contacts.find({
      companyId: this.companyId
    }).map(function(contact) {
      return {
        'label': contact.forename + " " + contact.surname,
        'value': contact._id
      };
    });
  }
});

Template.insertContactOpportunityModal.onRendered(function() {
  verfiyOpportunityStagesExist();
});

Template.insertContactOpportunityModal.helpers({
  emptyArray: function() {
    return [];
  },
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
