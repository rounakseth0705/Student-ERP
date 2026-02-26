import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

export const uploadToCloudinary = (buffer,uploadType,role) => {
    return new Promise((resolve,reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: `${uploadType}/${role}`, resource_type: "raw" },
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
    return await cloudinary.uploader.destroy(publicId, { resource_type: "raw" });
}

export const cloudinaryDownloadUrl = (publicId) => {
    return cloudinary.url(publicId, {
        resource_type: "raw",
        flags: "attachment"
    });
}