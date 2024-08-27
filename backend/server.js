import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"

const app = express();
dotenv.config();

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
app.get("/",(req,res)=>{
    res.send("At root");
});

//Listening Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
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