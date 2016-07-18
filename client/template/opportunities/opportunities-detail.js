import '/imports/ui/components/opportunities/opportunity-details-panel.js';
import '/imports/ui/components/opportunities/opportunity-previous-stage-button.js';
import '/imports/ui/components/opportunities/opportunity-next-stage-button.js';
import '/imports/ui/components/opportunities/opportunity-lost-link.js';
import { StageChart } from '/imports/ui/components/charts/stage-chart.js';

Template.opportunityDetail.onCreated(function() {
  var id = FlowRouter.getParam('id');

  // Subscribe to fixed data sources
  this.subscribe('activityByOpportunityId', id);
  this.subscribe('tasksByEntityId', id);

  this.autorun(() => {
    var opportunity = Opportunities.findOne(id);

    // Redirect if data doesn't exist
    if (FlowRouter.subsReady() && typeof opportunity === "undefined") {
      FlowRouter.go('opportunities');
    }

    // Redirect if read permission changed
    redirectWithoutPermission(Meteor.userId(), 'CanReadOpportunities');
  });

});

Template.opportunityDetail.onRendered(function() {

  $.getScript('/vendor/docxgen.min.js');

  this.chart = new StageChart('#d3-stage-chart');

  const stages = Tenants.findOne(Meteor.user().group).settings.opportunity.stages;
  var opportunity = Opportunities.findOne(FlowRouter.getParam('id'));

  opportunity.currentStageIndex = _.findIndex(stages, {id: opportunity.currentStageId});

  this.chart.draw(opportunity, stages);

  var resize = () => {
    this.chart.resize(opportunity, stages);
  };

  this.chartResizeEventHandler = window.addEventListener("resize", resize);

  this.autorun( () => {
    opportunity = Opportunities.findOne(FlowRouter.getParam('id'));
    opportunity.currentStageIndex = _.findIndex(stages, {id: opportunity.currentStageId});
    this.chart.setForce(opportunity, stages);
  });

  //Update opp stage when dragged
  this.chart._dragCallBack = (opportunityId, closestStageId) => {
    Meteor.call('opportunities.setStage', opportunityId, closestStageId, (err) => {
      if (err) toastr.error(err.error);
    });
  };

});

Template.opportunityDetail.helpers({
  stages: function() {
    var userTenant = Tenants.findOne({
      _id: Meteor.user().group
    });
    var stages = userTenant.settings.opportunity.stages;
    return stages.sort(function(a, b) {
      if (a.order < b.order) return -1;
      if (a.order > b.order) return 1;
      return 0;
    });
  },
  oppData: function() {
    return Opportunities.findOne({
      _id: FlowRouter.getParam('id')
    });
  },
  isActive: function() {
    return !this.isArchived;
  },
  getItems: function() {
    var items = [];
    for (var i = 0; i < this.items.length; i++) {
      var item = {
        index: i,
        oppId: this._id,
        data: this.items[i]
      };
      items.push(item);
    }
    return items;
  },
  overallValue: function() {
    return _.sumBy(this.items, (item) => item.quantity * item.value);
  }
});

Template.opportunityDetail.events({
  'click #add-line-item': function(event) {
    event.preventDefault();
    Modal.show('insertOpportunityItemModal', this);
  },
  //Template generation
  'change #template-upload-docx': function(event) {
    var file = event.target.files[0];
    if (!file) return;
    if (file.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      toastr.error("Unable to extract to file. Please ensure the provided file is a word document (.docx)");
      return;
    }

    var reader = new FileReader();
    reader.onload = function() {
      toastr.info("Extracting, please wait...");

      var doc = new Docxgen(reader.result);

      var companyName = "";
      var companyAddress = "";
      var contactName = "";
      var userName = Meteor.user().profile.name;

      if (this.companyId) {
        var company = Companies.findOne(this.companyId);
        if (company) {
          companyName = company.name;
          companyAddress = company.address + "\r\n" + company.address2 + "\r\n" + company.city + "\r\n" + company.county + "\r\n" + company.country + "\r\n" + company.postcode;
        }
      }
      if (this.contactId) {
        var contact = Contacts.findOne(this.contactId);
        if (contact) {
          contactName = contact.forename + " " + contact.surname;
        }
      }

      var date = moment().format("MMM Do YYYY");
      var oppId = this.opportunity._id;
      var opp = Opportunities.findOne({
        _id: oppId
      });
      var items = [];
      _.each(opp.items, function(oi) {
        var obj = {
          name: oi.name,
          description: oi.description,
          value: oi.value,
          quantity: oi.quantity,
          total: Number(oi.value * oi.quantity).toFixed(2)
        };
        items.push(obj);
      });

      doc.setData({
        "companyName": companyName,
        "contactName": contactName,
        "companyAddress": companyAddress,
        "date": date,
        "lineItems": items,
        "opportunityName": opp.name,
        "opportunityDescription": opp.description,
        "author": userName,
        "opportunityNumber": opp.sequencedIdentifier
      });

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

      $('#template-upload-docx').val('');

      Activities.insert({
        type: "Note",
        notes: Meteor.user().profile.name + " generated a new quotation.",
        createdAt: new Date(),
        activityTimestamp: new Date(),
        primaryEntityId: oppId,
        primaryEntityType: "opportunities",
        primaryEntityDisplayData: opp.name,
        opportunityId: oppId,
        createdBy: Meteor.userId()
      });

    }.bind(this);
    reader.readAsArrayBuffer(file);
  },
  'click #template-upload-link-docx': function() {
    document.getElementById('template-upload-docx').click();
  },
  'click #opp-template-help': function(event) {
    event.preventDefault();
    Modal.show('oppHelpModal');
  },
  'click #add-activity': function(event) {
    event.preventDefault();
    Modal.show('insertOpportunityActivityModal', {
      opportunity: this
    });
  },
  'click .nav-link': function(event) {
    event.preventDefault();
  },
  'click #fab': function(event) {
    event.preventDefault();
    Modal.show('editOpportunityModal', this);
  }
});

Template.opportunityItem.helpers({
  isActive: function() {
    return !Opportunities.findOne(this.oppId).isArchived;
  },
  totalValue: function() {
    var value = (this.data.quantity * this.data.value).toFixed(2);
    if (!isNaN(value)) return value;
  }
});

Template.opportunityItem.events({
  'click .edit-line-item': function(event) {
    event.preventDefault();
    Modal.show('editOpportunityItemModal', this);
  },
  'click .delete-line-item': function(event) {
    event.preventDefault();
    var oppId = this.oppId;
    var item = this.data;

    bootbox.confirm("Are you sure you wish to delete this opportunity line item?", function(result) {
      if (result === true) {
        Opportunities.update(oppId, {
          "$pull": {
            "items": item
          }
        });
      }
    });
  }
});

Template.opportunityDetail.onDestroyed(function() {
  window.removeEventListener("resize", this.chartResizeEventHandler);
});
