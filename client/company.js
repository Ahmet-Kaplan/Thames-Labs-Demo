var React = require('react');
var Router = require('react-router');
var auth = require('./auth');
var request = require('superagent');

var Company = React.createClass({

  mixins: [ auth.mixin, Router.State ],

  getInitialState: function() {
    return {
      company: {}
    };
  },
  
  componentDidMount: function(){
    request
      .get('/api/1.0/company/' + this.getParams().companyId)
      .set('x-tkn', auth.getToken())
      .end(function(res) {
        console.log(res.body);
        this.setState({
          company: res.body
        });
      }.bind(this));
  },
  
  render: function() {
    return (
      <div>Loaded - {this.state.company.CompanyID}</div>
    )
  }

});

module.exports = Company;
