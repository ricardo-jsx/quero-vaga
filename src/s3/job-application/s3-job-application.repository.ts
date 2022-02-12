import { Injectable } from '@nestjs/common';
import AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' });

const BUCKET_NAME = 'job-application';

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: process.env.AWS_KEY_ID,
    secretAccessKey: process.env.AWS_KEY_SECRET,
  },
  endpoint: process.env.AWS_URL,
  s3ForcePathStyle: true,
});

const fromPinToKey = (pin: string) => `${pin}.cv.pdf`;

@Injectable()
export class S3JobApplicationRepository {
  async upload(pin: string, file: Express.Multer.File): Promise<void> {
    const bucketParams = {
      Bucket: BUCKET_NAME,
      Key: fromPinToKey(pin),
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    };

    const promise = new Promise<void>((resolve, reject) => {
      s3.upload(bucketParams, function (err, data) {
        if (err) {
          console.log(err);
          console.log('Error uploading data: ', data);

          reject();
        } else {
          console.log('succesfully uploaded!!!');

          resolve();
        }
      });
    });

    return promise;
  }
}
