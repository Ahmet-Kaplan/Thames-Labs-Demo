const boxChooser = (cb) => {
  var clientKey = Meteor.settings.public.boxApiKey;
  var options = {
    clientId: clientKey,
    linkType: 'shared',
    multiselect: false
  };
  var boxSelect = new BoxSelect(options);
  var isSupported = boxSelect.isBrowserSupported();

  if (isSupported) {
    boxSelect.success(function(response) {
      var results = _.map(response, function(file) {
        return {
          docPath: file.url,
          docName: file.name,
          fileIcon: 'file-o',
          service: 'box',
          serviceIcon: 'folder'
        };
      });
      cb(null, results);
      boxSelect.closePopup();
    });
    boxSelect.launchPopup();
  } else {
    toastr.error("The Box.com file selector does not support your current browser. You can see a list of supported browsers <a href='https://developers.box.com/the-box-file-picker/#browsersupport'>here</a>.");
  }
};

export { boxChooser };