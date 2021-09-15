const mongoose= require('mongoose');
const schema= new mongoose.Schema({
    name :{
        type: String,
        required : true
    },
    email : String,
    description: String,
    category: Number

})
const Contact = mongoose.model("Contact", schema);

module.exports = Contact;