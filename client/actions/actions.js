var Reflux = require('reflux');

var Actions = Reflux.createActions([

  // user account actions
  "login",
  "logout",

  // company actions
  "companyListUpdate",
  "companyUpdate",

  // contact actions
  "contactListUpdate",
  "contactUpdate",
  "contactUpdateByCompanyId",

  // activites actions
  "activityUpdateByCompanyId",
  "activityUpdateByContactId"

]);

module.exports = Actions;
