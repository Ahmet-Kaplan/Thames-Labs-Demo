import './global-search-result.html';

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
});
