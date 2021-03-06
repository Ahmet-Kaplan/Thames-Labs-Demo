import { currencyHelpers } from '/imports/api/currency/currency-helpers.js';
import './product-list-item.html';

Template.productListItem.helpers({
  prodName: function() {
    const searchDef = Template.currentData().index.getComponentDict().get('searchDefinition');
    const pattern = new RegExp(searchDef, 'gi');
    return Template.currentData().name.replace(pattern, '<span class="highlighted-search">$&</span>');
  },
  userCurrencyIcon: function() {
    return currencyHelpers.userCurrency();
  }
});