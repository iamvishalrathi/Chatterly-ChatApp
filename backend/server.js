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

app.get("/",(req,res)=>{
    res.send("At root");
});

//Listening Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
});