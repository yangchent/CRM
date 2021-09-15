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

//middleware 
app.use(express.json());
app.use(cookieParser());

function protect(req, res, next) {
	try {
		const data = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
		req.cookies.jwtData = data;
		next();
	} catch (err) {
		return res.status(401).json({
			message: "Your token is not valid",
		});
	}
}
// post 
const register= async (req,res)=> {
    const {email, password}= req.body;
    const hashedPassword = await bcrypt.hash(password, 12)
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
    };
//post
const login= async(req,res)=>  {

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
// app.get("/login", protect, async (req, res) => {
// 	console.log("Utilisateur qui fait la requête :", req.cookies.jwtData.id);

// 	res.json({
// 		message: "You are authorized",
// 	});
// });


//post contact
const contactAdd= async (req,res)=>  {
    const {userId, name, email, description, catergory}= req.body;
    try {
        await Contact.create({userId : userId, name: name,email: email,description: description, catergory: catergory});

   } catch(err){
       return res.status(404).json({
           message: "Invalid user"
       });
   }
   res.status(201).json({
       message: 'your contact info registered'
   })
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