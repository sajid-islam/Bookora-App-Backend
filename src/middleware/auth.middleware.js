import jwt from "jsonwebtoken";
import User from "./../models/User.js";
import "dotenv/config";

const protectRoute = async (req, res, next) => {
    try {
        // get token
        const token = req.header("Authorization").split(" ")[1];
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        // verify token
        const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

        // find User
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res
                .status(401)
                .json({ message: "Invalid or expired token" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Authentication error:", error.message);
        res.status(401).json({ message: "Token is not valid" });
    }
};

export default protectRoute;
