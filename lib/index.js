module.exports = {

    /**
     * Decode an image.
     *
     * @param buffer The image buffer.
     * @returns the decoded text.
     */
    decode: function(buffer) {
        var nChars = buffer[buffer.length-1];
        var startBuffer = 1000;
        var skipBuffer = Math.round((buffer.length - startBuffer) / nChars*0.9 ); //0.9 for the border
        var iBuffer = startBuffer;
        var decodedText = '';

        for (var i = 0; i<nChars; i++) {
          iBuffer = startBuffer + i*skipBuffer;

          var ansiiCode = buffer[iBuffer];
          decodedText += String.fromCharCode(ansiiCode);
        }               
        return decodedText;
    },
    
    /**
     * Encode a message into an image.
     *
     * @param buffer The image buffer.
     * @returns The image buffer.
     */
    encode: function(buffer,text) {

        var startBuffer = 1000;
        var skipBuffer = Math.round((buffer.length - startBuffer) / text.length*0.9 );
        var iBuffer = startBuffer;

        for (var i = 0; i<text.length; i++) {
            iBuffer = startBuffer + i*skipBuffer;

            var asciiCode = text.charCodeAt(i);

            buffer[iBuffer] = asciiCode;
            //console.log('Writing " ' + text.charAt(i) + '" to index: ' + iBuffer);
        }

        // store number of chars in last byte
        buffer[buffer.length-1] = text.length;
        // store glitch bit
        buffer[buffer.length-2] = 0;

        return buffer;
    },
    
    /**
     * Check if the image contains an message.
     *
     * @param buffer The image buffer.
     * @returns true or false
     */
    isGlitched: function(buffer) {
        return buffer[buffer.length-2] === 0 ? true : false; 
    }
};
