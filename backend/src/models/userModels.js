// This file defines the user or admin data model using Mongoose.
// It includes fields for email, password, and role, with validation rules and timestamps for creation and updates.
// This model is used to structure the data stored in the MongoDB database for user or admin authentication.
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