Session.set('globalSearchOpen', false);

Template.globalSearch.onDestroyed(function() {
  Session.set('globalSearchOpen', false);
});

Template.globalSearch.onRendered(function() {
  $('#globalSearchBox').addClass('form-control');
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
    } else if (url.indexOf("opportunities") > -1) {
      FlowRouter.go("/opportunities/" + doc._id);
    } else if (url.indexOf("projects") > -1) {
      FlowRouter.go("/projects/" + doc._id);
    } else if (url.indexOf("purchaseOrders") > -1) {
      FlowRouter.go("/purchaseOrders/" + doc._id);
    } else if (url.indexOf("products") > -1) {
      FlowRouter.go("/products/" + doc._id);
    }
  }
});

Template.resultPill.helpers({
  parsedData: function() {
    if (this.hasOwnProperty('forename') && this.hasOwnProperty('surname')) {
      return '<a href="/contacts/' + this._id + '"><span class="label label-info"><i class="fa fa-fw fa-user"></i></span>' + this.forename + ' ' + this.surname + '</a>';
    } else if (this.hasOwnProperty('name') && this.hasOwnProperty('description') && this.hasOwnProperty('date')) {
      return '<a href="/opportunities/' + this._id + '"><span class="label label-warning"><i class="fa fa-fw fa-lightbulb-o"></i></span>' + this.name + '</a>';
    } else if (this.hasOwnProperty('projectTypeId')) {
      return '<a href="/projects/' + this._id + '"><span class="label label-danger"><i class="fa fa-fw fa-sitemap"></i></span>' + this.name + '</a>';
    } else if (this.hasOwnProperty('totalValue') && this.hasOwnProperty('userId')) {
      return '<a href="/purchaseOrders/' + this._id + '"><span class="label label-default"><i class="fa fa-fw fa-shopping-cart"></i></span>' + this.description + '</a>';
    } else if (this.hasOwnProperty('name') && this.hasOwnProperty('description')) {
      return '<a href="/products/' + this._id + '"><span class="label label-success"><i class="fa fa-fw fa-barcode"></i></span>' + this.name + '</a>';
    } else if (this.hasOwnProperty('name')) {
      return '<a href="/companies/' + this._id + '"><span class="label label-primary"><i class="fa fa-fw fa-building"></i></span>' + this.name + '</a>';
    }
  }
})