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
  combo: "ctrl+alt+p ctrl+alt+o",
  callback: function() {
    if(!$('.modal-header h4').text()) {
      Modal.show('newPurchaseOrderForm');
    } else if($('.modal-header h4:contains("Add new purchase order")').length) {
      Modal.hide();
    }
  }
});

globalHotkeys.add({
  combo: "ctrl+alt+p ctrl+alt+r",
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

globalHotkeys.add({
  combo: "r e a l t i m e",
  callback: function() {
    bootbox.alert({
      title: "Congratulations!!!",
      message: 'You have found the secret pop up. This is of no use at all but well done!<br>Still, here is a nice gif for you.<iframe src="//giphy.com/embed/Ov5NiLVXT8JEc" width="480" height="202" frameBorder="0" allowFullScreen></iframe>'
    })
  }
});