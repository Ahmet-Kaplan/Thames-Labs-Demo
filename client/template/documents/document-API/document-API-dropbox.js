documentAPI.dropboxChooser = function(cb) {
  // Returns array of files chosen
  Dropbox.choose({
    linkType: "direct",
    multiselect: false,
    success: function(files) {
      var results = _.map(files, function(file) {
        return {
          docPath: file.link,
          docName: file.name,
          fileIcon: 'file-o',
          service: 'dropbox',
          serviceIcon: 'dropbox'
        };
      });
      cb(null, results);
    },
    cancel: function() {}
  });
};
