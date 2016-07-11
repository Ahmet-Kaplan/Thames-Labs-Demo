import './company-logo.css';
import './company-logo.html';

// http://stackoverflow.com/questions/8498592/extract-root-domain-name-from-string
function domainFromUrl(url) {
  if(!url) {
    return '';
  }
  var domain;
  if (url.indexOf("://") > -1) {
    domain = url.split('/')[2];
  } else {
    domain = url.split('/')[0];
  }
  domain = domain.split(':')[0];
  return domain;
}

Template.companyLogo.onCreated(function() {
  this.imageUrl = new ReactiveVar(null);

  this.autorun(function() {
    var clearbitUrl = 'https://logo.clearbit.com/',
        imageTester = new Image(),
        domain = domainFromUrl(Template.currentData().url),
        logoUrl = clearbitUrl + domain,
        imageUrl = Template.instance().imageUrl;
    // set imageUrl to null in case a previous template load set it
    imageUrl.set(null);
    // the onload event is only fired if the lookup succeeds, so in this case
    // set the imageUrl
    imageTester.onload = function() {
      imageUrl.set(logoUrl);
    };
    imageTester.src = logoUrl;
  });

});

Template.companyLogo.helpers({
  imageUrl: function() {
    return Template.instance().imageUrl.get();
  },
  additionalClasses: function() {
    return this.class;
  },
  showPlaceholder: function() {
    return this.showPlaceholder;
  }
});