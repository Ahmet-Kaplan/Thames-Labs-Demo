import '/imports/ui/components/opportunities/opportunity-details-panel.js';
import '/imports/ui/components/opportunities/opportunity-previous-stage-button.js';
import '/imports/ui/components/opportunities/opportunity-next-stage-button.js';

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
    return _.sumBy(this.items, (item) => {
      return item.quantity * item.value;
    });
  },
});

Template.opportunityDetail.events({
  'click #lost-opportunity': function(event) {
    event.preventDefault();
    var oppId = this._id;
    bootbox.prompt("Are you sure you wish to mark this opportunity as lost? To continue, give a reason below and press OK, otherwise press Cancel.", function(result) {
      if (result !== null) {
        Opportunities.update(oppId, {
          $set: {
            isArchived: true,
            hasBeenWon: false,
            reasonLost: result
          }
        });
        var user = Meteor.user();
        var note = user.profile.name + ' marked this opportunity as lost';
        if (result) {
          note += ": <br />" + result;
        }
        var date = new Date();
        Activities.insert({
          type: 'Note',
          notes: note,
          createdAt: date,
          activityTimestamp: date,
          primaryEntityId: this._id,
          primaryEntityType: 'opportunities',
          primaryEntityDisplayData: this.name,
          opportunityId: oppId,
          createdBy: user._id
        });
      }
    });
  },
  'click #add-line-item': function(event) {
    event.preventDefault();
    Modal.show('insertOpportunityItemModal', this);
  },
  //Template generation
  'change #template-upload-docx': function(event) {
    var file = event.target.files[0];
    if (!file) return;

    var reader = new FileReader();
    reader.onload = function() {
      toastr.info("Extracting, please wait...");

      var doc = new Docxgen(reader.result);

      var companyName = "";
      var companyAddress = "";
      var contactName = "";

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
      var oppId = this._id;
      var opp = Opportunities.findOne({
        _id: this._id
      });
      var items = [];
      _.each(opp.items, function(oi) {
        var obj = {
          name: oi.name,
          description: oi.description,
          value: oi.value,
          quantity: oi.quantity
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
        "opportunityDescription": opp.description
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
  'change #template-upload': function(event) {
    var file = event.target.files[0];
    if (!file) return;

    var reader = new FileReader();
    reader.onload = function() {
      var doc = new Docxgen(reader.result);

      var companyName = "";
      var companyAddress = "";
      var contactName = "";

      if (this.companyId) {
        var company = Companies.findOne(this.companyId);
        companyName = company.name;
        companyAddress = company.address + "\r\n" + company.address2 + "\r\n" + company.city + "\r\n" + company.county + "\r\n" + company.country + "\r\n" + company.postcode;
      }
      if (this.contactId) {
        var contact = Contacts.findOne(this.contactId);
        contactName = contact.forename + " " + contact.surname;
      }

      var date = moment().format("MMM Do YYYY");
      var oppId = this._id;

      var opp = Opportunities.findOne({
        _id: this._id
      });
      var items = [];
      _.each(opp.items, function(oi) {
        var obj = {
          name: oi.name,
          description: oi.description,
          value: oi.value
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
        "opportunityDescription": opp.description
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
      var data = new FormData();
      data.append('file', blob, 'purchaseorder.docx');
      data.append('type', 'pdf');
      data.append('assign', 'connection_number@&@30@&@connection_duration@&@30 sec');
      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://gybra-swissknifedocs.p.mashape.com/docs');
      xhr.setRequestHeader('X-Mashape-Key', 'lkiGJfIdcNmshokW0VQBWvDBxzg4p12J1UEjsnBhpOquVKzczR');

      xhr.onload = function(r) {
        var fileName = JSON.parse(r.srcElement.response)['file_name'];
        var filePath = 'https://gybra-swissknifedocs.p.mashape.com/download/' + fileName;
        HTTP.get(filePath, {
          headers: {
            'X-Mashape-Key': 'lkiGJfIdcNmshokW0VQBWvDBxzg4p12J1UEjsnBhpOquVKzczR'
          }
        }, function(err, res) {

          function base64toBlob(base64Data, contentType) {
            contentType = contentType || '';
            var sliceSize = 1024;
            var byteCharacters = atob(base64Data);
            var bytesLength = byteCharacters.length;
            var slicesCount = Math.ceil(bytesLength / sliceSize);
            var byteArrays = new Array(slicesCount);

            for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
              var begin = sliceIndex * sliceSize;
              var end = Math.min(begin + sliceSize, bytesLength);

              var bytes = new Array(end - begin);
              var i, offset;
              for (offset = begin, i = 0; offset < end; ++i, ++offset) {
                bytes[i] = byteCharacters[offset].charCodeAt(0);
              }
              byteArrays[sliceIndex] = new Uint8Array(bytes);
            }
            return new Blob(byteArrays, {
              type: contentType
            });
          }

          //Convert returned base64 string into blob for download
          var blobData = base64toBlob(res.data.file, 'application/pdf');
          Meteor.call('remainingConversions', res.headers['x-ratelimit-requests-remaining'], function(err, res) {});
          saveAs(blobData, file.name.replace(".docx", ".pdf"));
        });
      };
      toastr.success("Your file will be downloaded shortly", "Processing...");

      $('#template-upload').val('');

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

      xhr.send(data);
    }.bind(this);
    reader.readAsArrayBuffer(file);
  },
  'click #template-upload-link': function() {
    document.getElementById('template-upload').click();
  },
  'click #template-upload-link-docx': function() {
    document.getElementById('template-upload-docx').click();
  },
  // 'click #template-google-drive-link': function() {
  //   documentAPI.googleChooser(function(err, res) {
  //     if (err) throw new Meteor.Error(err);
  //     _.each(res, (file) => {

  //       var fileId = file.fileId;
  //       HTTP.post('https://www.googleapis.com/drive/v2/files/' + fileId + '/copy&key=' + Meteor.settings.public.googleDeveloperKey, function(err, res) {
  //         if (err) throw new Meteor.Error(err);
  //         console.log(res.id);
  //       });
  //     });
  //   });
  // },
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

Template.opportunityStage.helpers({
  isCurrentStep: function() {
    var id = FlowRouter.getParam('id');
    var stepId = Opportunities.findOne({
      _id: id
    }).currentStageId;
    if (stepId == this.id) return true;
    return false;
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
