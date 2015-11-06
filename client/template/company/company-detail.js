Template.companyDetail.onCreated(function() {
  // Redirect if data doesn't exist
  this.autorun(function() {
    var company = Companies.findOne(FlowRouter.getParam('id'));
    if (FlowRouter.subsReady() && company === undefined) {
      FlowRouter.go('companies');
    } else if (FlowRouter.subsReady() && company.website !== '' && company.website !== undefined) {
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
  this.subscribe('opportunityStages');
  
  if (hopscotch.getState() === "welcome-tour:14") {
    $.getScript('/vendor/hopscotch/tours/welcome_tour.js');
  }
});

Template.companyDetail.onRendered(function() {
  // Load docxgen
  $.getScript('/vendor/docxgen.min.js');
});

Template.companyDetail.events({
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
  }
});

Template.companyDetail.helpers({
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
  opportunities: function() {
    return Opportunities.find({
      companyId: this._id
    });
  },
  linksList: function() {
    return [
      {
        text: 'Company details',
        anchor: 'company-details',
        icon: 'fa-file-text-o',
        permission: 'CanReadCompanies'
      },
      {
        text: 'Contacts',
        anchor: 'contacts',
        icon: 'fa-user',
        permission: 'CanReadContacts'
      },
      {
        text: 'Current Projects',
        anchor: 'projects',
        icon: 'fa-sitemap',
        permission: 'CanReadProjects'
      },
      {
        text: 'Purchase Orders',
        anchor: 'purchase-orders',
        icon: 'fa-shopping-cart',
        permission: 'CanReadPurchaseOrders'
      },
      {
        text: 'Tasks',
        anchor: 'tasks',
        icon: 'fa-tasks',
        permission: 'CanReadTasks'
      },
      {
        text: 'Extended information',
        anchor: 'entity-custom-fields',
        icon: 'fa-bookmark',
        permission: 'CanReadCompanies'
      },
      {
        text: 'Opportunities',
        anchor: 'opportunities',
        icon: 'fa-lightbulb-o',
        permission: 'CanReadOpportunities'
      },
      {
        text: 'Activity Timeline',
        anchor: 'activity-timeline',
        icon: 'fa-list',
        permission: 'CanReadCompanies'
      }
    ]
  }
});
