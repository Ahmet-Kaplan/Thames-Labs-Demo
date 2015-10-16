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
})
