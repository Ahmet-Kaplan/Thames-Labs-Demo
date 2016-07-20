Template.contactListItem.onRendered(function() {
  this.subscribe('companyById', this.data.companyId);
});

Template.contactListItem.helpers({
  company: function() {
    return Companies.findOne(this.companyId);
  },
  name: function() {
    const searchDef = Template.currentData().index.getComponentDict().get('searchDefinition');
    var pattern = new RegExp(searchDef, 'gi');
    const forename = Template.currentData().forename.replace(pattern, '<span class="highlighted-search">$&</span>');
    const surname = Template.currentData().surname.replace(pattern, '<span class="highlighted-search">$&</span>');
    return '<span class="contact-forename">' + forename + '</span> ' + surname;
  }
});
