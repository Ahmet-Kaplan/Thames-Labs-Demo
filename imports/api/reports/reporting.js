import { Meteor } from 'meteor/meteor';
import { Companies, Contacts, Projects, Products, PurchaseOrders, Opportunities, Tasks } from '/imports/api/collections.js';

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
  //Projects
  'report.numberOfProjects': function() {
    if (!this.userId) return Error;
    return Projects.find().count();
  },
  'report.activeProjects': function() {
    if (!this.userId) return Error;
    return Projects.find({ active: { $eq: true } }).count();
  },
  'report.projectValue': function() {
    if (!this.userId) return Error;
    const projectValues = Projects.find({ active: { $eq: true } }, { value: 1 }).fetch();
    if(projectValues) return _.sumBy(projectValues, (p) => p.value);
    return '0';
  },
  'report.projectsAverage': function() {
    if (!this.userId) return Error;
    const projectValues = Projects.find({ active: { $eq: true } }, { value: 1 } ).fetch();
    if (projectValues) return _.meanBy(projectValues, (p) => p.value);
    return '0.00';
  },
  //Opportunities
  'report.openOpportunities': function() {
    if (!this.userId) return Error;
    return Opportunities.find({ isArchived: { $ne: true } }).count();
  },
  'report.archivedOpportunities': function() {
    if (!this.userId) return Error;
    return Opportunities.find({ isArchived: { $eq: true } }).count();
  },
  'report.wonOpportunities': function() {
    if (!this.userId) return Error;
    return Opportunities.find({ hasBeenWon: { $eq: true } }).count();
  },
  'report.lostOpportunities': function() {
    if (!this.userId) return Error;
    return Opportunities.find({ isArchived: { $eq: true }, hasBeenWon: { $ne: true } }).count();
  },
  'report.valueOfOpportunities': function() {
    if (!this.userId) return Error;
    const oppValues = Opportunities.find({ isArchived: { $ne: true } }, { value: 1 }).fetch();
    return _.sumBy(oppValues, (o) => o.value);
  },
  'report.averageOpportunityValue': function() {
    if (!this.userId) return Error;
    const oppValues = Opportunities.find({ isArchived: { $ne: true } }, { value: 1 }).fetch();
    return _.meanBy(oppValues, (o) => o.value);
  },
  //Products
  'report.numberOfProducts': function() {
    if (!this.userId) return Error;
    return Products.find().count();
  },
  'report.costOfProducts': function() {
    if (!this.userId) return Error;
    const productCosts = Products.find({}, { cost: 1 }).fetch();
    return _.sumBy(productCosts, (p) => p.cost);
  },
  'report.averageProductsCost': function() {
    if (!this.userId) return Error;
    const productCosts = Products.find({}, { cost: 1 }).fetch();
    return _.meanBy(productCosts, (p) => p.cost);
  },
  'report.averageProductsPrice': function() {
    if (!this.userId) return Error;
    const productCosts = Products.find({}, { price: 1 }).fetch();
    return _.meanBy(productCosts, (p) => p.price);
  },
  //Purchase Orders
  'report.numberOfPurchaseOrders': function() {
    if (!this.userId) return Error;
    return PurchaseOrders.find().count();
  },
  'report.ApprovedPo': function() {
    if (!this.userId) return Error;
    return PurchaseOrders.find({ status: { $eq: "Approved" } }).count();
  },
  'report.ArrivedPo': function() {
    if (!this.userId) return Error;
    return PurchaseOrders.find({ status: { $eq: "Arrived" } }).count();
  },
  'report.ClosedPo': function() {
    if (!this.userId) return Error;
    return PurchaseOrders.find({ status: { $eq: "Closed" } }).count();
  },
  'report.CancelledPo': function() {
    if (!this.userId) return Error;
    return PurchaseOrders.find({ status: { $eq: "Cancelled" } }).count();
  },
  'report.RejectedPo': function() {
    if (!this.userId) return Error;
    return PurchaseOrders.find({ status: { $eq: "Rejected" } }).count();
  }
});
