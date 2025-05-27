const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        minLength:6,
    },
    role:{
        type:String,
        enum:["admin"],
        default:"admin"
    },
},{timestamps:true})

module.exports = mongoose.model("User",UserSchema)