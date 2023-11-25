const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3')

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
        await s3Client.send(new DeleteObjectCommand({ Bucket: process.env.AWS_BUCKET_NAME, Key: req.cover }));
        res.status(200).send('File deleted successfully');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};