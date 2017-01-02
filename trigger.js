var aws = require('aws-sdk');
var s3 = new aws.S3();

exports.handler = function(event, context) {
   var bucket = event.Records[0].s3.bucket.name;
   var key = event.Records[0].s3.object.key;
   s3.getObject({
       Bucket:bucket,
       Key:key
   },
    function(err,data) {
        if (err) {
               console.log('error getting object ' + key + ' from bucket ' + bucket + 
                   '. Make sure they exist and your bucket is in the same region as this function.');
               context.done('error','error getting file'+err);
            }
            else {
                console.log(String(data.Body));
            }
        }
   );
};