const express = require("express");
const dotenv = require("dotenv");
dotenv.config({
    path: "./config.env",
});
const mongoose= require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();

//connect to mongoose
mongoose
	.connect(process.env.DB, {
		useNewUrlParser: true,
	})



	.then(() => {
		console.log("Connected to MongoDB !");
	});

const User= require("../models/usersModel");
const Contact= require("../models/contactsModel");

// post 
const register= async (req,res)=> {
    try {
        const user= await User.create(req.body)
        res.json({
            status : 'ok',
            data : user})
    } catch(err){
        return res.status(404).json({
            message: "error"
        })
    }
};
//post
const login= async (req,res)=>  {
//  try {
//     const user = await users.find(req.body);
//     res.json({
//         status: "ok",
//         message: "you are logged in"
//     })
//  } catch(error){
//      return res.status(404).json({
//          message: "bad request"
//      })
//  }
}
//post contact
const contactAdd= async (req,res)=>  {
    // try {
    //    const user = await contacts.find(req.body);
    //    res.json({
    //        status: "ok",
    //        message: "you are logged in"
    //    })
    // } catch(error){
    //     return res.status(404).json({
    //         message: "bad request"
    //     })
    // }
   }
//get contact
const contactGet= async (req,res)=>  {
    // try {
    //    const user = await contacts.find(req.body);
    //    res.json({
    //        status: "ok",
    //        message: "you are logged in"
    //    })
    // } catch(error){
    //     return res.status(404).json({
    //         message: "bad request"
    //     })
    // }
   };
   //put
   const contactEdit= async (req,res)=>  {
    // try {
    //    const user = await contacts.find(req.body);
    //    res.json({
    //        status: "ok",
    //        message: "you are logged in"
    //    })
    // } catch(error){
    //     return res.status(404).json({
    //         message: "bad request"
    //     })
    // } 
  };
    //Delete a contact
    const contactDelete= async (req,res)=>  {
        // try {
        //    const user = await users.delete(req.body);
        //    res.json({
        //        status: "ok",
        //        message: "you are logged in"
        //    })
        // } catch(error){
        //     return res.status(404).json({
        //         message: "bad request"
        //     })
        // }
       };
module.exports= {
    register: register,
    login: login,
    contactAdd: contactAdd,
    contactGet: contactGet,
    contactEdit: contactEdit,
    contactDelete: contactDelete,
}