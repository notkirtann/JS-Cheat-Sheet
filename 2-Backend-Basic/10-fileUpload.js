import express from 'express'
const app = express()


import multer from 'multer'
const upload = multer({
    dest : 'images'
})
app.post('/upload',upload.single('upload'),(req,res)=>{
    res.send()
})

app.listen(3000)


// ------- complex / production way

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

import fs from "fs";

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        
        // Upload the file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });

        // File has been uploaded successfully
        console.log("File is uploaded on Cloudinary", response.url);
        
        // Remove the locally saved temporary file
        fs.unlinkSync(localFilePath);
        return response;

    } catch (error) {
        // Remove the locally saved temporary file as the upload operation failed
        fs.unlinkSync(localFilePath);
        return null;
    }
};

import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp"); // Local destination
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // Keep original filename for simplicity
    }
});
  
export const uploadd = multer({ storage });


//@Re-attempt Logic: By saving the file locally first, if the Cloudinary upload fails due to network issues, we have the file on our disk to attempt a retry before giving up.

