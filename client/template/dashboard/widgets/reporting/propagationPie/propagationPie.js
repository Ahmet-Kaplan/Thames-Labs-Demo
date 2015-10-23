Template.propagationPieWidget.onCreated(function() {
  this.totalCompanies = new ReactiveVar(0);
  this.totalContacts = new ReactiveVar(0);
  this.totalProjects = new ReactiveVar(0);
  this.totalOpportunities = new ReactiveVar(0);
  this.totalProducts = new ReactiveVar(0);
});

Template.propagationPieWidget.onRendered(function() {
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

Template.propagationPieWidget.events({
  'click #ref_propagationPieWidget': function(event, template) {
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

Template.propagationPieWidget.helpers({
  pieData: function() {

    var data = new Array();

    data.push({
      name: 'Companies',
      y: Template.instance().totalCompanies.get(),
      color: '#55BF3B'
    });
    data.push({
      name: 'Contacts',
      y: Template.instance().totalContacts.get(),
      color: '#bf3b3b'
    });
    data.push({
      name: 'Opportunities',
      y: Template.instance().totalOpportunities.get(),
      color: '#3b45bf'
    });
    data.push({
      name: 'Projects',
      y: Template.instance().totalProjects.get(),
      color: '#bf3ba2'
    });
    data.push({
      name: 'Products',
      y: Template.instance().totalProducts.get(),
      color: '#3bbfb3'
    });

    return {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false
      },
      title: {
        text: ''
      },
      credits: {
        enabled: false
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          },
          showInLegend: false
        }
      },
      series: [{
        type: 'pie',
        name: 'Entity Propagation',
        data: data
      }]
    };
  }
});
