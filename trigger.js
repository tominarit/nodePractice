
var https = require('https');
var aws = require('aws-sdk');
var s3 = new aws.S3();

exports.handler = function(event, context) {

  var key = event.Records[0].s3.object.key;
  var url = "" + key

  console.log('start request to ' + url);
    
  https.get(url, function(res) {
    
    console.log("Got response: " + res.statusCode);
    
    var body = '';
    
    res.on('data', function(chunk) {
      body += chunk;
    });
    
    res.on('end', function() {
      console.log(body);
      context.succeed();
    });
    
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
    context.done(null, 'FAILURE');
  
  });

  console.log('end request to ' + url);
}






