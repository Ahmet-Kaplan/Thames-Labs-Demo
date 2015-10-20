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
    var easySearchInstance = EasySearch.getComponentInstance({
      index: 'products'
    });
    if (searchQuery) {
      easySearchInstance.search(searchQuery);
      $('.sidebar input').val(searchQuery);
    }
  });
});

Template.productList.helpers({
  productCount: function() {
    var easySearchInstance = EasySearch.getComponentInstance({
      index: 'products'
    });
    return easySearchInstance.get('total');
  },
  hasMultipleProducts: function() {
    var easySearchInstance = EasySearch.getComponentInstance({
      index: 'products'
    });
    return easySearchInstance.get('total') !== 1;
  }
});

Template.productList.events({
  'click #add-product': function(event) {
    event.preventDefault();
    Modal.show('insertProductModal', this);
  }
});
