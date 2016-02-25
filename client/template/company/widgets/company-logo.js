// Helper function to get the domain from a url
var domainFromUrl = function(url) {
  var a = document.createElement('a');
  a.href = url;
  return a.hostname;
};

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