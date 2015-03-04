var React = require('react');
var Router = require('react-router');
var auth = require('./auth');
var request = require('superagent');

var Company = React.createClass({

  mixins: [ auth.mixin, Router.State ],

  getCompanyData: function() {
    var companyId = this.getParams().companyId;
    request
      .get('/api/1.0/company/' + companyId)
      .set('x-tkn', auth.getToken())
      .end(function(res) {
        this.setState({
          company: res.body
        });
      }.bind(this));
  },
  
  getInitialState: function() {
    return {
      company: {}
    };
  },
  
  componentDidMount: function() {
    this.getCompanyData();
  },
  
  componentWillReceiveProps: function() {
    this.getCompanyData();
  },
  
  render: function() {
    return (
      <div>Loaded - {this.state.company.CompanyID}</div>
    )
  }

});

module.exports = Company;
