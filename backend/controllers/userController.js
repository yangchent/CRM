const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User= require("../models/usersModel");

const app = express();
app.use(express.json());
// post 
const passwordRegex= /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,25})$/;

const register= async (req,res)=> {
    const {email, password}= req.body;
    const hashedPassword = await bcrypt.hash(password, 12)
    
    const passwordValidated= passwordRegex.test(password);
    if (passwordValidated){
        try {
            await User.create({email: email, password: hashedPassword});

        } catch(err){
            return res.status(404).json({
                message: "this user already exist"
            });
        }
        res.status(201).json({
            message: `User created with email: ${email}`
        })
        } else {
            return res.status(400).json({
                message: "Password should be minimum 6 character and a number"
            })
        }}
//post

const login = async (req,res)=>  {
    
    const { email, password}= req.body;
    const user= await User.findOne({email});
    
    if (!user){
        return res.status(400).json({
            message: "Invalid email or password"
        });
    }
        const isPasswordValid= await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            return res.status(400).json({
                message: "invalid email or password"
            })
        }
    const token= jwt.sign({id: user._id}, process.env.JWT_SECRET)  ;

        res.cookie("jwt", token, { httpOnly: true, secure: false});
        res.json({
            message: "Here is cookies for your request",
        })  
} 
// const loginGet = async (req, res) => {
// 	console.log("Utilisateur qui fait la requête :", req.cookies.jwtData.id);

// 	res.json({
// 		message: "You are authorized",
// 	});
// } 


module.exports= {
    register: register,
    login: login,
  
}