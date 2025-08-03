import express from "express";
import User from "./../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_TOKEN_SECRET, { expiresIn: "15d" });
};

router.post("/register", async (req, res) => {
    try {
        const { email, username, password } = req.body;

        if (!email || !username || !password) {
            return res.status(400).json({ message: "All field are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password should be at least 6 characters long",
            });
        }

        if (username.length < 3) {
            return res.status(400).json({
                message: "Username should be at least 3 characters long",
            });
        }

        //check user already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail)
            return res.status(400).json({ message: "Email already exits" });

        const existingUsername = await User.findOne({ username });
        if (existingUsername)
            return res.status(400).json({ message: "Username already exits" });

        // get random avatar
        const profileImg = `https://api.dicebear.com/9.x/fun-emoji/svg?seed${username}`;

        const user = new User({
            email,
            username,
            password,
            profileImg,
        });

        await user.save();

        const token = generateToken(user._id);

        res.status(201).json({
            token,
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
                profileImg: user.profileImg,
                createdAt: user.createdAt,
            },
        });
    } catch (error) {
        console.error("Error in register route", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res.status(400).json({ message: "All field are required" });

        // check if user not exits
        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ message: "Invalid credential" });

        // check if password is correct
        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect)
            return res.status(400).json({ message: "Invalid credential" });

        const token = generateToken(user._id);

        res.status(200).json({
            token,
            user: {
                username: user._id,
                username: user.username,
                email: user.email,
                profileImg: user.profileImg,
                createdAt: user.createdAt,
            },
        });
    } catch (error) {
        console.error("Error in login route", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
