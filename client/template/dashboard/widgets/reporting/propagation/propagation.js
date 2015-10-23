Template.propagationWidget.onCreated(function() {
  this.totalCompanies = new ReactiveVar(0);
  this.totalContacts = new ReactiveVar(0);
  this.totalProjects = new ReactiveVar(0);
  this.totalOpportunities = new ReactiveVar(0);
  this.totalProducts = new ReactiveVar(0);
});

Template.propagationWidget.onRendered(function() {
  var template = this;

  Meteor.call('report.companiesStored', function(err, data) {
    template.totalCompanies.set(data.Count);
  });
  Meteor.call('report.contactsStored', function(err, data) {
    template.totalContacts.set(data.Count);
  });
  Meteor.call('report.numberOfProjects', function(err, data) {
    template.totalProjects.set(data.Count);
  });
  Meteor.call('report.numberOfOpportunities', function(err, data) {
    template.totalOpportunities.set(data.Count);
  });
  Meteor.call('report.numberOfProducts', function(err, data) {
    template.totalProducts.set(data.Count);
  });
});

Template.propagationWidget.events({
  'click #ref_propagationWidget': function(event, template) {
    Meteor.call('report.companiesStored', function(err, data) {
      template.totalCompanies.set(data.Count);
    });
    Meteor.call('report.contactsStored', function(err, data) {
      template.totalContacts.set(data.Count);
    });
    Meteor.call('report.numberOfProjects', function(err, data) {
      template.totalProjects.set(data.Count);
    });
    Meteor.call('report.numberOfOpportunities', function(err, data) {
      template.totalOpportunities.set(data.Count);
    });
    Meteor.call('report.numberOfProducts', function(err, data) {
      template.totalProducts.set(data.Count);
    });
  }
});

Template.propagationWidget.helpers({
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
  }
});
