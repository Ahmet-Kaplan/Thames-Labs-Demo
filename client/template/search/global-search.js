Session.set('globalSearchOpen', false);

Template.globalSearch.onDestroyed(function() {
  Session.set('globalSearchOpen', false);
});

Template.globalSearch.onRendered(function() {
  $('#globalSearchBox').addClass('form-control');
  $('#globalSearchBox').focus();
});

Template.globalSearch.helpers({
  settings: function() {
    return {
      position: "bottom",
      limit: 5,
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
      return '<span class="label label-primary"><i class="fa fa-fw fa-building"></i></span> <a href="/companies/' + this._id + '">' + this.name + '</a>';
    } else if (this.hasOwnProperty('forename') && this.hasOwnProperty('surname')) {
      return '<span class="label label-info"><i class="fa fa-fw fa-user"></i></span> <a href="/contacts/' + this._id + '">' + this.forename + ' ' + this.surname + '</a>';
    }
  }
})
