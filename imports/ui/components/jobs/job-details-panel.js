import './job-details-panel.html';
import './modals/job-extract-help-modal.html';
import './modals/update-job-modal.js';

import { Companies, Contacts, Jobs } from '/imports/api/collections.js';
import bootbox from 'bootbox';

Template.jobDetailsPanel.onRendered(function() {
  $.getScript('/vendor/docxgen.min.js');
});

Template.jobDetailsPanel.helpers({
  taskOverDue: function() {
    return moment().isAfter(this.nextActionDue);
  },
  friendlyDueDate: function() {
    return moment(this.dueDate).format('MMMM Do YYYY, h:mma');
  },
  staffList: function() {
    let staffList = "";
    for (let i = 0; i < this.staff.length; i++) {
      const name = Meteor.users.find({
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

Template.jobDetailsPanel.events({
  'click #edit-job': function(event) {
    event.preventDefault();
    Modal.show('updateJobModal', this);
  },
  'click #remove-job': function(event) {
    event.preventDefault();
    const jobId = this._id;

    bootbox.confirm("Are you sure you wish to delete this job?", function(result) {
      if (result === true) {
        Jobs.remove(jobId);
      }
    });
  },
  'click #proj-template-help': function(event) {
    event.preventDefault();
    Modal.show('jobExtractHelpModal', this);
  },
  'click #template-upload-link-docx': function(event) {
    document.getElementById('template-upload-docx').click();
  },
  'change #template-upload-docx': function(event) {
    event.preventDefault();

    const file = event.target.files[0];
    if (!file) return;
    if (file.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      toastr.error("Unable to process file. Please ensure the provided file is a word document (.docx)");
      return;
    }

    const reader = new FileReader();
    reader.onload = function() {
      toastr.info("Extracting, please wait...");

      const doc = new Docxgen(reader.result);

      let companyName = "";
      let companyAddress = "";
      let contactName = "";
      const userName = Meteor.user().profile.name;

      if (this.companyId) {
        const company = Companies.findOne(this.companyId);
        if (company) {
          companyName = company.name;
          companyAddress = company.address + "\r\n" + company.address2 + "\r\n" + company.city + "\r\n" + company.county + "\r\n" + company.country + "\r\n" + company.postcode;
        }
      }
      if (this.contactId) {
        const contact = Contacts.findOne(this.contactId);
        if (contact) {
          contactName = contact.forename + " " + contact.surname;
        }
      }

      let staffList = "";
      if (this.staff) {
        for (let i = 0; i < this.staff.length; i++) {
          const name = Meteor.users.find({
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
      const job = Jobs.findOne({
        _id: projId
      });

      doc.setData({
        "companyName": companyName || '',
        "contactName": contactName || '',
        "companyAddress": companyAddress || '',
        "date": date || '',
        "accountManager": accountManager || '',
        "name": job.name || '',
        "description": job.description || '',
        "author": userName || '',
        "jobNumber": job.sequencedIdentifier || '',
        "value": job.value || '',
        "dueDate": job.dueDate || '',
        "staff": staffList || ''
      });

      try {
        doc.render();
        const docDataUri = doc.getZip().generate({
          type: 'blob'
        });
        docDataUri.type = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        //Convert data into a blob format for sending to api
        const blob = new Blob([docDataUri], {
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
