import express from "express";
import cloudinary from "../lib/cloudinary.js";
import Book from "../models/Book.js";
import protectRoute from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protectRoute, async (req, res) => {
    try {
        const { image, rating, title, caption } = req.body;

        if (!image || !rating || !title || !caption) {
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
        res.status(500).json({ message: error.message });
    }
});

// get all books
router.get("/", protectRoute, async (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 5;
        const skip = (page - 1) * limit;

        const books = await Book.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate("user", "username profileImg");

        const totalBooks = await Book.countDocuments();
        res.send({
            books,
            currentPage: page,
            totalBooks,
            totalPages: Math.ceil(totalBooks / limit),
        });
    } catch (error) {
        console.error("Error on get all books route", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// get book of the current user
router.get("/user", protectRoute, async (req, res) => {
    try {
        const books = await Book.find({ user: req.user._id }).sort({
            createdAt: -1,
        });
        res.json(books);
    } catch (error) {
        console.error("Error get user books route", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.delete("/:id", protectRoute, async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const book = await Book.findById(id);

        if (!book) return res.status(404).json({ message: "Book not found" });

        // check the user is creator of this book
        if (book.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // delete book image from cloudinary
        if (book.image.includes("cloudinary")) {
            const publicId = book.image.split("/").pop().split(".")[0];
            try {
                await cloudinary.uploader.destroy(publicId);
            } catch (error) {
                console.error("Error deleting book image", error);
            }
        }

        await book.deleteOne();
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        console.error("Error on book delete route", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
