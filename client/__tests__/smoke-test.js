describe('smoke test', function() {

  it('should be able to test', function() {
    expect(true).toBe(true);
  });

  it('should work with simple functions', function() {
    expect(1 + 1).toBe(2);
  });

  it('should be able to require modules', function() {
    var _ = require('underscore.string');
    expect(_).toBeDefined();
  });

});
