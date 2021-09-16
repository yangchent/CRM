const mongoose= require('mongoose');
const schema= new mongoose.Schema({
    userId: {
        type : mongoose.Types.ObjectId, ref: "User"},
    name :{
        type: String,
        required : true
    },
    email : String,
    description: String,
    catergory: Number
})
const Contact = mongoose.model("Contact", schema);
module.exports = Contact;