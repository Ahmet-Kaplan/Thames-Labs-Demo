var MASTER_REF = null;

Template.googleDriveDisplay.onRendered(function() {
  MASTER_REF = this.data;
});

Template.googleDriveDisplay.helpers({
  showGoogleSignInButton: function() {
    return Meteor.call('accounts.checkGoogleService', function(err, res) {
      if (err) throw new Meteor.Error(err);
      return !res;
    });
  },
  driveDocuments: function() {
    var projRef = Projects.findOne({
      _id: this.entityData._id
    });

    return _.map(projRef.documents, function(doc) {
      return {
        "docName": doc.docName,
        "docPath": doc.docPath
      }
    })
  }
});

Template.googleDriveDisplay.events({
  'click .btn-google': function() {
    Meteor.signInWithGoogle({}, function(error, mergedUserId) {
      if (mergedUserId) {
        console.log(mergedUserId, 'merged with', Meteor.userId());
      }
    });
  },
  'click #add-drive-document': function() {
    $.getScript('https://apis.google.com/js/api.js?onload=onApiLoad');
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
    addView(google.picker.ViewId.DOCUMENTS).
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
      friendlyName = '';
    var doc = data[google.picker.Response.DOCUMENTS][0];

    docUrl = doc[google.picker.Document.URL];
    friendlyName = doc[google.picker.Document.NAME];
    var data = {
      docPath: docUrl,
      docName: friendlyName
    };

    addDocumentToEntity(MASTER_REF.entityType, MASTER_REF.entityData._id, data);
  }
}

addDocumentToEntity = function(entityType, entityId, documentData) {
  switch (entityType) {
    case 'project':
      var projRef = Projects.findOne({
        _id: entityId
      });
      var currDocs = []
      _.each(projRef.documents, function(doc) {
        currDocs.push(doc);
      });
      currDocs.push(documentData);
      Projects.update({
        _id: entityId
      }, {
        $set: {
          documents: currDocs
        }
      });
      break;
  }
}
