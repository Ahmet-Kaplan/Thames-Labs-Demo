documentAPI.loadScripts = function() {
  $.getScript('https://www.dropbox.com/static/api/2/dropins.js').then( () => {
    Dropbox.appKey= 'cxpzllktv0grzai';
  });
  $.getScript('https://app.box.com/js/static/select.js');
  //$.getScript('https://app.box.com/js/static/select.js');
};
