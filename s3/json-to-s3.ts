import AWS from 'aws-sdk';

const credentials = {
  accessKeyId: 'foo',
  secretAccessKey: 'bar',
};

const bucketName = 'demo-bucket';

const s3 = new AWS.S3({
  credentials,
  endpoint: 'http://localhost:4566',
  s3ForcePathStyle: true,
});

const obj = {
  firstname: 'Ricardo',
  lastname: 'Brambila',
};

const buf = Buffer.from(JSON.stringify(obj));

const data = {
  Bucket: bucketName,
  Key: 'ricardo-brambila.json',
  Body: buf,
  ContentEncoding: 'base64',
  ContentType: 'application/json',
  ACL: 'public-read',
};

s3.upload(data, function (err, data) {
  if (err) {
    console.log(err);
    console.log('Error uploading data: ', data);
  } else {
    console.log('succesfully uploaded!!!');
  }
});
