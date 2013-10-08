var fs = require('fs');
var Buffer = require('buffer').Buffer;
var constants = require('constants');
var request = require('request');

/**
 * @param filepath - The file we wnt to load
 * @param data the socket.io data
 */
function encode(filepath, data, callback) {
  fs.readFile(filepath, function (err, gif) {
    if (err) throw err;

    var filename = 'gifs/'+ new Date().getTime() + '.jpg';

    console.log(gif.length);

    var text = data.text;
    var startBuffer = 1000;
    var skipBuffer = Math.round((gif.length - startBuffer) / text.length*0.9 );
    var iBuffer = startBuffer;
    
    //for (var i = text.length - 1; i >= 0; i--) {
    for (var i = 0; i<text.length; i++) {
      //console.log(gif[iBuffer]);
      iBuffer = startBuffer + i*skipBuffer
    
      //text.charAt(i);
      // convert the text char to ascii code
      var asciiCode = text.charCodeAt(i);
    
      gif[iBuffer] = asciiCode;//text.charAt(i);
      //iBuffer += skipBuffer;
      console.log('Writing " ' + text.charAt(i) + '" to index: ' + iBuffer);
      //console.log(text.charAt(i), iBuffer,gif[iBuffer]);
    };
    
    // store number of chars in last byte
    gif[gif.length-1] = text.length;
    console.log("number chars written: " + text.length);

    fs.writeFile(filename, gif, function(err) {
      callback({filename: filename});
    });
    
  });

};
exports.encode = encode;

/**
 * Der decode algo
 */
function decode(buffer, callback) {
  // read number of chars from last byte
  var nChars = buffer[buffer.length-1];
  console.log("Decode: number of chars: " + nChars);

  var startBuffer = 1000;
  var skipBuffer = Math.round((buffer.length - startBuffer) / nChars*0.9 ); //0.9 for the border
  var iBuffer = startBuffer;
  var decodedText = '';

  for (var i = 0; i<nChars; i++) {
    iBuffer = startBuffer + i*skipBuffer

    var ansiiCode = buffer[iBuffer];
    decodedText += String.fromCharCode(ansiiCode);
  };
  console.log('Decode: text = '+decodedText);
  callback(decodedText)
};

/**
 * Decode eine lokale datei
 */
function decodeFile(image, callback) {
  console.log('Start decoding image ',image);

  fs.readFile(image, function(err, gif) {
    decode(gif, function(data) {
      callback({decodedText:data});
    })
  });

};

exports.decodeFile = decodeFile;

/**
 * Decode ein bild aus dem internet.
 * als erstes wir das bild gerequested und anschließend decoded.
 */
function decodeUrl(url, callback) {
  // request(url, function (error, response, data) {

  //   var tmpFilepath = __dirname+'/data/'+Date();
  //   console.log('Write file to '+tmpFilepath);
  //   fs.writeFile(tmpFilepath, data, function() {

  //     //console.log(data);
  //     if (!error && response.statusCode == 200) {
  //       decodeFile(tmpFilepath, function(text) {
  //         callback(text);
  //       })
  //     }
  //   });
  // });
  
  var tmpFilepath = __dirname+'/data/'+Date();
  console.log('Write file to '+tmpFilepath);
  
  var picStream = fs.createWriteStream(tmpFilepath);
  picStream.on('close', function() {
    console.log('file done');
    decodeFile(tmpFilepath, function(text) {
      callback(text);
    })
  });
  request(url).pipe(picStream); 


};
exports.decodeUrl = decodeUrl;