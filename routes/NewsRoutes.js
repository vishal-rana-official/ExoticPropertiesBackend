import express from 'express';
import News from '../schema/NewsSchema.js'
import cloudinary from '../cloudinary.js';

const router = express.Router()

router.post("/addNews", async (req, res) => {

    const { title, description, image } = req.body;
    try {
        const result = await cloudinary.uploader.upload(image, {
            folder: "ExoticPropertiesNewsImages"
        });
        const post = await News.create({ title, description, image: result.secure_url })

        res.status(200).json({ message: "News Post added successfully", post });
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
})

router.get("/getAllNews", async (req, res) => {

    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    try {
        const response = await News.find().sort({ createdAt: -1 }).skip(skip).limit(limit)
        const totalCount = response.length; // Get the total count of posts
        const totalNewsCount = await News.countDocuments();

        res.status(200).json({ message: "News fetched successfully", totalCount, response, totalNewsCount });

    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
})


router.get("/getSingleNews", async (req, res) => {

    const id = req.query.id
    try {
        const response = await News.findById(id)

        res.status(200).json({ message: "Single News fetched successfully", response });

    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
})

export default router 