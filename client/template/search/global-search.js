Session.set('globalSearchOpen', false);

Template.globalSearch.onDestroyed(function() {
  Session.set('globalSearchOpen', false);
});

Template.globalSearch.onRendered(function() {
  $('#globalSearchBox').focus();
});

Template.globalSearch.helpers({
  settings: function() {
    return {
      position: "bottom",
      limit: 5,
      // rules: [{
      //   token: '@',
      //   // collection: 'globalCompanyRecords',
      //   subscription: "globalCompanyRecords",
      //   field: "name",
      //   template: Template.companyPill,
      //   matchAll: true
      // }, {
      //   token: '!',
      //   // collection: 'globalContactRecords',
      //   subscription: "globalContactRecords",
      //   field: "forename",
      //   template: Template.contactPill,
      //   matchAll: true
      // }, {
      //   token: '#',
      //   // collection: 'globalContactRecords',
      //   subscription: "globalContactRecords",
      //   field: "surname",
      //   template: Template.contactPill,
      //   matchAll: true
      // }]
      rules: [{
        subscription: "allRecords",
        field: ["name", "forename", "surname"],
        template: Template.resultPill,
        matchAll: true
      }]
    }
  }
});

Template.globalSearch.events({
  "autocompleteselect input": function(event, template, doc) {
    var url = template.firstNode.baseURI;
    if (url.indexOf("companies") > -1) {
      FlowRouter.go("/companies/" + doc._id);
    } else if (url.indexOf("contacts") > -1) {
      FlowRouter.go("/contacts/" + doc._id);
    }
  }
});

Template.resultPill.helpers({
  parsedData: function() {
    if (this.hasOwnProperty('name')) {
      return '<span class="label label-primary"><i class="fa fa-fw fa-building"></i></span>' + this.name;
    } else if (this.hasOwnProperty('forename') && this.hasOwnProperty('surname')) {
      return "<span class='label label-info'><i class='fa fa-fw fa-user'></i></span> " + this.forename + " " + this.surname;
    }
  }
})
