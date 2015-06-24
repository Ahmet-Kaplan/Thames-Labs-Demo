Meteor.methods({
  calculatePurchaseOrderItemTotalValue: function(price, quantity) {
    return parseFloat(price * quantity).toFixed(2);
  }
});

GetRoutedPageTitle = function(currentName){
  var title = currentName;
  return title.charAt(0).toUpperCase() + title.slice(1);
};
