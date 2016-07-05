import Chart from 'chart.js';

Template.companyDetail.onCreated(function() {
  // Redirect if data doesn't exist
  this.autorun(function() {
    var company = Companies.findOne(FlowRouter.getParam('id'));
    if (FlowRouter.subsReady() && typeof company === "undefined") {
      FlowRouter.go('companies');
    } else if (FlowRouter.subsReady() && company.website !== '' && typeof company.website !== "undefined") {
      Meteor.call('getClearbitData', 'company', company._id);
    }
  });

  // Redirect if read permission changed
  this.autorun(function() {
    redirectWithoutPermission(Meteor.userId(), 'CanReadCompanies');
  });

  // Subscribe to necessary data
  var companyId = FlowRouter.getParam('id');
  this.subscribe('contactsByCompanyId', companyId);
  this.subscribe('projectsByCompanyId', companyId);
  this.subscribe('activityByCompanyId', companyId);
  this.subscribe('purchaseOrdersByCompanyId', companyId);
  this.subscribe('tasksByEntityId', companyId);
  this.subscribe('opportunitiesByCompanyId', companyId);
});

Template.companyDetail.onRendered(function() {
  // Load docxgen
  $.getScript('/vendor/docxgen.min.js');

  this.autorun(function() {
    var companyid = FlowRouter.getParam('id');
    Meteor.call('opportunities.getCompanySalesHistory', companyid, function(err, res) {
      var ctx = document.getElementById("shContainer").getContext("2d");

      Chart.defaults.global.defaultFontFamily = 'Source Sans Pro';

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ["Won", "Lost", "Open"],
          datasets: [{
            // label: '# of Opportunities',
            data: [res.oppsWon, res.oppsLost, res.oppsPending],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          title: {
            display: false
          },
          legend: {display: false},
          scales: {
            yAxes: [{
              ticks: {
                stepSize: 1,
                beginAtZero: true
              }
            }]
          }
        }
      });


    });
  });
});

Template.companyDetail.events({
  'click #merge-company': function(event, template) {
    event.preventDefault();
    Modal.show('mergeModal', this);
  },
  'change #template-upload': function(event) {
    var file = event.target.files[0];
    if (!file) return;

    var reader = new FileReader();
    reader.onload = function() {
      var doc = new Docxgen(reader.result);
      doc.setData({
        "name": this.name,
        "address": this.address,
        "city": this.city,
        "county": this.county,
        "postcode": this.postcode,
        "country": this.country,
        "website": this.website,
        "phone": this.phone
      });
      doc.render();
      var docDataUri = doc.getZip().generate({
        type: 'blob'
      });
      saveAs(docDataUri, file.name);
    }.bind(this);
    reader.readAsBinaryString(file);
  },
  'click #template-upload-link': function() {
    document.getElementById('template-upload').click();
  },
  'click #template-help': function(event) {
    event.preventDefault();
    Modal.show('wordHelpModal');
  },
  'click #add-contact': function(event) {
    event.preventDefault();
    Modal.show('insertCompanyContactModal', this);
  },
  'click #add-activity': function(event) {
    event.preventDefault();
    Modal.show('insertActivityModal', {
      company: this
    });
  },
  'click #add-project': function(event) {
    event.preventDefault();
    Modal.show('newCompanyProjectForm', {
      companyId: this._id
    });
  },
  'click #add-purchase-order': function(event) {
    event.preventDefault();

    if (!isProTenant(Meteor.user().group)) {
      showUpgradeToastr('To raise purchase orders');
      return;
    }

    Modal.show('newCompanyPurchaseOrderForm', {
      supplierCompanyId: this._id
    });
  },
  'click #remove-company': function(event) {
    event.preventDefault();
    var companyId = this._id;

    bootbox.confirm("Are you sure you wish to delete this company?", function(result) {
      if (result === true) {
        Companies.remove(companyId);
      }
    });
  },
  'click #edit-company': function(event) {
    event.preventDefault();
    Modal.show('editCompanyModal', this);
  },
  'click #add-opportunity': function(event) {
    event.preventDefault();
    Modal.show('insertCompanyOpportunityModal', {
      companyId: this._id
    });
  },
  'click #companyTelephone': function(event, template) {
    Activities.insert({
      type: 'Call',
      notes: Meteor.user().profile.name + ' made a call to ' + this.name,
      createdAt: new Date(),
      activityTimestamp: new Date(),
      companyId: this._id,
      primaryEntityId: this._id,
      primaryEntityType: 'companies',
      primaryEntityDisplayData: this.name,
      createdBy: Meteor.userId()
    });
  },
  'click #inactive-projects': function(event, template) {
    var url = "?f%5Bcompany%5D=" + this._id + "&f%5BshowArchived%5D=true";
    FlowRouter.go("/projects" + url);
  },
  'click #archived-opportunities': function(event, template) {
    var url = "?f%5Bcompany%5D=" + this._id + "&f%5BshowArchived%5D=true";
    FlowRouter.go("/opportunities" + url);
  },
  'click #fab': function(event) {
    event.preventDefault();
    Modal.show('editCompanyModal', this);
  }
});

Template.companyDetail.helpers({
  websiteHref: function(website) {
    return (website.indexOf('http://') > -1 ? website : 'http://' + website);
  },
  companyData: function() {
    var companyId = FlowRouter.getParam('id');
    var company = Companies.findOne({
      _id: companyId
    });
    if (company && company.tags) {
      company.tags.sort();
    }
    return company;
  },
  phoneHref: function(number) {
    return 'tel:' + number;
  },
  onCompanyRemove: function() {
    $(".modal-backdrop").remove();
    $("body").removeClass('modal-open');
  },
  mapTitle: function() {
    return this.name;
  },
  mapAddress: function() {
    return this;
  },
  hasAddress: function() {
    return (this.lat || this.lng || this.address || this.city || this.postcode || this.country || this.county);
  },
  opportunities: function() {
    return Opportunities.find({
      companyId: this._id,
      isArchived: { $ne: true }
    });
  },
  archivedOpps: function() {
    return Opportunities.find({
      companyId: this._id,
      isArchived: true
    }).count();
  },
  inactiveProjects: function() {
    return Projects.find({
      companyId: this._id,
      active: false
    }).count();
  },
  linksList: function() {
    return [{
      text: 'Company details',
      anchor: 'company-details',
      icon: 'fa-file-text-o',
      permission: 'CanReadCompanies'
    }, {
      text: 'Custom Fields',
      anchor: 'entity-custom-fields',
      icon: 'fa-bookmark',
      permission: 'CanReadCompanies'
    }, {
      text: 'Contacts',
      anchor: 'contacts',
      icon: 'fa-user',
      permission: 'CanReadContacts'
    }, {
      text: 'Opportunities',
      anchor: 'opportunities',
      icon: 'fa-lightbulb-o',
      permission: 'CanReadOpportunities'
    }, {
      text: 'Current Projects',
      anchor: 'projects',
      icon: 'fa-sitemap',
      permission: 'CanReadProjects'
    }, {
      text: 'Purchase Orders',
      anchor: 'purchase-orders',
      icon: 'fa-shopping-cart',
      permission: 'CanReadPurchaseOrders'
    }, {
      text: 'Tasks',
      anchor: 'tasks',
      icon: 'fa-tasks',
      permission: 'CanReadTasks'
    }, {
      text: 'Activity Timeline',
      anchor: 'activity-timeline',
      icon: 'fa-list',
      permission: 'CanReadCompanies'
    }];
  }
});
