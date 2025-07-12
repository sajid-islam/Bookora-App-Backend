import express from "express";
import cloudinary from "../lib/cloudinary.js";
import Book from "../models/Book.js";
import protectRoute from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protectRoute, async (req, res) => {
    try {
        const { image, rating, title, caption } = req.body;

        if (!image || !rating || !title || caption) {
            return res
                .status(400)
                .json({ message: "Please provide all the filed" });
        }

        // upload image on cloudinary
        const uploadResponse = await cloudinary.uploader.upload(image);
        const imageUrl = uploadResponse.secure_url;

        // save to the database
        const newBook = new Book({
            image: imageUrl,
            rating,
            title,
            caption,
            user: req.user._id,
        });

        await newBook.save();

        res.status(201).json(newBook);
    } catch (error) {
        console.error("Error on book create route", error);
        res.status(500).json(error.message);
    }
});

export default router;
