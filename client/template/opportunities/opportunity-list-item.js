Template.opportunityListItem.onCreated(function() {
  this.subscribe('companyById', this.data.companyId);
  this.subscribe('contactById', this.data.contactId);
});

Template.opportunityListItem.helpers({
  oppName: function() {
    const searchDef = Template.currentData().index.getComponentDict().get('searchDefinition');
    var pattern = new RegExp(searchDef, 'gi');
    return Template.currentData().name.replace(pattern, '<span class="highlighted-search">$&</span>');
  },
  salesManager: function() {
    var user = Meteor.users.findOne({
      _id: this.salesManagerId
    });
    if (user) return user.profile.name;
  },
  friendlyEstClose: function() {
    return this.estCloseDate ? moment(this.estCloseDate).format('MMMM Do YYYY') : 'none';
  },
  company: function() {
    return Companies.findOne(this.companyId);
  },
  contact: function() {
    return Contacts.findOne(this.contactId);
  },
  lostAtStage: function() {
    var self = this;
    var tenant = Tenants.findOne({
      _id: Meteor.user().group
    });
    var stages = tenant.settings.opportunity.stages;
    var stageValue = "Unknown";

    _.each(stages, function(s) {
      if (s.id === self.currentStageId) {
        stageValue = s.title;
      }
    });

    return stageValue;
  },
  cssClass: function() {
    const closeDate = moment(this.estCloseDate);
    const daysFromNow = closeDate.diff(new Date(), 'days');
    if (daysFromNow <= 1 && !this.isArchived) {
      return 'alert-red';
    } else if (daysFromNow <= 7 && daysFromNow > 1 && !this.isArchived) {
      return 'alert-yellow';
    }
    return '';
  }
});