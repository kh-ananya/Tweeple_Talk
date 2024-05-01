import User from "../models/usermodel.js";
import  bcrypt  from 'bcryptjs';
import { generateTokenAndSetCookie } from './../lib/utils/generateToken.js';

export const signup = async(req,res)=>{
    try{
      const {fullname,username,email,password} = req.body

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!emailRegex.test(email))
      {
         return res.status(400).json ({
            error: "Invalid email format"
         })
      }
      const existingUser = await User.findOne({username});
      if(existingUser)
      {
         return res.status(400).json({
            error : "Username already exists"
         })
      }

      const existingEmail = await User.findOne({email})
      if(existingEmail)
      {
         return res.status(400).json({
            error : "Email already exists"
         })
      }
      if(password.length < 6)
      {
         return res.status(400).json({
            error: "Password must be of 6 characters"
         })
      }
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password,salt)
   

      const newUser = new User({
        fullname,
        username,
        email,
        password:hashPass,
      })
      
      if(newUser)
      {
         generateTokenAndSetCookie(newUser._id,res) 
         await newUser.save()

         res.status(201).json({
            _id: newUser._id,
            fullname: newUser.fullname,
            username: newUser.username,
            email: newUser.email,
            followers: newUser.followers,
            following: newUser.following,
            profileImg: newUser.profileImg,
            coverImg: newUser.coverImg,
         })
      }
      else{
          res.status(400).json({ error : "Invalid Data"})
      }
    }catch(error)
    {
    console.log("Error in controller" , error.message)

    res.status(500).json({
        error: "Internal Server Error"
    })
    }
}

export const login = async(req,res)=>{
   try{
      const {username,password} = req.body;
      const user = await User.findOne({username})
      const isPassCorrrect = await bcrypt.compare(password, user?.password || "")

      if(!user || !isPassCorrrect)
      {
         return res.status(400).json({
            error: "Invalid email or password"
         })
      }
      generateTokenAndSetCookie(user._id,res);

      res.status(200).json({
         _id: user._id,
         fullname: user.fullname,
         username: user.username,
         email: user.email,
         followers: user.followers,
         following: user.following,
         profileImg: user.profileImg,
         coverImg: user.coverImg,
      })

   }catch(err)
   {
        console.log("Error in login : ", err.message);
        res.status(500).json({
         error : "Internal Server Error"
        })
   }
}

export const logout = async(req,res)=>{
   try{
      res.cookie("jwt","",{maxAge:0})
      res.status(200).json({
         message: "Logout Success"
      })
   }catch(err)
   {
      console.log("Error in login ", err.message);
        res.status(500).json({
         error : "Internal Server Error"   
        })
   }
}

export const getMe = async(req,res) => {
   try{
      const user = await User.findById(req.user._id).select("-password")
      res.status(200).json(user);
   }catch(err)
   {
       console.log("Error in GetMe",err.message)
       return res.status(500).json({
         error: "Server error"
       })
   }

}


