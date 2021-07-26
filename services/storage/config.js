import dotenv from 'dotenv';
import gcs from '@google-cloud/storage';

dotenv.config();
const { Storage } = gcs;

const storage = new Storage({
    credentials: {
        client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY.replace(/\\n/gm, '\n')
    },
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID
});
const bucketName = process.env.GOOGLE_CLOUD_BUCKET;
const bucket = storage.bucket(bucketName);

export { bucket }