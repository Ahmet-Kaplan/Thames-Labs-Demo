import _ from 'lodash';
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
    if(_.startsWith(website, 'http://')) {
      website = _.replace(website, 'http://', '');
    } else if(_.startsWith(website, 'https://')) {
      website = _.replace(website, 'https://', '');
    }
    website = _.replace(website, 'www.', '');
    website = _.truncate(website);
    return website;
  }
});
