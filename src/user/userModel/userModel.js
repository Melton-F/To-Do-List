import { timeStamp } from 'console'
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    phone:{type:Number},
    password:{type:String},
    otp:{type:Number}
},{timestamps:true})

const User = mongoose.model("User", userSchema)
module.exports = User