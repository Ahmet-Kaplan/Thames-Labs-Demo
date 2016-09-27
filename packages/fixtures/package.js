Package.describe({
  name: 'fixtures',
  version: '0.0.1',
  documentation: 'README.md',
  debugOnly: true
});

Package.onUse(function(api) {
  api.versionsFrom('1.3-rc.4');
  api.use('ecmascript');
  api.addFiles('server/data_fixtures.js');
  api.addFiles('server/user_fixtures.js');
});
