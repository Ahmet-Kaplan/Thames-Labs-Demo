documentAPI.onedriveChooser = function(cb) {
  var pickerOptions = {
    clientId: "3085de0d-0961-4759-bd1a-9883a33eee2d",
    action: "share",
    openInNewWindow: true,
    multiSelect: true,
    advanced: {
        redirectUri: 'http://localhost:3000/onedrive-redirect.html'
    },
    success: function(response) {
      if (response.value) {
        var results = _.map(response.value, function(file) {
          return {
            docPath: file.webUrl,
            docName: file.name,
            fileIcon: 'file-o',
            service: 'onedrive',
            serviceIcon: 'cloud'
          };
        });
        cb(null, results);
        console.log(response);
      }
    },
    cancel: function() {},
    error: function(e) {console.log(e)}
  };

  OneDrive.open(pickerOptions);
}