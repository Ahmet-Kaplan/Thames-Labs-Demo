var React = require('react'),
    CompanyList = require('./company')
    LoginForm = require('./loginform');

var App = React.createClass({
  getInitialState: function(){
    return {
      loggedIn: false,
      token: ''
    };
  },
  handleAuth: function(err, res){
    console.log(err, res);
  },
  render: function(){
    if (this.state.loggedIn){
      return <CompanyList token={this.state.token} />
    } else {
      return <LoginForm handleAuth={this.handleAuth} />
    }
  }
});

React.render(
  <App/>,
  document.getElementById('app')
);
