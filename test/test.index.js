var assert = require('assert');
var glitch = require('./../lib/glitch');

describe('lib/glitch.js', function() {

	describe('#encode', function() {

	});


  describe('#decode', function() {

  	it('should return the .', function() {
    	glitch.decode.file('/files/hello-world.gif', function(data) {
    		assert.equal( 'test', data );
      });
    });

    it('should return the .', function() {
    	glitch.decode.url('https://dl.dropboxusercontent.com/u/2874680/glitxt/generated_gifs/1380399254693.gif', function(data) {
    		assert.equal( 'test', data );
      });
    });

  });

});
