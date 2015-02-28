var React = require('react');
var store = require('./store');

var CompanyList = React.createClass({
  getInitialState: function(){
    return {
      companies: []
    };
  },
  componentDidMount: function(){
    store._config.headers['x-tkn'] = this.props.token;
    store.get('company').done(function(companies){
      this.setState({
        companies: companies
      });
    }.bind(this));
  },
  render: function(){
    var companies = this.state.companies.map(function(company){
      return <CompanyListItem data={company} handleClick={this.props.handleClick}/>;
    }.bind(this));
    return <ul>{companies}</ul>;
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
