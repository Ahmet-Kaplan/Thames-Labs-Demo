import '/imports/ui/components/companies/merge/merge-company-modal.js';
import '/imports/ui/components/companies/widgets/index.js';
import '/imports/ui/components/charts/sales-history.js';
import '/imports/ui/components/maps/map-viewer.js';
import '/imports/ui/components/custom-fields/custom-field-panel.js';
import '/imports/ui/components/opportunities/modals/insert/insert-company-opp-modal.js';

Template.companyDetail.onCreated(function() {
  this.oppStats = new ReactiveVar({});
  // Redirect if data doesn't exist
  this.autorun(function() {
    var company = Companies.findOne(FlowRouter.getParam('id'));
    if (FlowRouter.subsReady() && typeof company === "undefined") {
      FlowRouter.go('companies');
    } else if (FlowRouter.subsReady() && company.website !== '' && typeof company.website !== "undefined") {
      Meteor.call('getClearbitData', 'company', company._id);
    }
  });

  this.autorun(function() {
    var companyid = FlowRouter.getParam('id');
    var currentInstance = Template.instance();
    Meteor.call('opportunities.getCompanySalesHistory', companyid, function(err, res) {
      currentInstance.oppStats.set(res);
    });
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
});

Template.companyDetail.events({
  'click #merge-company': function(event, template) {
    event.preventDefault();
    Modal.show('mergeModal', this);
  },
  'change #template-upload': function(event) {
    var file = event.target.files[0];
    if (!file) return;
    if (file.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      toastr.error("Unable to extract to file. Please ensure the provided file is a word document (.docx)");
      return;
    }

    var reader = new FileReader();
    reader.onload = function() {
      var doc = new Docxgen(reader.result);
      doc.setData({
        "name": this.name || '',
        "address": this.address || '',
        "city": this.city || '',
        "county": this.county || '',
        "postcode": this.postcode || '',
        "country": this.country || '',
        "website": this.website || '',
        "phone": this.phone || ''
      });

      try {
        doc.render();
        var docDataUri = doc.getZip().generate({
          type: 'blob'
        });
        docDataUri.type = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        //Convert data into a blob format for sending to api
        var blob = new Blob([docDataUri], {
          type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        });
        saveAs(blob, file.name);
        toastr.success("Your data has been successfully extracted.");
      } catch (err) {
        toastr.error("Unable to extract to file.");
      }
      $('#template-upload-docx').val('');

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
    var url = "?f%5Bcompany%5D=" + this._id + "&f%5Bactive%5D=No";
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
  breadcrumbName: function() {
    return (this.sequencedIdentifier ? "Company #" + this.sequencedIdentifier : "Company");
  },
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
  },
  oppStats: function() {
    return Template.instance().oppStats.get();
  },
  showOppStats: function() {
    const oppStats = Template.instance().oppStats.get();
    if (oppStats) {
      const sum = oppStats.oppsWon + oppStats.oppsLost + oppStats.oppsPending;
      return (sum > 0);
    }
  }
});
