var MASTER_REF = null;

Template.documentContainer.onRendered(function() {
  MASTER_REF = this.data;
});

Template.documentContainer.helpers({
  documents: function() {
    var entityRef = null;

    switch (this.entityType) {
      case 'project':
        entityRef = Projects.findOne({
          _id: this.entityData._id
        });
        break;
    }

    return _.map(entityRef.documents, function(doc) {
      return {
        "docName": doc.docName,
        "docPath": doc.docPath,
        "fileIcon": doc.fileIcon,
        "service": doc.service
      }
    }).sort(function(a, b) {
      return a.docName.localeCompare(b.docName);
    })
  }
});

Template.documentContainer.events({
  'click #add-drive-document': function() {
    $.getScript('https://apis.google.com/js/api.js?onload=onApiLoad');
  },
  'click #remove-document': function(event, template) {
    removeDocumentFromEntity(template.data.entityType, template.data.entityData._id, this);
  }
});

// The Browser API key obtained from the Google Developers Console.
var developerKey = 'AIzaSyBl0OmrvqoSet20yP7sOirUExQ28lloVzo';

// The Client ID obtained from the Google Developers Console. Replace with your own Client ID.
var clientId = "329730007716-ru8vk3pa23l06vrr30opg8aoassndkr8.apps.googleusercontent.com"

// Scope to use to access user's photos.
var scope = ['https://www.googleapis.com/auth/drive.readonly'];

var pickerApiLoaded = false;
var oauthToken;

// Use the API Loader script to load google.picker and gapi.auth.
onApiLoad = function() {
  gapi.load('auth', {
    'callback': onAuthApiLoad
  });
  gapi.load('picker', {
    'callback': onPickerApiLoad
  });
}

onAuthApiLoad = function() {
  window.gapi.auth.authorize({
      'client_id': clientId,
      'scope': scope,
      'immediate': false
    },
    handleAuthResult);
}

onPickerApiLoad = function() {
  pickerApiLoaded = true;
  createPicker();
}

handleAuthResult = function(authResult) {
  if (authResult && !authResult.error) {
    oauthToken = authResult.access_token;
    createPicker();
  }
}

// Create and render a Picker object for picking user Photos.
createPicker = function() {
  if (pickerApiLoaded && oauthToken) {
    var picker = new google.picker.PickerBuilder().
    addView(google.picker.ViewId.FOLDERS).
    setOAuthToken(oauthToken).
    setDeveloperKey(developerKey).
    setCallback(pickerCallback).
    build();
    picker.setVisible(true);
  }
}

// A simple callback implementation.
pickerCallback = function(data) {
  if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
    var docUrl = '',
      friendlyName = '',
      mimeType = '';
    var doc = data[google.picker.Response.DOCUMENTS][0];

    docUrl = doc[google.picker.Document.URL];
    friendlyName = doc[google.picker.Document.NAME];
    mimeType = doc[google.picker.Document.MIME_TYPE];

    var fileIcon = "file";
    switch (mimeType) {
      case 'application/vnd.google-apps.document':
        fileIcon = "file-o";
        break;
      case 'text/plain':
        fileIcon = "file-text-o";
        break;
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        fileIcon = "file-word-o";
        break;
      case 'text/x-markdown':
        fileIcon = "file-text";
        break;
      case 'application/vnd.google-apps.spreadsheet':
        fileIcon = "file-excel-o";
        break;
      case 'application/zip':
        fileIcon = "file-archive-o";
        break;
    }

    var data = {
      docPath: docUrl,
      docName: friendlyName,
      fileIcon: fileIcon,
      service: 'google-drive'
    };

    addDocumentToEntity(MASTER_REF.entityType, MASTER_REF.entityData._id, data);
  }
}

addDocumentToEntity = function(entityType, entityId, documentData) {
  var entityRef = null;
  var docAlreadyExists = false;
  var docWasUpdated = false;

  switch (entityType) {
    case 'project':
      entityRef = Projects.findOne({
        _id: entityId
      });
      var currDocs = [];
      _.each(entityRef.documents, function(doc) {
        if ((doc.docName === documentData.docName) && (doc.docPath === documentData.docPath)) {
          docAlreadyExists = true;
        } else if (doc.docPath === documentData.docPath) {
          docWasUpdated = true;
        } else {
          currDocs.push(doc);
        }
      });

      if (!docAlreadyExists) {
        currDocs.push(documentData);
        Projects.update({
          _id: entityId
        }, {
          $set: {
            documents: currDocs
          }
        });
      }
      break;
  }

  if (docAlreadyExists) {
    toastr.clear();
    toastr.warning('The selected document has already been added against this ' + entityType);
  } else if (docWasUpdated) {
    toastr.clear();
    toastr.info('The selected document\'s URL was already referenced, but under a different name. We\'ve updated the list to show the new name.');
  } else {
    toastr.clear();
    toastr.success('The selected document has been added to this ' + entityType);
  }
}

removeDocumentFromEntity = function(entityType, entityId, documentData) {
  switch (entityType) {
    case 'project':
      var projRef = Projects.findOne({
        _id: entityId
      });
      var currDocs = [];
      _.each(projRef.documents, function(doc) {
        if ((doc.docName !== documentData.docName) && (doc.docPath !== documentData.docPath)) {
          currDocs.push(doc);
        }
      });
      Projects.update({
        _id: entityId
      }, {
        $set: {
          documents: currDocs
        }
      });
      break;
  }

  toastr.clear();
  toastr.success('The selected document has been successfully removed from this ' + entityType);
}
