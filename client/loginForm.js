var React = require('react');
var auth = require('./auth');
var Router = require('react-router');

var LoginForm = React.createClass({

  mixins: [ Router.State, Router.Navigation ],

  getInitialState: function() {
    return {
      error: false
    };
  },

  handleSubmit: function(e){
    e.preventDefault();
    var username = this.refs.username.getDOMNode().value.trim();
    var password = this.refs.password.getDOMNode().value.trim();
    auth.login(username, password, function(success) {

      if (!success) {
        return this.setState({ error: true });
      }

      // redirect to original location
      var nextPath = this.getQuery().nextPath;
      if (nextPath) {
        this.transitionTo(nextPath);
      } else {
        this.transitionTo('/');
      }

    }.bind(this));
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
    )
  }

});

module.exports = LoginForm;