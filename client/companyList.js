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
      filteredCompanies: []
    };
  },

  componentDidMount: function(){
    request
      .get('/api/1.0/company/')
      .set('x-tkn', auth.getToken())
      .end(function(res) {
        this.setState({
          companies: res.body,
          filteredCompanies: res.body
        });
      }.bind(this));
  },

  searchHandler: function(){
    var searchText = this.refs.searchbox.getDOMNode().value;
    var result = [];
    if (searchText === '') {
      result = this.state.companies;
    } else {
      var fuse = new Fuse(this.state.companies, {keys: ['Company', 'CompanyID']});
      result = fuse.search(searchText);
    }
    this.setState({
      filteredCompanies: result
    });
  },

  render: function(){
    var companies = this.state.filteredCompanies.map(function(company){
      return <CompanyListItem data={company} handleClick={this.props.handleClick}/>;
    }.bind(this));
    return (
      <div>
        <header className="bar bar-nav">
          <Link to="logout" className="btn pull-left">
            Logout
          </Link>
          <h1 className="title">Companies</h1>
        </header>
        <div className="bar bar-standard bar-header-secondary">
          <input type='search' ref='searchbox' onChange={this.searchHandler}/>
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
        <Link to="company" params={{companyId: this.props.data.CompanyID}} className="navigate-right">{this.props.data.Company} - {this.props.data.Address}</Link>
      </li>
    );
  }

});

module.exports = CompanyList;
