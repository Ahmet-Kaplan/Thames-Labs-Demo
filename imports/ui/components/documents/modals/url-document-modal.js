import { documentAPI } from '/imports/api/documents/documents-helpers.js';
import './url-document-modal.html';

Template.urlDocumentModal.events({
  'click #addDocument': function(evt) {
    evt.preventDefault();
    const docName = $('#docName').val();
    const docUrl = $('#docUrl').val();
    if(!docName || !docUrl) {
      toastr.warning('Please indicate both name and URL for the document.');
      return;
    } else if(!docUrl.match(/^(https?|ftp):\/\/.+/)) {
      toastr.warning('Invalid URL (must start by http, https or ftp)');
      return;
    }
    const file = {
      "docName": docName,
      "docPath": docUrl,
      "fileIcon": "link",
      "service": "custom",
      "serviceIcon": "link",
    };
    documentAPI.addDocument(this.collectionName, this.entityId, file);
    Modal.hide();
  }
});