import './company-lookup.html';
import './company-lookup.css';
import '/imports/ui/components/loading/loading.js';

/*
  This template looks up companies from their website or their name.
  Usage: Import companyLookup table through Blaze {{> companyLookup (lookupResponse res)}}
  Results: Calls a callback provided by parent template with name completedLookup(res);
  See ../insert-modal.js insertCompanyModal.helpers.lookupResponse(res) for an example
*/

Template.companyLookup.onCreated(function() {
  this.magicList = new ReactiveVar([]);
  this.fetchingResults = new ReactiveVar(false);
  this.showResultsList = new ReactiveVar(false);
  this.showDuplicationWarning = new ReactiveVar(false);
  this.dupedRecord = new ReactiveVar('');
  this.companyData = new ReactiveVar({});
});

Template.companyLookup.onRendered(function() {
  $('#companyName').focus();

  this.triggerMagicSearch = _.debounce(() => {
    var searchInput = $('#companyName').val().trim();

    if(!searchInput) {
      this.fetchingResults.set(false);
      return;
    }

    var domainRegex = new RegExp('^(?:https?\://)?(?:www\.)?[a-z0-9\.-]+\\.[a-z]{2,4}$');
    var domainQuery = null;

    //If matches url regex, lookup for website
    if(searchInput.match(domainRegex) !== null) {
      var domainSplit = searchInput.replace(/https?\:\/\//, '').replace(/www\./, '').replace(' ', '').split('/');
      domainQuery = domainSplit[0];
    }

    if(!!domainQuery && domainQuery.length > 0) {
      Meteor.call('clearbit.getCompanyFromWebsite', searchInput, (err, results) => {
        if(results) {
          this.magicList.set(results);
        }
        this.showResultsList.set(true);
        this.fetchingResults.set(false);
      });
    //Otherwise, use the companies house API. Clearbit could be used in the future when we have more API Calls.
    } else {
      Meteor.call('companiesHouse.search.companies', _.startCase(searchInput.toLowerCase()), (err, res) => {
        if(res) {
          var results = {
            total: res.data.total_results,
            results: _.map(res.data.items, function(item, key) {
              return {
                id: key.toString(),
                companyNumber: item.company_number,
                name: _.startCase((item.title).toLowerCase()),
                geo: {
                  subPremise: _.startCase((item.address.address_line_1 || '').toLowerCase()),
                  streetName: _.startCase((item.address.address_line_2 || '').toLowerCase()),
                  city: _.startCase((item.address.locality || '').toLowerCase()),
                  postalCode: item.address.postal_code
                }
              };
            })
          };
        }
        if(results) {
          this.magicList.set(results);
        }
        this.showResultsList.set(true);
        this.fetchingResults.set(false);
      });
    }
  }, 500);

});


Template.companyLookup.helpers({
  resultsList: function() {
    return Template.instance().magicList.get().results;
  },
  resultsTotal: function() {
    return Template.instance().magicList.get().total;
  },
  fetchingResults: function() {
    return Template.instance().fetchingResults.get();
  },
  showResultsList: function() {
    return Template.instance().showResultsList.get();
  },
  companyData: function() {
    return Template.instance().companyData.get();
  },
  showDuplicationWarning: function() {
    return Template.instance().showDuplicationWarning.get();
  },
  dupedRecord: function() {
    return Template.instance().dupedRecord.get();
  }
});

Template.companyLookup.events({
  'keyup #companyName': function(evt) {
    evt.preventDefault();
    //Flush on Enter
    if(evt.keyCode === 13) {
      Template.instance().fetchingResults.set(true);
      Template.instance().triggerMagicSearch();
      Template.instance().triggerMagicSearch.flush;
    //Only trigger search if key is a number, letter OR backspace, dash/minus, dot/point, slash
    } else if(bowser.mobile || bowser.tablet || (evt.keyCode > 47 && evt.keyCode < 91) || [8, 109, 110, 189, 190, 191].indexOf(evt.keyCode) !== -1) {
      Template.instance().triggerMagicSearch.cancel;
      if($(evt.target).val().trim() !== '') {
        Template.instance().fetchingResults.set(true);
      } else {
        Template.instance().fetchingResults.set(false);
      }
      Template.instance().triggerMagicSearch();
    }
    //Handle duplication warning message
    var name = $('#companyName').val();
    var templateInstance = Template.instance();
    Meteor.call('company.checkExistsByName', name, (err, res) => {
      templateInstance.dupedRecord.set(res);
      templateInstance.showDuplicationWarning.set(res !== null);
    });
  },

  'click .magic-result': function(evt) {
    evt.preventDefault();
    var resultId = evt.target.id;
    var result = _.find(Template.instance().magicList.get().results, {id: resultId});

    Template.instance().companyData.set(result);
    Template.instance().data.completedLookup(result);

  },

  'click #manual-fill': function(evt) {
    evt.preventDefault();
    Template.instance().companyData.set({
      name: $('#companyName').val()
    });
    Template.instance().data.completedLookup(Template.instance().companyData.get());
  }
});
