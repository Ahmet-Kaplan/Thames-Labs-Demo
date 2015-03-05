var React = require('react');
var Fuse = require('fuse.js');
var auth = require('./auth');
var Router = require('react-router');
var request = require('superagent');

var Link = Router.Link;

var CompanyList = React.createClass({

  mixins: [ auth.mixin ],

  getInitialState: function(){
    return {
      companies: [],
      filterByUser: false,
      searchText: '',
      fuse: {}
    };
  },

  componentDidMount: function(){
    request
      .get('/api/1.0/company/')
      .set('x-tkn', auth.getToken())
      .end(function(res) {
        var companies = res.body;
        this.setState({
          companies: companies,
          fuse: new Fuse(companies, {keys: ['Company']})
        });
      }.bind(this));
  },

  searchHandler: function(){
    var searchText = this.refs.searchbox.getDOMNode().value;
    this.setState({searchText: searchText});
  },

  userFilterToggle: function(){
    this.setState({filterByUser: !this.state.filterByUser});
  },

  render: function(){

    var companies = [];
    if (this.state.searchText === '') {
      companies = this.state.companies;
    } else {
      companies = this.state.fuse.search(this.state.searchText);
    }
    if (this.state.filterByUser) {
      companies = companies.filter(function(company){
        return company.PrimaryContactID === localStorage.userId;
      });
    }

    companies = companies.map(function(company){
      return <CompanyListItem data={company}/>;
    }.bind(this));

    return (
      <div>
        <header className="bar bar-nav">
          <Link to="logout" className="btn pull-left">
            Logout
          </Link>
          <h1 className="title">Companies</h1>
          <a className="icon ion-funnel pull-right" onClick={this.userFilterToggle}></a>
        </header>
        <div className="bar bar-standard bar-header-secondary">
          <input type='search' ref='searchbox' placeholder="Search" onChange={this.searchHandler}/>
        </div>
        <div className="content">
          <ul className="table-view">{companies}</ul>
        </div>
      </div>
    )
  }

});

var CompanyListItem = React.createClass({
  
  render: function(){
    return (
      <li className="table-view-cell">
        <Link to="company" params={{companyId: this.props.data.CompanyID}} className="navigate-right">
          <h3>{this.props.data.Company}</h3>
          <p><i className="icon ion-location"/> {this.props.data.Address}</p>
          <p><i className="icon ion-ios-telephone"/> {this.props.data.Phone}</p>
        </Link>
      </li>
    );
  }

});

module.exports = CompanyList;
