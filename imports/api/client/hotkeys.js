import '/imports/ui/components/companies/modals/insert-company-modal.js';
import '/imports/ui/components/contacts/modals/insert-contact-modal.js';
import '/imports/ui/components/jobs/modals/insert-job-modal.js';

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
      Modal.show('insertJobModal');
    } else if($('.modal-header h4:contains("Add new job")').length) {
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
