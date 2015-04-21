var React = require('react');
var Router = require('react-router');

var ActiveUsers = require('views/activeUsers');
var CompanyList = require('views/companyList');
var ContactList = require('views/contactList');
var Company = require('views/company');
var Contact = require('views/contact');
var LoginForm = require('views/loginForm');

var auth = require('./auth');

var { Route, RouteHandler, DefaultRoute } = Router;

var App = React.createClass({

  getInitialState: function(){
    return {};
  },

  render: function(){
    return (
      <div>
        <RouteHandler/>
      </div>
    );
  }

});

var Logout = React.createClass({

  mixins: [ Router.Navigation ],

  componentDidMount: function() {
    auth.logout();
    this.transitionTo('app');
  },

  render: function() {
    return <p>You're logged out!</p>;
  }

});

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="login" handler={LoginForm}/>
    <Route name="logout" handler={Logout}/>
    <Route name="companyList" path="company" handler={CompanyList}/>
    <Route name="company" path="company/:companyId" handler={Company}/>
    <Route name="contactList" path="contact" handler={ContactList}/>
    <Route name="contact" path="contact/:contactId" handler={Contact}/>
    <Route name="admin" handler={ActiveUsers}/>
    <DefaultRoute handler={CompanyList}/>
  </Route>
);

Router.run(routes, function(Handler){
  React.render(<Handler/>, document.getElementById('app'));
});
