const mongoose= require('mongoose');
const schema= new mongoose.Schema({
    email : {
        type: String,
        unique : true
    },
    password : String
})
const model = mongoose.model("User", schema);
module.exports = model;