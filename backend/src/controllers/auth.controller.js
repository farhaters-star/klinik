import User from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import { generateToken } from "../lib/utils.js"
import cloudinary from "../lib/cloudinary.js"

export const signup =async(req,res)=>{
    const {fullName,email,password,userType} = req.body
    try{
        if(!fullName || !email || !password){
            return res.status(400).json({message:"masukkan semua fieldnya"})
        }
        if(password.length < 6){
            return res.status(400).json({message:"minimal memasukkan password 6 karakter"})
        }
        const user = await User.findOne({email})
        if(user) return res.status(400).json({message:"email already exists"})

            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password,salt)

            const newUser = new User({
                fullName,
                email,
                password:hashedPassword,
                userType: userType || "Admin",
            })

            if(newUser){
                //generate jwt token here
                generateToken(newUser._id,res)
                await newUser.save()

                res.status(201).json({
                    _id:newUser._id,
                    fullName:newUser.fullName,
                    email: newUser.email,
                    profilePic:newUser.profilePic,
                    userType:newUser.userType
                })

            }else{
                res.status(400).json({message:"invalid user data"})
            }

    }catch(error){
        console.log("error in signup controller", error.message)
        res.status(500).json({message:"internal server error"})
    }
    
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({message:"email tidak ditemukan!!"})
        }

        const isPasswordCorrect = await bcrypt.compare(password,user.password)
        if(!isPasswordCorrect){
            return res.status(400).json({message:"password salah!!"})
        }
        generateToken(user._id,res)

        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic,
            userType:user.userType
        })
    } catch (error) {
        console.log("error in login controller", error.message)
        res.status(500).json({message:"internal server error"})
    }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "none",
      secure: process.env.NODE_ENV !== "production",
    });
    res.status(200).json({ message: "logged out successfully" });
  } catch (error) {
    console.log("error in logout controller", error.message);
    res.status(500).json({ message: "internal server error" });
  }
};

export const updateProfile = async(req,res) =>{
    res.setHeader("Access-Control-Allow-Credentials", "true");
    try {
        const {profilePic} = req.body
        const userId = req.user._id

        if(!profilePic){
            return res.status(400).json({message:"profile pic is required"})
        }
        const uploadResponse = await cloudinary.uploader.upload(profilePic)
        const updateUser = await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true})

        res.status(200).json(updateUser)
    } catch (error) {
        console.log("error in update profile",error)
        res.status(500).json({message:"internal server error"})
    }
}


export const checkAuth = (req,res) =>{
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("error in auth profile",error.message)
        res.status(500).json({message:"internal server error"})
    }
}