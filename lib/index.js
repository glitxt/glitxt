module.exports = {

    /**
     *
     */
    START_BUFFER: 1000,

    /**
     *
     */
    skipBuffer: function(buffer, totalChars) {
        return Math.round((buffer.length - this.START_BUFFER) / totalChars * 0.9 ); //0.9 for the border
    },

    /**
     * Store number of chars in last byte.
     */
    totalCharsBit: function(buffer, text) {
        buffer[buffer.length-1] = text.length;
        return buffer;
    },

    /**
     * Store glitch bit.
     */
    glitchBit: function(buffer) {
        buffer[buffer.length-2] = 0;
        return buffer;
    },

    /**
     * Decode an image.
     *
     * @param buffer The image buffer.
     * @returns the decoded text.
     */
    decode: function(buffer) {
        var nChars = buffer[buffer.length-1];
        var tmpSkipBuffer = this.skipBuffer(buffer, nChars);
        var decodedText = '';
        var iBuffer;

        //if (true) {};
        for (var i = 0; i<nChars; i++) {
          iBuffer = this.START_BUFFER + i*tmpSkipBuffer;

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
        var tmpSkipBuffer = this.skipBuffer(buffer, text.length);
        var iBuffer = this.START_BUFFER;

        for (var i = 0; i<text.length; i++) {
            iBuffer = this.START_BUFFER + i*tmpSkipBuffer;
            var asciiCode = text.charCodeAt(i);
            buffer[iBuffer] = asciiCode;
        }

        // store number of chars in last byte
        buffer = this.totalCharsBit(buffer, text);
        buffer = this.glitchBit(buffer);

        return buffer;
    },
    
    /**
     * Check if the image contains an message.
     *
     * @param buffer The image buffer.
     * @returns true or false
     */
    isGlitched: function(buffer) {
        return this.glitchBit(buffer) === 0 ? true : false; 
    }
};
