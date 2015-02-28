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
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your username" ref="username" />
        <input type="text" placeholder="Your password" ref="password" />
        <input type="submit" value="Submit" />
      </form>
    )
  }
});

module.exports = LoginForm;
