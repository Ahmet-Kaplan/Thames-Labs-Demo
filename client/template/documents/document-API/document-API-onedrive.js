//Note: This redirect html file is required for our setup, see https://dev.onedrive.com/sdk/js-v7/js-picker-open.htm
//If changing the location of the onedrive_redirect.html file, update the app settings on https://apps.dev.microsoft.com/.
//Login details use the admin@ email address.
var onedriveRedirect = Meteor.absoluteUrl('vendor/onedrive_redirect.html');
var clientId = Meteor.settings.public.oneDriveClientKey;
documentAPI.onedriveChooser = function(cb) {
  var pickerOptions = {
    clientId: clientId,
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
      }
    },
    cancel: function() {},
    error: function(e) {}
  };

  OneDrive.open(pickerOptions);
};