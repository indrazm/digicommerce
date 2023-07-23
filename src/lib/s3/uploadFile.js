import AWS from "aws-sdk";

AWS.config.update({
   accessKeyId: "z10A4pVZwM4DKeuzdHLL",
   secretAccessKey: "A35EntJOB0iy0Ub7Nsd7CMPDlxggQQI5mQWBnQOJ",
   region: "gb-ldn",
});

const S3 = new AWS.S3({
   endpoint: "https://b3u3.ldn.idrivee2-22.com",
});

export const uploadFile = (file, folder) => {
   const S3Params = {
      Bucket: "devscale-ecommerce",
      Key: `${folder}/${file.name}`,
      Body: file,
   };

   return new Promise((resolve, reject) => {
      S3.upload(S3Params, (err, data) => {
         if (err) {
            reject(err);
         } else {
            resolve(data);
         }
      });
   });
};
