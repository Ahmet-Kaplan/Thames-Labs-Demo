var React = require('react'),
    store = require('./store');

var CompanyList = React.createClass({
  getInitialState: function(){
    return {
      companies: []
    };
  },
  componentDidMount: function(){
    store.get('company').done(function(companies){
      this.setState({
        companies: companies
      });
    }.bind(this));
  },
  render: function(){
    var companies = this.state.companies.map(function(company){
      return <CompanyListItem data={company} />;
    });
    return <ul>{companies}</ul>;
  }
});

var CompanyListItem = React.createClass({
  render: function(){
    return <li>{this.props.data.Company} - {this.props.data.Address}</li>;
  }
});

React.render(
  <CompanyList/>,
  document.getElementById('react')
);
