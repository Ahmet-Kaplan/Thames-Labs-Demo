const setValues = (template) => {
  Meteor.call('report.tasksCreated', function(err, data) {
    template.totalTasks.set(data);
  });
  Meteor.call('report.companiesStored', function(err, data) {
    template.totalCompanies.set(data);
  });
  Meteor.call('report.contactsStored', function(err, data) {
    template.totalContacts.set(data);
  });
  Meteor.call('report.numberOfProjects', function(err, data) {
    template.totalProjects.set(data);
  });
  Meteor.call('report.openOpportunities', function(err, data) {
    template.totalOpportunities.set(data);
  });
  Meteor.call('report.numberOfProducts', function(err, data) {
    template.totalProducts.set(data);
  });
  Meteor.call('report.numberOfPurchaseOrders', function(err, data) {
    template.totalPo.set(data);
  });
};

Template.companySummaryWidget.onCreated(function() {
  this.totalTasks = new ReactiveVar(0);
  this.totalCompanies = new ReactiveVar(0);
  this.totalContacts = new ReactiveVar(0);
  this.totalProjects = new ReactiveVar(0);
  this.totalOpportunities = new ReactiveVar(0);
  this.totalProducts = new ReactiveVar(0);
  this.totalPo = new ReactiveVar(0);
});

Template.companySummaryWidget.onRendered(function() {
  setValues(this);
});

Template.companySummaryWidget.events({
  'click #ref_companySummaryWidget': function(event, template) {
    setValues(template);
  }
});

Template.companySummaryWidget.helpers({
  totalTasks: function() {
    return Template.instance().totalTasks.get();
  },
  totalCompanies: function() {
    return Template.instance().totalCompanies.get();
  },
  totalContacts: function() {
    return Template.instance().totalContacts.get();
  },
  totalProjects: function() {
    return Template.instance().totalProjects.get();
  },
  totalOpportunities: function() {
    return Template.instance().totalOpportunities.get();
  },
  totalProducts: function() {
    return Template.instance().totalProducts.get();
  },
  totalPo: function() {
    return Template.instance().totalPo.get();
  }
});
