import './global-search.html';
import { Companies, Contacts, Opportunities, Products, Projects, PurchaseOrders} from '/imports/api/collections.js';

Template.globalSearch.onCreated(function() {
  this.query = new ReactiveVar("");
});

Template.globalSearch.onRendered(function() {
  const instance = this;
  $(`#search-box`).selectize({
    closeAfterSelect: true,
    valueField: "url",
    labelField: "name",
    searchField: "name",
    createOnBlur: false,
    selectOnTab: true,
    openOnFocus: true,
    load: (query) => {
      instance.query.set(query);
    },
    render: {
      option: function(item, escape) {
        return `<div data-value="${item.originalId}" data-selectable="" class="option"><b>${item.entity}</b>: ${item.name}</div>`;
      }
    }
  });
  const searchBox = $("#search-box")[0].selectize;
  searchBox.on('change', (value) => {
    FlowRouter.go(value);
  });

  // search update listener
  this.autorun(() => {
    const searchOptions = {props: {autosuggest: true}, limit: 5};
    const companiesResultCursor = Companies.index.search(this.query.get(), searchOptions);
    const contactsResultCursor = Contacts.index.search(this.query.get(), searchOptions);
    const opportunitiesResultCursor = Opportunities.index.search(this.query.get(), searchOptions);
    const productsResultCursor = Products.index.search(this.query.get(), searchOptions);
    const projectsResultCursor = Projects.index.search(this.query.get(), searchOptions);
    const poResultCursor = PurchaseOrders.index.search(this.query.get(), searchOptions);

    const cursorsReady = companiesResultCursor.isReady() && contactsResultCursor.isReady()
      && opportunitiesResultCursor.isReady() && productsResultCursor.isReady()
      && projectsResultCursor.isReady();

    if (cursorsReady) {
      searchBox.clearOptions();
      const results = [];
      _.each(companiesResultCursor.fetch(), function(company) {
        results.push({url: `/companies/${company.__originalId}`, name: company.name, entity: "Company"});
      });
      _.each(contactsResultCursor.fetch(), function(contact) {
        results.push({url: `/contacts/${contact.__originalId}`, name: contact.name, entity: "Company"});
      });
      _.each(opportunitiesResultCursor.fetch(), function(opp) {
        results.push({url: `/opportunities/${opp.__originalId}`, name: opp.name, entity: "Opportunity"});
      });
      _.each(productsResultCursor.fetch(), function(product) {
        results.push({url: `/products/${product.__originalId}`, name: product.name, entity: "Product"});
      });
      _.each(projectsResultCursor.fetch(), function(project) {
        results.push({url: `/projects/${project.__originalId}`, name: project.name, entity: "Project"});
      });
      _.each(poResultCursor.fetch(), function(po) {
        results.push({url: `/purchaseOrders/${po.__originalId}`, name: po.description, entity: "Purchase Order"});
      });
      searchBox.addOption(results);
      //Show options dropdown if user has typed something
      searchBox.refreshOptions(this.query.get() !== '');
    }
  });
});