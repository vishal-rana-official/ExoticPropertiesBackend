import express from 'express';
import Contact from '../schema/ContactSechema.js';
import ContactUs from '../schema/ContactUsSchema.js';

const router = express.Router()

router.post("/ContactProperty", async (req, res) => {

    const { name, email, number, PropertyId } = req.body;


    try {

        const post = await Contact.create({ name, email, number, PropertyId })

        res.status(200).json({ message: "Single Property Contact form added successfully", post });

    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
})

router.post("/ContactUs", async (req, res) => {

    const { name, email, mobile, message } = req.body;


    try {

        const post = await ContactUs.create({ name, email, mobile, message })

        res.status(200).json({ message: "Contact form added successfully", post });

    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
})

export default router 