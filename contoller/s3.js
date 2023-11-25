const { S3Client, DeleteObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3')

exports.handleS3Upload = async (req, res) => {
    const s3Client = new S3Client();
    const param = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `bookstore/${req.originalname}`,
        Body: req.buffer,
    };
    try {

        await s3Client.send(new PutObjectCommand(param))

    } catch (error) {
        console.error('Error uploading file:', error);
    }
};

exports.handleS3Delete = async (req, res) => {
    const s3Client = new S3Client();

    try {
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: req.cover
        };

        await s3Client.send(new DeleteObject(params));

    } catch (error) {
        console.error('Error deleting file:', error);
    }
};