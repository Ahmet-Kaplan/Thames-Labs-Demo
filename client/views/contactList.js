var React = require('react');
var Fuse = require('fuse.js');
var auth = require('../auth');
var Router = require('react-router');
var request = require('superagent');

var Link = Router.Link;

var ContactList = React.createClass({

  mixins: [ auth.mixin, Router.Navigation ],

  getInitialState: function(){
    return {
      contacts: [],
      searchText: '',
      fuse: {}
    };
  },

  componentDidMount: function(){
    request
      .get('/api/1.0/contact/')
      .set('x-tkn', auth.getToken())
      .end(function(res) {
        if (res.unauthorized) {
          return this.transitionTo('login');
        }
        var contacts = res.body;
        this.setState({
          contacts: contacts,
          fuse: new Fuse(contacts, {keys: ['Forename', 'Surname']})
        });
      }.bind(this));
  },

  searchHandler: function(){
    var searchText = this.refs.searchbox.getDOMNode().value;
    this.setState({searchText: searchText});
  },

  showAdmin: function() {
    this.transitionTo('admin');
  },

  render: function(){

    var contacts = [];
    if (this.state.searchText === '') {
      contacts = this.state.contacts;
    } else {
      contacts = this.state.fuse.search(this.state.searchText);
    }

    contacts = contacts.map(function(contact){
      return <ContactListItem data={contact}/>;
    }.bind(this));

    var title = "All Contacts";

    return (
      <div>
        <header className="bar bar-nav">
          <button className="btn btn-link pull-left" onClick={this.showAdmin}>
            Admin
          </button>
          <h1 className="title">{title}</h1>
        </header>
        <div className="bar bar-standard bar-header-secondary">
          <input type='search' ref='searchbox' placeholder="Search" onChange={this.searchHandler}/>
        </div>
        <div className="content">
          <ul className="table-view">{contacts}</ul>
        </div>
      </div>
    )
  }

});

var ContactListItem = React.createClass({

  render: function(){
    return (
      <li className="table-view-cell">
        <Link to="contact" params={{contactId: this.props.data.ContactID}} className="navigate-right">
          <h3>{this.props.data.Forename} {this.props.data.Surname}</h3>
          <p><i className="fa fa-phone-square"/> {this.props.data.Phone}</p>
          <p><i className="fa fa-mobile"/> {this.props.data.Mobile}</p>
          <p><i className="fa fa-envelope"/> {this.props.data.Email}</p>
        </Link>
      </li>
    );
  }

});

module.exports = ContactList;
