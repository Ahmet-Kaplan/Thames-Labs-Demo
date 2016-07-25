Template.companyListItem.helpers({
  companyName: function() {
    const searchDef = Template.currentData().index.getComponentDict().get('searchDefinition');
    var pattern = new RegExp(searchDef, 'gi');
    return Template.currentData().name.replace(pattern, '<span class="highlighted-search">$&</span>');
  },

  shortWebsite: function() {
    var website = this.website;

    // Remove http(s)://
    if(website.substring(0, 4) === 'http') {
      website = website.substring(7);
    } else if(website.substring(0, 5) === 'https') {
      website = website.substring(8);
    }

    // Remove www.
    website = website.replace('www.', '');
    if(website.length >= 14) {
      website = website.substring(0, 11) + '...';
    }
    return website;
  }
});
