var React = require('react');
var request = require('superagent');

var LoginForm = React.createClass({
  handleSubmit: function(e){
    e.preventDefault();
    var username = this.refs.username.getDOMNode().value.trim();
    var password = this.refs.password.getDOMNode().value.trim();
    request
      .post('/login')
      .type('form')
      .send({
        uid: username,
        pwd: password
      })
      .end(function(err, res){
        this.props.handleAuth(err, res);
      }.bind(this));
  },
  render: function(){
    return (
      <div>
        <header className="bar bar-nav">
          <h1 className="title">EliteWeb</h1>
        </header>
        <div className="content">
          <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Your username" ref="username" />
            <input type="password" placeholder="Your password" ref="password" />
            <button className="btn btn-positive btn-block">Login</button>
          </form>
        </div>
      </div>
    )
  }
});

module.exports = LoginForm;
