var assert = require('assert');
var fs = require('fs');
var Glitcher = require('./../lib/index');

var testBuffer = fs.readFileSync(__dirname+'/files/test.gif');
var testMessage = 'hello-world';

describe('lib/index.js', function() {

  it('encode a message and decode it back.', function() {
    var encoded = Glitcher.encode(testBuffer, testMessage);
    var result = Glitcher.decode(encoded);
    assert.equal(testMessage, result);
  });

});
