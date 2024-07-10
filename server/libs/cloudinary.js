import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dlzgpc6cg",
  api_key: "822281161666117",
  api_secret: "4ODHFCNprzxWNO6agU9RNCT_Aig",
});

export const uploadImage = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: "posts",
  });
};

export const deleteImage = async (id) => {
  return await cloudinary.uploader.destroy(id);
};
