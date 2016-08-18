import './contact-list-item.html';
import './contact-list-item.css';
import '/imports/ui/components/tags/tag-badges/tag-badges.js';

Template.contactListItem.onRendered(function() {
  this.subscribe('companyById', this.data.companyId);
});

Template.contactListItem.helpers({
  company: function() {
    return Companies.findOne(this.companyId);
  },
  name: function() {
    const searchDef = Template.currentData().index.getComponentDict().get('searchDefinition'),
          pattern = new RegExp(searchDef, 'gi'),
          forename = Template.currentData().forename.replace(pattern, '<span class="highlighted-search">$&</span>'),
          surname = Template.currentData().surname.replace(pattern, '<span class="highlighted-search">$&</span>');
    return '<span class="contact-forename">' + forename + '</span> ' + surname;
  }
});
