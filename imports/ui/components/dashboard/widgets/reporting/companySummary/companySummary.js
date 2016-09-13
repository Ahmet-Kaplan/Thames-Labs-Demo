import './companySummary.html';
import '../report-widget.css';

Template.companySummaryWidget.onCreated(function() {
  this.totalTasks = new ReactiveVar(0);
  this.totalCompanies = new ReactiveVar(0);
  this.totalContacts = new ReactiveVar(0);
  this.totalProjects = new ReactiveVar(0);
  this.totalOpportunities = new ReactiveVar(0);
  this.totalProducts = new ReactiveVar(0);
  this.totalPo = new ReactiveVar(0);

  this.setValues = () => {
    Meteor.call('report.tasksCreated', (err, data) => {
      this.totalTasks.set(data);
    });
    Meteor.call('report.companiesStored', (err, data) => {
      this.totalCompanies.set(data);
    });
    Meteor.call('report.contactsStored', (err, data) => {
      this.totalContacts.set(data);
    });
    Meteor.call('report.numberOfProjects', (err, data) => {
      this.totalProjects.set(data);
    });
    Meteor.call('report.openOpportunities', (err, data) => {
      this.totalOpportunities.set(data);
    });
    Meteor.call('report.numberOfProducts', (err, data) => {
      this.totalProducts.set(data);
    });
    Meteor.call('report.numberOfPurchaseOrders', (err, data) => {
      this.totalPo.set(data);
    });
  };
});

Template.companySummaryWidget.onRendered(function() {
  this.setValues();
});

Template.companySummaryWidget.events({
  'click #ref_companySummaryWidget': function(event, template) {
    template.setValues();
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
