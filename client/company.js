var React = require('react');
var store = require('./store');
var Fuse = require('fuse.js');

var CompanyList = React.createClass({
  getInitialState: function(){
    return {
      companies: [],
      filteredCompanies: []
    };
  },
  componentDidMount: function(){
    store._config.headers['x-tkn'] = this.props.token;
    store.get('company').done(function(companies){
      this.setState({
        companies: companies,
        filteredCompanies: companies
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
      <input type='search' ref='searchbox' onChange={this.searchHandler}/>
      <ul>{companies}</ul>
      </div>
    )
  }
});

var CompanyListItem = React.createClass({
  handleClick: function(){
    this.props.handleClick(this.props.data.CompanyID);
  },
  render: function(){
    return <li onClick={this.handleClick}>{this.props.data.Company} - {this.props.data.Address}</li>;
  }
});

module.exports = CompanyList;
