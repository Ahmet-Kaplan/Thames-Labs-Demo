var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');

var userStore = require('../stores/userStore.js');
var actions = require('../actions/actions');

var LoginForm = React.createClass({

  mixins: [ Reflux.listenTo(userStore, "onUserChange") ],

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function() {
    return {
      error: false
    };
  },

  onUserChange: function(user) {
    if (!user.loggedIn) {
      this.setState({ error: true });
      setTimeout(this.clearError, 1000);
    } else {
      // redirect to original location
      var nextPath = this.context.router.getCurrentQuery().nextPath;
      if (nextPath && nextPath !== '/logout') {
        this.context.router.transitionTo(nextPath);
      } else {
        this.context.router.transitionTo('app');
      }
    }
  },

  clearError: function() {
    this.setState({ error: false });
  },

  handleSubmit: function(e){
    e.preventDefault();
    var username = this.refs.username.getDOMNode().value.trim();
    var password = this.refs.password.getDOMNode().value.trim();
    actions.login(username, password);
  },

  render: function(){
    var buttonClassString = "btn btn-block";
    if (this.state.error) {
      buttonClassString += " btn-negative";
    } else {
      buttonClassString += " btn-positive";
    }
    return (
      <div>

        <header className="bar bar-nav">
          <h1 className="title">EliteWeb</h1>
        </header>

        <div className="content">
          <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Your username" ref="username" />
            <input type="password" placeholder="Your password" ref="password" />
            <button className={buttonClassString}>
              <i className="ion-log-in"></i> Login
            </button>
          </form>
        </div>

      </div>
    );
  }

});

module.exports = LoginForm;
