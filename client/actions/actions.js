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
  "contactUpdateByCompanyId"

]);

module.exports = Actions;
