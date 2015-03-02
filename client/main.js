var React = require('react'),
    CompanyList = require('./company'),
    LoginForm = require('./loginform'),
    Router = require('react-router');

var { Route, RouteHandler, Link, State } = Router;

var App = React.createClass({
  getInitialState: function(){
    return {
      loggedIn: false,
      token: ''
    };
  },
  handleAuth: function(err, res){
    console.log(err, res);
    if (res.status === 200) {
      this.setState({loggedIn: true, token: res.text});
    }
  },
  selectCompany: function(CompanyID){
    this.setState({selectedCompany: CompanyID});
  },
  deselectCompany: function(){
    this.setState({selectedCompany: null});
  },
  render: function(){
    if (this.state.loggedIn){
      if (this.state.selectedCompany){
        return <p onClick={this.deselectCompany}>Company {this.state.selectedCompany} selected</p>
      } else {
        return <CompanyList token={this.state.token} handleClick={this.selectCompany} />
      }
    } else {
      return <LoginForm handleAuth={this.handleAuth} />
    }
  }
});

React.render(
  <App/>,
  document.getElementById('app')
);
