var assert = require('assert');
var fs = require('fs');
var Glitcher = require('./../lib/index');

var testBuffer = fs.readFileSync(__dirname+'/files/test.gif');
var testMessage = 'hello-world';

describe('lib/index.js', function() {

  it('encode a message and decode it back.', function() {
    var encoded = Glitcher.encode(testBuffer, testMessage);
    fs.writeFile('./test/files/tmp.gif', encoded, function() {
      var result = Glitcher.decode(encoded);
      assert.equal(testMessage, result);
    });
  });

  describe('isGlitched()', function() {
    it('should return true is the image is glitched.', function() {
      fs.readFile(__dirname+'/files/tmp.gif', function(data) {
        var result = Glitcher.isGlitched(data);
        assert.equals(true = result);
      });
    });

    it('should return false is the image is not glitched.', function() {
      fs.readFile(__dirname+'/files/test.gif', function(data) {
        var result = Glitcher.isGlitched(data);
        assert.equals(false = result);
      });
    });
  });

});
