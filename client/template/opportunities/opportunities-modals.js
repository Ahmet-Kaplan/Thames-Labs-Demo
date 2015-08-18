var verfiyOpportunityStagesExist = function() {
  if (FlowRouter.subsReady()) {
    var count = OpportunityStages.find({}).count();
    if (count == 0) {
      OpportunityStages.insert({
        title: "Exploration",
        description: "Exploring whether there is a need that your product or service can fulfill",
        order: 0
      });
      OpportunityStages.insert({
        title: "Fact finding",
        description: "Finding the key people, whether a budget exists, timescales, competitors pitching",
        order: 1
      });
      OpportunityStages.insert({
        title: "Solution",
        description: "Preparing your solution based on what you know from your fact finding",
        order: 2
      });
      OpportunityStages.insert({
        title: "Negotiation",
        description: "Negotiating the sale of the solution, confirming price, delivery and other out-of-contract aspects",
        order: 3
      });
      OpportunityStages.insert({
        title: "Objections",
        description: "Dealing with any objections to the negotiated solution in order to win the business",
        order: 4
      });
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
    var id = OpportunityStages.findOne({"order": 0})._id;
    return id;
  },
  createdBy: function() {
    return Meteor.userId();
  }
});
