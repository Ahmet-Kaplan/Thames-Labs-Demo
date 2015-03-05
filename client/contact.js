var React = require('react');
var Router = require('react-router');
var request = require('superagent');

var auth = require('./auth');

var Link = Router.Link;

var Contact = React.createClass({

  mixins: [ auth.mixin, Router.State, Router.Navigation ],

  getContactData: function() {
    var contactId = this.getParams().contactId;

    request
      .get('/api/1.0/contact/' + contactId)
      .set('x-tkn', auth.getToken())
      .end(function(res) {
        if (res.unauthorized) {
          return this.transitionTo('login');
        }
        this.setState({
          contact: res.body
        });
      }.bind(this));
  },
  
  getInitialState: function() {
    return {
      contact: []
    };
  },
  
  componentDidMount: function() {
    this.getContactData();
  },
  
  componentWillReceiveProps: function() {
    this.getContactData();
  },
  
  render: function() {
    var contact = this.state.contact;

    return (
      <div>

        <header className="bar bar-nav">
          <button className="btn btn-link pull-left" onClick={this.goBack}>
            <i className="icon ion-backspace-outline"/>
          </button>
          <h1 className="title">Contact Information</h1>
        </header>

        <div className="content">

          <div className="card">
            <ul className="table-view">

              <li className="table-view-cell table-view-divider">
                {contact.Forename + ' ' + contact.Surname}
              </li>

              <li className="table-view-cell media">
                <a className="navigate-right" href={"tel:" + contact.Phone}>
                  <span className="media-object pull-left"><i className="icon ion-ios-telephone"></i></span>
                  <div className="media-body">
                    {contact.Phone}
                  </div>
                </a>
              </li>

              <li className="table-view-cell media">
                <a className="navigate-right" href={"tel:" + contact.Mobile}>
                  <span className="media-object pull-left"><i className="icon ion-iphone"></i></span>
                  <div className="media-body">
                    {contact.Mobile}
                  </div>
                </a>
              </li>

              <li className="table-view-cell media">
                <a className="navigate-right" href={"mailto:" + contact.Email}>
                  <span className="media-object pull-left"><i className="icon ion-email"></i></span>
                  <div className="media-body">
                    {contact.Email}
                  </div>
                </a>
              </li>
              
            </ul>
          </div>

        </div>

      </div>
    )
  }

});

module.exports = Contact;
