var React = require('react');
var Router = require('react-router');
var request = require('superagent');
var textFilter = require('text-filter');

var userStore = require('../stores/userStore');
var actions = require('../actions/actions');

var Link = Router.Link;

var ContactList = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

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
      .set('x-tkn', userStore.getToken())
      .end(function(res) {
        if (res.unauthorized) {
          actions.logout();
        }
        var contacts = res.body;
        this.setState({
          contacts: contacts
        });
      }.bind(this));
  },

  searchHandler: function(){
    var searchText = this.refs.searchbox.getDOMNode().value;
    this.setState({searchText: searchText});
  },

  showAdmin: function() {
    this.context.router.transitionTo('admin');
  },

  render: function(){

    var contacts = this.state.contacts;

    if (this.state.searchText !== '') {
      contacts = contacts.filter(
        textFilter({query: this.state.searchText, fields: ['Forename', 'Surname']})
      );
    }

    contacts = contacts.map(function(contact){
      return <ContactListItem key={contact.ContactID} data={contact}/>;
    });

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
    );
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
