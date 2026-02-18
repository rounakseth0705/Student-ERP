import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

export const uploadToCloudinary = (buffer,uploadType,role) => {
    return new Promise((resolve,reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: `${uploadType}/${role}`, resourse_type: "raw" },
            (error,result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result);
            }
        );
        streamifier.createReadStream(buffer).pipe(uploadStream);
    });
}

export const deleteFromCloudinary = async (publicId) => {
    await cloudinary.uploader.destroy(publicId);
}

export const cloudinaryDownloadUrl = (publicId) => {
    console.log(publicId);
    cloudinary.url(publicId, {
        resource_type: "raw",
        flags: "attachment"
    });
}