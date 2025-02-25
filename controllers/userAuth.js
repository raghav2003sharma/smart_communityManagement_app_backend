import User from "../models/usermodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const signUp = async (req, res)=>{// user sign up

    try{
        const {email,fullname,userRole,password} = req.body;
        if (!email || !fullname || !userRole || !password) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }
        const saltRounds = 10;
        const user = await User.findOne({email })//check if already exists
        if(user){
            return res.status(409).json({message:"user already exists, try logging in !",success:false})
        }
       const hash = await bcrypt.hash(password,saltRounds);     
        const result = await User.create(
            {
                emailId:email,fullName:fullname,userRole:userRole,password:hash
            }
        )
   
    res.status(201).json({message:"signup successful",success:true})

    }catch(err){
        console.log(err);
        res.status(500).json({message:"signup failed,internal server error",success:false})
    }
}

const logIn = async(req,res)=>{//user login authentication
    try{
        const {email,password} = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        const user = await User.findOne({ emailId:email })//check if user exists;
        if(!user){
            return res.status(403).json({message:"user dont exist, signup first !",success:false})
        }
        const result = await bcrypt.compare(password,user.password); //veryfying the password
              if(!result){
                return res.status(403).json({message:"password incorrect",success:false})
              }
       
        const jwtToken =  jwt.sign({
            email:user.emailId, _id:user._id
        },process.env.JWT_SECRET,{expiresIn:'24h'});

        res.status(200).json({
            message:"signin successful",
            success:true,
            jwtToken

        })
    }catch(err){
        console.log(err);
    }
}

export {signUp,logIn}