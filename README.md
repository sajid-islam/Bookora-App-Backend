# 📚 Bookora Backend

This is the backend server for the **Bookora** mobile app. It manages user authentication and book recommendations using **Node.js**, **Express**, and **MongoDB**.

## 🔥 Features

-   ✅ JWT-based user authentication
-   📌 Add & delete your own book recommendations
-   🌐 View others’ recommendations
-   ☁️ Image upload with Cloudinary

## 🧰 Tech Stack

-   Node.js + Express
-   MongoDB + Mongoose
-   Cloudinary (for image handling)
-   JWT for secure user sessions

## 🚀 Getting Started

```bash
git clone https://github.com/YOUR_USERNAME/bookora-backend.git
cd bookora-backend
```

## 🔑 Environment Variables

Create a `.env` file and add:

```env
API_URL= your_api_user
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
JWT_TOKEN_SECRET=you_jwt_secret
MONGO_URI=your_monogodb_uri

```

```bash
npm install
node src/index.js
```
