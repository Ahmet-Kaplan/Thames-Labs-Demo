var React = require('react');
var Router = require('react-router');
var request = require('superagent');
var truncate = require('truncate');
var moment = require('moment');

var auth = require('./auth');

var Link = Router.Link;

var Company = React.createClass({

  mixins: [ auth.mixin, Router.State, Router.Navigation ],

  getCompanyData: function() {
    var companyId = this.getParams().companyId;
    request
      .get('/api/1.0/company/' + companyId)
      .set('x-tkn', auth.getToken())
      .end(function(res) {
        if (res.unauthorized) {
          return this.transitionTo('login');
        }
        this.setState({
          company: res.body
        });
      }.bind(this));

    request
      .get('/api/1.0/company/' + companyId + '/contact')
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
      .get('/api/1.0/company/' + companyId + '/activity')
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
      company: {},
      contact: [],
      activity: []
    };
  },
  
  componentDidMount: function() {
    this.getCompanyData();
  },
  
  componentWillReceiveProps: function() {
    this.getCompanyData();
  },
      
  render: function() {
    var company = this.state.company;
    var contacts = this.state.contact.map(function(contact){
      return (
        <li className="table-view-cell media">
          <Link to="contact" params={{contactId: contact.ContactID}} className="navigate-right">
            <span className="media-object pull-left">
              <i className="icon ion-person"/>
            </span>
            <div className="media-body">
              {contact.Forename} {contact.Surname}
              <p>{contact.Mobile}</p>
            </div>
          </Link>
        </li>
      )
    });
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
          <h1 className="title">Company Information</h1>
        </header>

        <div className="content">

          <div className="card">
            <ul className="table-view">

              <li className="table-view-cell table-view-divider">
                {company.Company}
              </li>

              <li className="table-view-cell media">
                <a className="navigate-right" href={"http://maps.apple.com/?q=" + company.PostCode}>
                  <span className="media-object pull-left"><i className="icon ion-location"></i></span>
                  <div className="media-body">
                    <p>{company.Address}</p>
                    <p>{company.City}</p>
                    <p>{company.County}</p>
                    <p>{company.PostCode}</p>
                    <p>{company.Country}</p>
                  </div>
                </a>
              </li>

              <li className="table-view-cell media">
                <a className="navigate-right" href={"tel:" + company.Phone}>
                  <span className="media-object pull-left"><i className="icon ion-ios-telephone"></i></span>
                  <div className="media-body">
                    {company.Phone}
                  </div>
                </a>
              </li>

              <li className="table-view-cell media">
                <a className="navigate-right" href={company.WebSite}>
                  <span className="media-object pull-left"><i className="icon ion-laptop"></i></span>
                  <div className="media-body">
                    {company.WebSite}
                  </div>
                </a>
              </li>
              
            </ul>
          </div>
          
          <div className="card">
            <ul className="table-view">

              <li className="table-view-cell table-view-divider">
                Contacts
              </li>

              {contacts}

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

module.exports = Company;
