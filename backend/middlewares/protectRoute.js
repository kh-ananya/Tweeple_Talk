import User from "../models/usermodel.js";
import jwt from "jsonwebtoken";

export const protectRoute = async (req,res,next) => {
   try{
     
    const token = req.cookies.jwt

    if(!token)
    {
        return res.status(401).json({
            error: "You need to login/ No token Provided"
        })
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET)

    if(!decoded)
    {
        res.status(401).json({
            error : "Unauthorized: Invalid Token"
        })
    }

    const user = await User.findById(decoded.userId).select("-password")

    if(!user)
    {
        return res.status(404).json({
            error: "User not found"
        })
    }
    req.user = user;
    next()
   }
   catch(err)
   {
      console.log("Error in ProtectedRoute", err.message)
      return res.status(500).json({
        error : "Internal Error"
      })
   }
}