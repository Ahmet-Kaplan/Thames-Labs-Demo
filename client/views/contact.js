var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var request = require('superagent');
var truncate = require('truncate');
var moment = require('moment');
var _ = require('underscore');

var contactStore = require('../stores/contactStore');
var activityStore = require('../stores/activityStore');
var actions = require('../actions/actions');
var auth = require('../mixins/auth');

var Link = Router.Link;

var Contact = React.createClass({

  mixins: [
    Reflux.connectFilter(contactStore, 'contact', function(contacts) {
      var contactId = parseInt(this.context.router.getCurrentParams().contactId);
      return _.find(contacts, function(contact) {
        return contact.ContactID === contactId;
      });
    }),
    Reflux.connectFilter(activityStore, 'activity', function(activities) {
      var contactId = parseInt(this.context.router.getCurrentParams().contactId);
      return activities.filter(function(activity) {
        return activity.ContactID === contactId;
      });
    }),
    auth
  ],

  contextTypes: {
    router: React.PropTypes.func
  },

  getContactData: function() {
    var contactId = parseInt(this.context.router.getCurrentParams().contactId);
    actions.contactUpdate(contactId);
    actions.activityUpdateByContactId(contactId);
  },

  componentDidMount: function() {
    this.getContactData();
  },

  componentWillReceiveProps: function() {
    this.getContactData();
  },

  render: function() {
    var contact = this.state.contact;

    var activities = this.state.activity.map(function(activity){
      var acttypeid = activity.ActivityTypeID;
      var iconLoc = '';

      switch(acttypeid){
        case 1: iconLoc='fa-file'; //note
          break;
          case 2: iconLoc='fa-file-text'; //doc
          break;
          case 3: iconLoc='fa-exclamation'; //unused
          break;
          case 4: iconLoc='fa-envelope'; //email
          break;
          case 5: iconLoc='fa-envelope-o'; //letter
          break;
          case 6: iconLoc='fa-print'; //fax
          break;
          case 7: iconLoc='fa-phone'; //phone
          break;
          case 8: iconLoc='fa-check-square-o'; //task
          break;
          case 9: iconLoc='fa-bookmark'; //diary
          break;
          case 10: iconLoc='fa-envelope'; //email
          break;
          case 11: iconLoc='fa-microphone'; // telemarketing
          break;
        default: iconLoc='fa-question';
          break;
      }

      return (
        <li className="table-view-cell media" key={activity.ActivityID}>

          <span className="media-object pull-left">
              <i className={"fa " + iconLoc}/>
            </span>
            <div className="media-body">
              {activity.Activity}
              <p>{moment(activity.ActivityDate).format('MMMM Do YYYY, h:mm:ss a')}</p>
              <p>{truncate(activity.Body, 50)}</p>
            </div>
        </li>
      );
    });

    return (
      <div>

        <header className="bar bar-nav">
          <button className="btn btn-link pull-left" onClick={this.context.router.goBack}>
            <i className="fa fa-chevron-left"/> Back
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
                  <span className="media-object pull-left"><i className="fa fa-phone-square"></i></span>
                  <div className="media-body">
                    {contact.Phone}
                  </div>
                </a>
              </li>

              <li className="table-view-cell media">
                <a className="navigate-right" href={"tel:" + contact.Mobile}>
                  <span className="media-object pull-left"><i className="fa fa-mobile"></i></span>
                  <div className="media-body">
                    {contact.Mobile}
                  </div>
                </a>
              </li>

              <li className="table-view-cell media">
                <a className="navigate-right" href={"mailto:" + contact.Email}>
                  <span className="media-object pull-left"><i className="fa fa-envelope"></i></span>
                  <div className="media-body">
                    {contact.Email}
                  </div>
                </a>
              </li>

            </ul>
          </div>
          <div className="card">
            <ul className="table-view">

              <li className="table-view-cell table-view-divider">
                Activities
              </li>

              {activities}

            </ul>
          </div>

        </div>

      </div>
    );

  }

});

module.exports = Contact;
