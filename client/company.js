var React = require('react');
var Router = require('react-router');
var auth = require('./auth');
var store = require('./store');

var Company = React.createClass({

  mixins: [ auth.mixin, Router.State ],

  getInitialState: function() {
    return {
      company: {}
    }
  },
  
  componentDidMount: function(){
    store._config.headers['x-tkn'] = auth.getToken();
    store.get('company').done(function(companies){
      var company = store.find('company', {'CompanyID': 3});
      console.log(company);
      this.setState({
        company: company
      });
    }.bind(this));
  },

  render: function() {
    return (
      <div>Loaded - {this.getParams().companyId}</div>
    )
  }

});

module.exports = Company;
