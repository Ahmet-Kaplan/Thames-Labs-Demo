import './company-list-item.html';
import '/imports/ui/components/tags/tag-badges/tag-badges.js';

Template.companyListItem.helpers({
  companyName: function() {
    const searchDef = Template.currentData().index.getComponentDict().get('searchDefinition'),
          pattern = new RegExp(searchDef, 'gi');
    return Template.currentData().name.replace(pattern, '<span class="highlighted-search">$&</span>');
  },

  shortWebsite: function() {
    let website = this.website;

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
      website = `${website.substring(0, 11)}...`;
    }
    return website;
  }
});
