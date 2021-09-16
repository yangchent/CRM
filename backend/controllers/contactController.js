const express= require('express');
const Contact= require("../models/contactsModel");

const app = express();
app.use(express.json());

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
    const userId = req.cookies.jwtData.id
    try {
        const contacts = await Contact.find({ userId: userId }).populate('userId');
       
       res.json({
           status: "ok",
           data: contacts
       })
    } catch(error){
        return res.status(404).json({
            message: "bad request"
        })
    }
   };
   //put
   const contactEdit= async (req,res)=>  {
       const {userId, name, email, description, catergory} = req.body
       const _id = req.params.id ;
       try {
           await Contact.findByIdAndUpdate(_id,{userId, name, email, description, catergory})
           
       res.json({
           status: "ok",
           message: "Your info has been modified and updated"
       })
    } catch(error){
        return res.status(404).json({
            message: "Cannot update"
        })
    } 
  };
//Delete a contact
    const contactDelete= async (req,res)=>  {
        const idContact= req.params.id;
      
        try {
            
            await Contact.findByIdAndDelete(idContact);
           res.json({
               status: "ok",
               message: `User deleted ${idContact}`
           })
        } catch(error){
            return res.status(404).json({
                message: "cannot delete"
            })
        }
       };

// Catergory
const catergoryId= async (req,res)=>  {
    const objKey= Object.keys(req.query) [0];
    const objVal= Object.values(req.query)[0];
        try{
        const info= await Contact.find({[objKey]:[objVal]} )
        res.json({
            status: "ok",
            data: info
        })
    } catch(error){
        return res.status(404).json({
            message: "Bad request"
        })
    }}
// logout
// const logout= async (req,res)=>  {
   
//     try{
//         await Contact.clearCookies('jwt')
//         res.json({
//             status: "ok",
//             message: "loggedout"
//         })
//     } catch(error){
//         return res.status(404).json({
//             message: "Bad request"
//         })
//     }};
    module.exports= {
    contactAdd: contactAdd,
    contactGet: contactGet,
    contactEdit: contactEdit,
    contactDelete: contactDelete,
    catergoryId: catergoryId
}