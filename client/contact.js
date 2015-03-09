var React = require('react');
var Router = require('react-router');
var request = require('superagent');
var truncate = require('truncate');
var moment = require('moment');

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
      
      
      request
      .get('/api/1.0/contact/' + contactId + '/activity')
      .set('x-tkn', auth.getToken())
      .end(function(res) {
        if (res.unauthorized) {
          return this.transitionTo('login');
        }
        this.setState({
          activity: res.body
        });
      }.bind(this));
  },
  
  getInitialState: function() {
    return {
      contact: [],
      activity: []
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
    
    var activities = this.state.activity.map(function(activity){
      var acttypeid = activity.ActivityTypeID;    
      var iconLoc = '';
        
      switch(acttypeid){
        case 1: iconLoc='ion-document'; //note
          break;
          case 2: iconLoc='ion-document-text'; //doc
          break;
          case 3: iconLoc='ion-alert'; //unused
          break;
          case 4: iconLoc='ion-email'; //email
          break;
          case 5: iconLoc='ion-ios-compose-outline'; //letter
          break;
          case 6: iconLoc='ion-printer'; //fax
          break;
          case 7: iconLoc='ion-ios-telephone'; //phone
          break;
          case 8: iconLoc='ion-checkmark-round'; //task
          break;
          case 9: iconLoc='ion-ios-bookmarks'; //diary
          break;
          case 10: iconLoc='ion-ios-email-outline'; //email
          break;
          case 11: iconLoc='ion-ios-telephone-outline'; // telemarketing
          break;
        default: iconLoc='ion-help';
          break;
      };        
        
      return (
        <li className="table-view-cell media">
         
          <span className="media-object pull-left">
              <i className={"icon " + iconLoc}/>
            </span>
            <div className="media-body">
              {activity.Activity}
              <p>{moment(activity.ActivityDate).format('MMMM Do YYYY, h:mm:ss a')}</p>
              <p>{truncate(activity.Body,50)}</p>
            </div>
        </li>
      )
    });
      
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
    )
      
  }

});

module.exports = Contact;
