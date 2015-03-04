var React = require('react');
var Router = require('react-router');
var auth = require('./auth');
var request = require('superagent');

var Link = Router.Link;

var Company = React.createClass({

  mixins: [ auth.mixin, Router.State ],

  getCompanyData: function() {
    var companyId = this.getParams().companyId;
    request
      .get('/api/1.0/company/' + companyId)
      .set('x-tkn', auth.getToken())
      .end(function(res) {
        this.setState({
          company: res.body
        });
      }.bind(this));
  },
  
  getInitialState: function() {
    return {
      company: {}
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
    return (
      <div>
        <header className="bar bar-nav">
          <Link to="logout" className="btn pull-left">
            Logout
          </Link>
          <h1 className="title">{company.Company}</h1>
        </header>
        <div className="content">
          <div className="card">
            <ul className="table-view">
              <li className="table-view-cell media">
                <span className="media-object pull-left"><i className="fa fa-map-marker"></i></span>
                <div className="media-body">
                  Address
                  <p>{company.Address}</p>
                  <p>{company.City}</p>
                  <p>{company.County}</p>
                  <p>{company.PostCode}</p>
                  <p>{company.Country}</p>
                </div>
              </li>
              <li className="table-view-cell media">
                <a className="navigate-right" href={"tel:" + company.Phone}>
                  <span className="media-object pull-left"><i className="fa fa-phone"></i></span>
                  <div className="media-body">
                    {company.Phone}
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

module.exports = Company;
