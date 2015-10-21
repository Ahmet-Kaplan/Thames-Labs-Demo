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
      limit: 10,
      rules: [{
        subscription: "allRecords",
        field: ["name", "forename", "surname", "description"],
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
    if (this.hasOwnProperty('forename') && this.hasOwnProperty('surname')) {
      return '<span class="label label-info"><i class="fa fa-fw fa-user"></i></span> <a href="/contacts/' + this._id + '">' + this.forename + ' ' + this.surname + '</a>';
    } else if (this.hasOwnProperty('name') && this.hasOwnProperty('description') && this.hasOwnProperty('date')) {
      return '<span class="label label-warning"><i class="fa fa-fw fa-lightbulb-o"></i></span> <a href="/opportunities/' + this._id + '">' + this.name + '</a>';
    } else if (this.hasOwnProperty('name') && this.hasOwnProperty('userId') && this.hasOwnProperty('value')) {
      return '<span class="label label-danger"><i class="fa fa-fw fa-sitemap"></i></span> <a href="/projects/' + this._id + '">' + this.name + '</a>';
    } else if (this.hasOwnProperty('locked') && this.hasOwnProperty('status') && this.hasOwnProperty('userId')) {
      return '<span class="label label-default"><i class="fa fa-fw fa-shopping-cart"></i></span> <a href="/purchaseOrders/' + this._id + '">' + this.description + '</a>';
    } else if (this.hasOwnProperty('name') && this.hasOwnProperty('description')) {
      return '<span class="label label-success"><i class="fa fa-fw fa-barcode"></i></span> <a href="/products/' + this._id + '">' + this.name + '</a>';
    } else if (this.hasOwnProperty('name')) {
      return '<span class="label label-primary"><i class="fa fa-fw fa-building"></i></span> <a href="/companies/' + this._id + '">' + this.name + '</a>';
    }
  }
})
