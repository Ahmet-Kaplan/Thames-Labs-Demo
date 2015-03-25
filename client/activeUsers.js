var React = require('react');
var Router = require('react-router');
var request = require('superagent');
var truncate = require('truncate');
var moment = require('moment');

var auth = require('./auth');

var Link = Router.Link;

var ActiveUsers = React.createClass({

  mixins: [ auth.mixin, Router.State, Router.Navigation ],

  getData: function() {
    var contactId = this.getParams().contactId;

    request
      .get('/api/1.0/activeusers')
      .set('x-tkn', auth.getToken())
      .end(function(res) {
        if (res.unauthorized) {
          return this.transitionTo('login');
        }
        this.setState({
          data: res.body
        });
      }.bind(this));     
  },
  
  getInitialState: function() {
    return {
      data: {
          Count: 0,
          Users: []
      }
    };
  },
  
  componentDidMount: function() {
    this.getData();
  },
  
  componentWillReceiveProps: function() {
    this.getData();
  },
  
  render: function() {
    var users = this.state.data.Users.map(function(user) {
        return (
            <li className="table-view-cell">
                {user}
            </li>
        );
    });
      
    return (
     <div>
        <header className="bar bar-nav">
          <button className="btn btn-link pull-left" onClick={this.goBack}>
            <i className="fa fa-chevron-left"/> Back
          </button>
          <h1 className="title">Active Users</h1>
        </header>

        <div className="content">
            <div>
                <p>These users have accessed EliteBMS within the last 30 days</p>
            </div>
            <div className="card">
                <ul className="table-view">
                    <li className="table-view-cell table-view-divider">Active Users</li>
                    {users}
                    <li className="table-view-cell table-view-divider">Total: {this.state.data.Count}</li>
                </ul>
            </div>
        </div>
      </div>
    );
      
  }

});

module.exports = ActiveUsers;
