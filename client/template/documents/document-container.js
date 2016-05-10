// documentContainer expects to be passed:
// - collectionName: the name of the collecton on which it's operating
// - id: the _id of the mongo document on which it's operating
// - permissionRequired: the name of the permission needed to add / remove docs

Template.documentContainer.onRendered(function() {
  documentAPI.loadScripts();
});

Template.documentContainer.helpers({
  documents: function() {
    var mongoDoc = Collections[this.collectionName].findOne(this.id);
    if (!mongoDoc || !mongoDoc.documents) return;
    return _.map(mongoDoc.documents, (doc) => {
      return {
        "docName": doc.docName,
        "docPath": doc.docPath,
        "fileIcon": doc.fileIcon,
        "service": doc.service,
        "serviceIcon": doc.serviceIcon,
        "collectionName": this.collectionName,
        "id": this.id,
      };
    }).sort(function(a, b) {
      return a.docName.localeCompare(b.docName);
    });
  }
});

Template.documentContainer.events({
  'click #add-drive-document': function() {
    documentAPI.googleChooser( (err, res) => {
      if (err) throw new Meteor.Error(err);
      _.each(res, (file) => {
        documentAPI.addDocument(this.collectionName, this.id, file);
      });
    });
  },
  'click #add-dropbox-document': function() {
    documentAPI.dropboxChooser( (err, res) => {
      if (err) throw new Meteor.Error(err);
      _.each(res, (file) => {
        documentAPI.addDocument(this.collectionName, this.id, file);
      });
    });
  },
  'click #add-box-document': function() {
    documentAPI.boxChooser( (err, res) => {
      if (err) throw new Meteor.Error(err);
      _.each(res, (file) => {
        documentAPI.addDocument(this.collectionName, this.id, file);
      });
    });
  },
  'click #remove-document': function() {
    documentAPI.removeDocument(this.collectionName, this.id, this);
  }
});
