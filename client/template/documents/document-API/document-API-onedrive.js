//Note: This redirect html file is required for our setup, see https://dev.onedrive.com/sdk/js-v7/js-picker-open.htm
var onedriveRedirect = Meteor.absoluteUrl('vendor/onedrive_redirect.html');
documentAPI.onedriveChooser = function(cb) {
  var pickerOptions = {
    clientId: "3085de0d-0961-4759-bd1a-9883a33eee2d",
    action: "share",
    openInNewWindow: true,
    multiSelect: true,
    advanced: {
      redirectUri: onedriveRedirect
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
    error: function(e) {
      console.log(e);
    }
  };

  OneDrive.open(pickerOptions);
};