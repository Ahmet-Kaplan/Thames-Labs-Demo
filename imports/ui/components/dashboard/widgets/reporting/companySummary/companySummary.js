import './companySummary.html';
import '../report-widget.css';

Template.companySummaryWidget.onCreated(function() {
  this.totalTasks = new ReactiveVar(0);
  this.totalCompanies = new ReactiveVar(0);
  this.totalContacts = new ReactiveVar(0);
  this.totalJobs = new ReactiveVar(0);

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
    Meteor.call('report.numberOfJobs', (err, data) => {
      this.totalJobs.set(data);
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
  totalJobs: function() {
    return Template.instance().totalJobs.get();
  },
});
