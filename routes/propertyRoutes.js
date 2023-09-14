import express from 'express';
import Property from '../schema/PropertySchema.js'
import cloudinary from '../cloudinary.js';

const router = express.Router()

router.post("/addPost", async (req, res) => {

    const { name, address, price, size, status, floor, Furnished, Facing, Transaction, bed, baths, balcony, parking, reasons, landmark, ageOfConstruction, image, location } = req.body;


    try {
        const uploadedImages = [];

        // Uploading each image to Cloudinary and collecting their URLs
        for (const img of image) {
            const result = await cloudinary.uploader.upload(img, {
                folder: "ExoticPropertiesImages"
            });
            uploadedImages.push(result.secure_url);
        }

        const post = await Property.create({ name, address, price, size, imageThumbnail: uploadedImages, status, floor, Furnished, Facing, Transaction, bed, baths, balcony, parking, reasons, landmark, location, ageOfConstruction })

        res.status(200).json({ message: "Post added successfully", post });

    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
})

router.get("/getAllPosts", async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const location = req.query.location || 'all'; // Get the location query parameter

    try {
        const filter = location === 'all' ? {} : { location };
        const skip = (page - 1) * limit;
        const response = await Property.find(filter).sort({ _id: -1 }).skip(skip).limit(limit)
        const totalCount = await Property.countDocuments(filter);

        res.status(200).json({ message: "Post fetched successfully", totalCount, response });

    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
})

router.get("/getSingleProperty", async (req, res) => {

    const id = req.query.id
    try {
        const response = await Property.findById(id)

        res.status(200).json({ message: "Single Post fetched successfully", response });

    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
})

export default router 