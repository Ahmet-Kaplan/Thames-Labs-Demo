import './company-contact.html';
import { Companies, Contacts } from '/imports/api/collections.js';

Template.autosuggestCompanyContact.onRendered(function() {
  this.companyQuery = new ReactiveVar("");
  this.contactQuery = new ReactiveVar("");

  this.companyValue = new ReactiveVar("");

  const companySelectize = $(`#companyId`)[0].selectize;
  const contactSelectize = $(`#contactId`)[0].selectize;

  this.autorun(() => {
    const searchOptions = {props: {autosuggest: true}};
    const resultsCursor = Companies.index.search(this.companyQuery.get(), searchOptions);
    if (resultsCursor.isReady()) {
      companySelectize.clearOptions();
      companySelectize.addOption(resultsCursor.fetch());
      //Show options dropdown if user has typed something
      companySelectize.refreshOptions(this.companyQuery.get() !== '');
    }
  });

  this.autorun(() => {
    const searchOptions = { props: { autosuggest: true, filterCompanyId: this.companyValue.get()}};
    const resultsCursor = Contacts.index.search("", searchOptions);
    if (resultsCursor.isReady()) {
      contactSelectize.clearOptions();
      contactSelectize.addOption(resultsCursor.fetch());
      //Show options dropdown if user has typed something
      contactSelectize.refreshOptions(this.contactQuery.get() !== '');
    }
  });

});

Template.autosuggestCompanyContact.helpers({
  initializeCompany: () => {
    const self = Template.instance();
    const options = {
      closeAfterSelect: false,
      valueField: "__originalId",
      labelField: "name",
      searchField: "name",
      createOnBlur: false,
      selectOnTab: true,
      openOnFocus: true,
      load: (query) => {
        self.companyQuery.set(query);
      },
      onChange: (value) => {
        self.companyValue.set(value);
      },
      onEnter: (e) => {
        alert("enter key pressed");
      }
    };

    return options;
  },

  initializeContact: () => {
    const self = Template.instance();
    const options = {
      closeAfterSelect: false,
      valueField: "__originalId",
      labelField: "name",
      searchField: "name",
      createOnBlur: false,
      selectOnTab: true,
      openOnFocus: true,
      load: (query) => {
        self.contactQuery.set(query);
      },
      onFocus: () => {
        if (!self.contactQuery.get()) {
          self.contactQuery.set('');
        }
      }
    };
    return options;
  }
});