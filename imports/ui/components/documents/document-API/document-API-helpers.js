documentAPI = {};

documentAPI.loadScripts = function() {
  if (typeof Dropbox === 'undefined') {
    $.getScript('https://www.dropbox.com/static/api/2/dropins.js').then(() => {
      Dropbox.appKey = Meteor.settings.public.dropboxApiKey;
    });
  }
  if (typeof BoxSelect === 'undefined') {
    $.getScript('https://app.box.com/js/static/select.js');
  }
  if (typeof gapi === 'undefined') {
    $.getScript('https://apis.google.com/js/api.js').then(() => {
      gapi.load('auth');
      gapi.load('picker');
    });
  }
  if (typeof OneDrive === 'undefined') {
    $.getScript('https://js.live.net/v7.0/OneDrive.js');
  }
};

documentAPI.addDocument = function(collectionName, id, documentData) {
  var mongoDoc = null;
  var docAlreadyExists = false;
  var docWasUpdated = false;

  mongoDoc = Collections[collectionName].findOne(id);
  var currDocs = [];
  _.each(mongoDoc.documents, function(doc) {
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
    Collections[collectionName].update(id, {
      $set: {
        documents: currDocs
      }
    });
  }

  if (docAlreadyExists) {
    toastr.clear();
    toastr.warning('The selected document has already been added');
  } else if (docWasUpdated) {
    toastr.clear();
    toastr.info('The selected document\'s URL was already referenced, but under a different name. We\'ve updated the list to show the new name.');
  } else {
    toastr.clear();
    toastr.success('The selected document has been added');
  }
};

documentAPI.removeDocument = function(collectionName, id, document) {
  Collections[collectionName].update(id, {
    $pull: {
      documents: {
        docPath: document.docPath,
        docName: document.docName
      }
    }
  });

  toastr.clear();
  toastr.success('The selected document has been successfully removed');
};

export { documentAPI };