import { Meteor } from 'meteor/meteor';
import { Companies, Contacts, Jobs, Products, PurchaseOrders, Opportunities, Tasks } from '/imports/api/collections.js';

Meteor.methods({
  //Tasks
  'report.tasksCreated': function() {
    if (!this.userId) return Error;
    return Tasks.find().count();
  },
  'report.tasksCompleted': function() {
    if (!this.userId) return Error;
    return Tasks.find({ completed: { $eq: true } }).count();
  },
  'report.tasksDueInTheNextWeek': function() {
    if (!this.userId) return Error;
    const startDate = moment(),
          endDate = moment(startDate).add(7, 'days');
    return Tasks.find({ dueDate: { $gte: startDate.toDate(), $lte: endDate.toDate() } }).count();
  },
  'report.tasksOverdue': function() {
    if (!this.userId) return Error;
    const startDate = moment();
    return Tasks.find({ dueDate: { $lt: startDate.toDate() }, completed: { $eq: false } }).count();
  },
  //Companies
  'report.companiesStored': function() {
    if (!this.userId) return Error;
    return Companies.find().count();
  },
  //Contacts
  'report.contactsStored': function() {
    if (!this.userId) return Error;
    return Contacts.find().count();
  },
  //Jobs
  'report.numberOfJobs': function() {
    if (!this.userId) return Error;
    return Jobs.find().count();
  },
  'report.activeJobs': function() {
    if (!this.userId) return Error;
    return Jobs.find({ active: { $eq: true } }).count();
  },
  'report.jobValue': function() {
    if (!this.userId) return Error;
    const jobValues = Jobs.find({ active: { $eq: true } }, { value: 1 }).fetch();
    if(jobValues) return _.sumBy(jobValues, (p) => p.value);
    return '0';
  },
  'report.jobsAverage': function() {
    if (!this.userId) return Error;
    const jobValues = Jobs.find({ active: { $eq: true } }, { value: 1 } ).fetch();
    if (jobValues) return _.meanBy(jobValues, (p) => p.value);
    return '0.00';
  },
});
