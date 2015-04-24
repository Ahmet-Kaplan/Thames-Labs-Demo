var React = require('react');
var Router = require('react-router');
var request = require('superagent');
var Reflux = require('reflux');
var textFilter = require('text-filter');

var auth = require('../auth');
var store = require('../stores/companyStore');
var actions = require('../actions/actions');

var Link = Router.Link;

var CompanyList = React.createClass({

  mixins: [
    auth.mixin,
    Router.Navigation,
    Reflux.connect(store, 'companies')
  ],

  getInitialState: function(){
    return {
      filterByUser: false,
      searchText: ''
    };
  },

  componentDidMount: function(){
    actions.companyListUpdate();
  },

  searchHandler: function(){
    var searchText = this.refs.searchbox.getDOMNode().value;
    this.setState({searchText: searchText});
  },

  userFilterToggle: function(){
    this.setState({filterByUser: !this.state.filterByUser});
  },

  showAdmin: function() {
    this.transitionTo('admin');
  },

  render: function(){

    var companies = this.state.companies;

    if (this.state.searchText !== '') {
      companies = companies.filter(
        textFilter({query: this.state.searchText, fields: ['Company']})
      );
    }

    if (this.state.filterByUser) {
      companies = companies.filter(function(company){
        return company.AccMgrID === localStorage.userId;
      });
    }

    companies = companies.map(function(company){
      return <CompanyListItem key={company.CompanyID} data={company}/>;
    });

    var title = this.state.filterByUser ? "My Companies" : "All Companies";

    return (
      <div>
        <header className="bar bar-nav">
          <button className="btn btn-link pull-left" onClick={this.showAdmin}>
            Admin
          </button>
          <h1 className="title">{title}</h1>
          <a className="icon fa fa-filter pull-right" onClick={this.userFilterToggle}></a>
        </header>
        <div className="bar bar-standard bar-header-secondary">
          <input type='search' ref='searchbox' placeholder="Search" onChange={this.searchHandler}/>
        </div>
        <div className="content">
          <ul className="table-view">{companies}</ul>
        </div>
      </div>
    );
  }

});

var CompanyListItem = React.createClass({

  render: function(){
    return (
      <li className="table-view-cell">
        <Link to="company" params={{companyId: this.props.data.CompanyID}} className="navigate-right">
          <h3>{this.props.data.Company}</h3>
          <p><i className="fa fa-map-marker"/> {this.props.data.Address}</p>
          <p><i className="fa fa-phone-square"/> {this.props.data.Phone}</p>
        </Link>
      </li>
    );
  }

});

module.exports = CompanyList;
