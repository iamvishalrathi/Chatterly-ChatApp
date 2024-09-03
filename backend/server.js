import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import { server, app } from "./socket/socket.js"
import path from 'path'
import { fileURLToPath } from 'url'

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/dist')));

//Connect Mongo
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to MongoDB")
    })
    .catch((err) => {
        console.log(err)
    })

app.use(express.json());
app.use(cookieParser());

// import routes
import authRoutes from "./routes/auth.routes.js"
import messageRoute from "./routes/message.routes.js"
import userRoute from "./routes/user.routes.js"

//routes
app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoute)
app.use("/api/users", userRoute)

//root
// Serve the React app for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

//Listening Port
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}`);
});

//Error Handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})