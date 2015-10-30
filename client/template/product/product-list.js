Template.productList.onCreated(function() {
  // Redirect if read permission changed
  this.autorun(function() {
    redirectWithoutPermission(Meteor.userId(), 'CanReadProducts');
  });
});

Template.productList.onRendered(function() {
  // Watch for session variable setting search
  Session.set('productListSearchQuery', null);
  Tracker.autorun(function() {
    var searchQuery = Session.get('productListSearchQuery');
    if (searchQuery) {
      ProductsIndex.getComponentMethods().search(searchQuery);
      $('.stick-bar input').val(searchQuery);
    }
  });
});

Template.productList.events({
  'click #add-product': function(event) {
    event.preventDefault();
    Modal.show('insertProductModal', this);
  },
  'click #export': function(event) {
    event.preventDefault();
    exportFromSearchToCSV('products');
  }
});
