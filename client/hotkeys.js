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

globalHotkeys = new Hotkeys();

globalHotkeys.add({
  combo: "ctrl+shift+f",
  callback: function() {
    var state = Session.get('globalSearchOpen');
    if (state === false) {
      Session.set('globalSearchOpen', true);
      Modal.show('globalSearch');
    } else {
      Session.set('globalSearchOpen', false);
      Modal.hide('globalSearch');
    }
  }
});

globalHotkeys.add({
  combo: "ctrl+alt+c",
  callback: function() {
    if(!$('.modal-header h4').text()) {
      Modal.show('insertNewCompanyModal');
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
      Modal.show('newProjectForm');
    } else if($('.modal-header h4:contains("Add new project")').length) {
      Modal.hide();
    }
  }
});

globalHotkeys.add({
  combo: "ctrl+alt+p",
  callback: function() {
    if(!$('.modal-header h4').text()) {
      Modal.show('newPurchaseOrderForm');
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