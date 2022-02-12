import { Injectable } from '@nestjs/common';
import AWS = require('aws-sdk');
import { S3CreateCompanyDTO } from './dto/s3-create-company.dto';

AWS.config.update({ region: 'us-east-1' });

const BUCKET_NAME = 'company-bucket';

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: 'foo',
    secretAccessKey: 'bar',
  },
  endpoint: 'http://localstack:4566',
  s3ForcePathStyle: true,
});

const fromCNPJToKey = (cnpj: string) => `${cnpj}.json`;

@Injectable()
export class S3CompanyRepository {
  createBucket(): Promise<void> {
    const bucketParams = {
      Bucket: BUCKET_NAME,
    };

    return new Promise((resolve, reject) => {
      s3.createBucket(bucketParams, function (err, data) {
        if (err) {
          console.log('Error', err);
          reject();
        } else {
          console.log('Success', data.Location);
          resolve();
        }
      });
    });
  }

  async upload(data: S3CreateCompanyDTO): Promise<void> {
    const buf = Buffer.from(JSON.stringify(data));
    const key = fromCNPJToKey(data.cnpj);

    const bucketParams = {
      Bucket: BUCKET_NAME,
      Key: key,
      Body: buf,
      ContentEncoding: 'base64',
      ContentType: 'application/json',
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

  get(cnpj: string): Promise<S3CreateCompanyDTO | null> {
    const key = fromCNPJToKey(cnpj);

    return new Promise(resolve => {
      s3.getObject({ Bucket: BUCKET_NAME, Key: key }, function (err, data) {
        if (!data || !data.Body) {
          resolve(null);
          return;
        }

        const s3CompanyDTO = S3CreateCompanyDTO.parse(
          JSON.parse(data.Body.toString()),
        );

        resolve(s3CompanyDTO);
      });
    });
  }
}
