import '/imports/ui/components/tags/tag-badges/tag-badges.js';
import './project-list-item.html';

Template.projectListItem.onCreated(function() {
  this.subscribe('companyById', this.data.companyId);
  this.subscribe('contactById', this.data.contactId);
});

Template.projectListItem.helpers({
  projName: function() {
    const searchDef = Template.currentData().index.getComponentDict().get('searchDefinition');
    var pattern = new RegExp(searchDef, 'gi');
    return Template.currentData().name.replace(pattern, '<span class="highlighted-search">$&</span>');
  },
  company: function() {
    return Companies.findOne(this.companyId);
  },
  contact: function() {
    return Contacts.findOne(this.contactId);
  },
});
