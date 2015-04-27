var Reflux = require('reflux');

var Actions = Reflux.createActions([

  // user account actions
  "login",
  "logout",

  // company actions
  "companyListUpdate",

  // contact actions
  "contactListUpdate"

]);

module.exports = Actions;
