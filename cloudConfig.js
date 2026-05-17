if(process.env.NODE_ENV!="production"){//this condition is for secure your creadential information ,credential information like- secret information
    require('dotenv').config()
}
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
   
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder:'W_LUST__DEV',
   allowerdFormats:["png","jpeg","jpg"],
    },
  });
   module.exports={
    cloudinary,
    storage
   };