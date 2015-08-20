Template.opportunityDetail.onCreated(function() {
  // Redirect if data doesn't exist
  this.autorun(function() {
    var opp = Opportunities.findOne(FlowRouter.getParam('id'));
    if (FlowRouter.subsReady() && opp === undefined) {
      FlowRouter.go('opportunities');
    }
  });
});

Template.opportunityDetail.onRendered(function() {
  $.getScript('/vendor/docxgen.min.js');
});

Template.opportunityDetail.helpers({
  friendlyDate: function() {
    return moment(this.date).format('MMMM Do YYYY, h:mma');
  },
  stages: function() {
    return OpportunityStages.find({}, {sort: {order: 1}});
  },
  oppData: function() {
    return Opportunities.findOne({_id: FlowRouter.getParam('id')})
  },
  isNotFirstStage: function() {
    var currentStage = this.currentStageId;
    var firstId = OpportunityStages.findOne({"order": 0})._id;
    if (currentStage == firstId) return false;
    return true;
  },
  isLastStage: function() {
    var currentStage = this.currentStageId;
  //  var finalStageOrder = OpportunityStages.find({}).count() - 1;
    var lastStageId = OpportunityStages.findOne({},{ sort: { order: -1}})._id;
    if (currentStage == lastStageId) return true;
    return false;
  },
  isActive: function() {
    return !this.isArchived;
  },
  getItems: function() {
    var items = [];
    for(var i = 0; i < this.items.length; i++) {
      var item = {
        index: i,
        oppId: this._id,
        data: this.items[i]
      };
      items.push(item);
    }
    return items;
  },
  company: function() {
    return Companies.findOne({_id: this.companyId});
  },
  contact: function() {
    return Contacts.findOne({_id: this.contactId});
  },
  canExportDocx: function() {
    if (bowser.safari) {
      return false
    } else {
      return true;
    }
  }
});

Template.opportunityDetail.events({
  'click #btnNextStage': function() {
    var currentStage = OpportunityStages.findOne(this.currentStageId);
    var nextStageIndex = currentStage.order + 1;
    var nextStageId = OpportunityStages.findOne({ order: nextStageIndex })._id;
    Opportunities.update(this._id, { $set: {
      currentStageId: nextStageId
    }});
  },
  'click #btnPrevStage': function() {
    var currentStage = OpportunityStages.findOne(this.currentStageId);
    var nextStageIndex = currentStage.order - 1;
    var nextStageId = OpportunityStages.findOne({ order: nextStageIndex })._id;
    Opportunities.update(this._id, { $set: {
      currentStageId: nextStageId
    }});
  },
  'click #btnLostOpportunity': function(event) {
    event.preventDefault();
    var oppId = this._id;
    bootbox.confirm("Are you sure you wish to mark this opportunity as lost? This action is not reversible.", function(result) {
      if (result === true) {
        Opportunities.update(oppId, { $set: {
          isArchived: true,
          hasBeenWon: false
        }});
      }
    });
  },
  'click #btnWonOpp': function(event) {
    event.preventDefault();
    var oppId = this._id;
    bootbox.confirm("Are you sure you wish to mark this opportunity as won? This action is not reversible.", function(result) {
      if (result === true) {
        Opportunities.update(oppId, { $set: {
          isArchived: true,
          hasBeenWon: true
        }});
      }
    });
  },
  'click #editOpportunity': function(event) {
    event.preventDefault();
    Modal.show('editOpportunityModal', this);
  },
  'click #removeOpportunity': function(event) {
    event.preventDefault();
    var oppId = this._id;

    bootbox.confirm("Are you sure you wish to delete this opportunity?", function(result) {
      if (result === true) {
        Opportunities.remove(oppId);
      }
    });
  },
  'click #btnAddLine': function(event) {
    event.preventDefault();
    Modal.show('insertOpportunityItemModal', this);
  },
  //Template generation
  'change #template-upload-docx': function(event) {
    var file = event.target.files[0];
    if (!file) return;

    var reader = new FileReader();
    reader.onload = function() {
      var doc = new Docxgen(reader.result);

      var companyName = "",
        companyAddress = "",
        contactName = "";

      if (this.companyId) {
        var company = Companies.findOne(this.companyId);
        companyName = company.name;
        companyAddress = company.address + "\r\n" + company.address2 + "\r\n" + company.city + "\r\n" + company.county + "\r\n" + company.country + "\r\n" + company.postcode;
      }
      if (this.contactId) {
        var contact = Contacts.findOne(this.contactId);
        contactName = contact.title + " " + contact.forename + " " + contact.surname;
      }

      var date = moment().format("MMM Do YYYY");

      var opp = Opportunities.findOne({_id: this._id});
      var items = [];
      _.each(opp.items, function(oi) {
        var obj = {
          name: oi.name,
          description: oi.description,
          value: oi.value,
          quantity: oi.quantity
        }
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
    }.bind(this);
    reader.readAsArrayBuffer(file);
  },
  'change #template-upload': function(event) {
    var file = event.target.files[0];
    if (!file) return;

    var reader = new FileReader();
    reader.onload = function() {
      var doc = new Docxgen(reader.result);

      var companyName = "",
        companyAddress = "",
        contactName = "";

      if (this.companyId) {
        var company = Companies.findOne(this.companyId);
        companyName = company.name;
        companyAddress = company.address + "\r\n" + company.address2 + "\r\n" + company.city + "\r\n" + company.county + "\r\n" + company.country + "\r\n" + company.postcode;
      }
      if (this.contactId) {
        var contact = Contacts.findOne(this.contactId);
        contactName = contact.title + " " + contact.forename + " " + contact.surname;
      }

      var date = moment().format("MMM Do YYYY");

      var opp = Opportunities.findOne({_id: this._id});
      var items = [];
      _.each(opp.items, function(oi) {
        var obj = {
          name: oi.name,
          description: oi.description,
          value: oi.value
        }
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
          var data = base64toBlob(res.data.file, 'application/pdf');
          Meteor.call('remainingConversions', res.headers['x-ratelimit-requests-remaining'], function(err, res) {});
          saveAs(data, file.name.replace(".docx", ".pdf"));
        });
      };
      toastr.success("Your file will be downloaded shortly", "Processing...");
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
  'click #opp-template-help': function(event) {
    event.preventDefault();
    Modal.show('oppHelpModal');
  }
});

Template.opportunityStage.helpers({
  isCurrentStep: function() {
    var id = FlowRouter.getParam('id');
    var stepId = Opportunities.findOne({_id: id}).currentStageId;
    if (stepId == this._id) return true;
    return false;
  }
});

Template.opportunityItem.helpers({
  isActive: function() {
    return !Opportunities.findOne(this.oppId).isArchived;
  }
});

Template.opportunityItem.events({
  'click .btnEditOppItem': function(event) {
    event.preventDefault();
    Modal.show('editOpportunityItemModal', this);
  },
  'click .btnDeleteOppItem': function(event) {
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
