jest.dontMock('../auth.js');

describe('Auth', function() {
  var auth = require('../auth');

  it('Is an object', function() {
    expect(auth).toEqual(jasmine.any(Object));
  });

  it('Exposes a login function', function() {
    expect(auth.login).toEqual(jasmine.any(Function));
  });

  it('Exposes a logout function', function() {
    expect(auth.logout).toEqual(jasmine.any(Function));
  });

  it('Exposes a loggedIn function', function() {
    expect(auth.loggedIn).toEqual(jasmine.any(Function));
  });

  it('Exposes a getToken function', function() {
    expect(auth.getToken).toEqual(jasmine.any(Function));
  });

  it('Exposes a mixin', function() {
    expect(auth.mixin).toEqual(jasmine.any(Object));
  })

});
