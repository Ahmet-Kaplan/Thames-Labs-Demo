import './project-details-panel.html';
import './modals/project-extract-help-modal.html';
import './modals/update-project-modal.js';
import bootbox from 'bootbox';

Template.projectDetailsPanel.onRendered(function() {
  $.getScript('/vendor/docxgen.min.js');
});

Template.projectDetailsPanel.helpers({
  taskOverDue: function() {
    return moment().isAfter(this.nextActionDue);
  },
  friendlyDueDate: function() {
    return moment(this.dueDate).format('MMMM Do YYYY, h:mma');
  },
  staffList: function() {
    var staffList = "";
    for (var i = 0; i < this.staff.length; i++) {
      var name = Meteor.users.find({
        _id: this.staff[i]
      }).fetch()[0].profile.name;
      staffList = staffList + name + ", ";
    }
    staffList = staffList.substring(0, staffList.length - 2);
    return staffList;
  },
  managerName: function() {
    return Meteor.users.find({
      _id: Template.currentData().userId
    }).fetch()[0].profile.name;
  }
});

Template.projectDetailsPanel.events({
  'click #edit-project': function(event) {
    event.preventDefault();
    Modal.show('updateProjectModal', this);
  },
  'click #remove-project': function(event) {
    event.preventDefault();
    var projectId = this._id;

    bootbox.confirm("Are you sure you wish to delete this project?", function(result) {
      if (result === true) {
        Projects.remove(projectId);
      }
    });
  },
  'click #proj-template-help': function(event) {
    event.preventDefault();
    Modal.show('projectExtractHelpModal', this);
  },
  'click #template-upload-link-docx': function(event) {
    document.getElementById('template-upload-docx').click();
  },
  'change #template-upload-docx': function(event) {
    event.preventDefault();

    var file = event.target.files[0];
    if (!file) return;
    if (file.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      toastr.error("Unable to process file. Please ensure the provided file is a word document (.docx)");
      return;
    }

    var reader = new FileReader();
    reader.onload = function() {
      toastr.info("Extracting, please wait...");

      var doc = new Docxgen(reader.result);

      let companyName = "";
      let companyAddress = "";
      let contactName = "";
      const userName = Meteor.user().profile.name;

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

      let staffList = "";
      if (this.staff) {
        for (var i = 0; i < this.staff.length; i++) {
          var name = Meteor.users.find({
            _id: this.staff[i]
          }).fetch()[0].profile.name;
          staffList = staffList + name + ", ";
        }
        staffList = staffList.substring(0, staffList.length - 2);
      }

      let accountManager = "";
      if (this.userId) {
        accountManager = Meteor.users.find({
          _id: this.userId
        }).fetch()[0].profile.name;
      }

      const date = moment().format("MMM Do YYYY");

      const projId = this._id;
      const project = Projects.findOne({
        _id: projId
      });

      doc.setData({
        "companyName": companyName || '',
        "contactName": contactName || '',
        "companyAddress": companyAddress || '',
        "date": date || '',
        "accountManager": accountManager || '',
        "name": project.name || '',
        "description": project.description || '',
        "author": userName || '',
        "projectNumber": project.sequencedIdentifier || '',
        "value": project.value || '',
        "dueDate": project.dueDate || '',
        "staff": staffList || ''
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
        toastr.error("Unable to process file.");
      }

      $('#template-upload-docx').val('');

    }.bind(this);
    reader.readAsArrayBuffer(file);
  }
});
