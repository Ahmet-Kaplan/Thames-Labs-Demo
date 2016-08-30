/*
** Available combinations:
**  - ctrl+shift+f: search box
**  - ctrl+alt+c:   new company
**  - ctrl+alt+x:   new contact
**  - ctrl+alt+j:   new project
**  - ctrl+alt+p:   new purchase order
**  - ctrl+alt+r:   new product
**  - ctrl+alt+o:   new opportunity
**  - ctrl+alt+w:   close any open modal
*/

import '/imports/ui/components/companies/modals/insert-company-modal.js';
import '/imports/ui/components/contacts/modals/insert-contact-modal.js';
import '/imports/ui/components/opportunities/modals/insert/insert-opportunity-modal.js';
import '/imports/ui/components/projects/modals/insert-project-modal.js';
import '/imports/ui/components/products/modals/insert-product-modal.js';
import '/imports/ui/components/purchase-orders/modals/insert/insert-purchase-order.js';

const globalHotkeys = new Hotkeys();

globalHotkeys.add({
  combo: "ctrl+shift+f",
  callback: function() {
    //Check searchbox is open
    if ($("#globalSearchBox").length) {
      Modal.hide('globalSearch');
    } else {
      Modal.show('globalSearch');
    }
  }
});

globalHotkeys.add({
  combo: "ctrl+alt+c",
  callback: function() {
    if(!$('.modal-header h4').text()) {
      Modal.show('insertCompanyModal');
    } else if($('.modal-header h4:contains("Add new company")').length) {
      Modal.hide();
    }
  }
});

globalHotkeys.add({
  combo: "ctrl+alt+x",
  callback: function() {
    if(!$('.modal-header h4').text()) {
      Modal.show('insertContactModal');
    } else if($('.modal-header h4:contains("Add new contact")').length) {
      Modal.hide();
    }
  }
});

globalHotkeys.add({
  combo: "ctrl+alt+j",
  callback: function() {
    if(!$('.modal-header h4').text()) {
      Modal.show('insertProjectModal');
    } else if($('.modal-header h4:contains("Add new project")').length) {
      Modal.hide();
    }
  }
});

globalHotkeys.add({
  combo: "ctrl+alt+p",
  callback: function() {
    if(!$('.modal-header h4').text()) {
      Modal.show('insertPurchaseOrderModal');
    } else if($('.modal-header h4:contains("Add new purchase order")').length) {
      Modal.hide();
    }
  }
});

globalHotkeys.add({
  combo: "ctrl+alt+r",
  callback: function() {
    if(!$('.modal-header h4').text()) {
      Modal.show('insertProductModal');
    } else if($('.modal-header h4:contains("Add new product")').length) {
      Modal.hide();
    }
  }
});

globalHotkeys.add({
  combo: "ctrl+alt+o",
  callback: function() {
    if(!$('.modal-header h4').text()) {
      Modal.show('insertOpportunityModal');
    } else if($('.modal-header h4:contains("Add new opportunity")').length) {
      Modal.hide();
    }
  }
});

globalHotkeys.add({
  combo: "ctrl+alt+w",
  callback: function() {
    if($('.modal-header h4').text()) {
      Modal.hide();
    }
  }
});
