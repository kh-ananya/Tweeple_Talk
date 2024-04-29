import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import postRoutes from "./routes/postRoutes.js"
import connectMongoDb  from "./db/connectMongoDb.js"
import cookieParser from "cookie-parser"
import {v2 as cloudinary} from "cloudinary"


dotenv.config();

cloudinary.config({
 cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
 api_key: process.env.CLOUDINARY_API_KEY,
 api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use(cookieParser())

app.use("/api/auth" , authRoutes);
app.use("/api/user",userRoutes)
app.use("/api/post",postRoutes)

app.listen(PORT,()=>{
    console.log(`Server is running on Port : ${PORT}`)
    connectMongoDb()
})