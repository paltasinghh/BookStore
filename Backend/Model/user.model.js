import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required :true, //Corrected Type
    },
    email:{
        type:String,
        required: true, // Corrected Type
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'], // Added email format
    },
    password :{
        type:String,
        required:true,
    },
    },{
        timestamps:true // Add timestamps
});
const User = mongoose.model("User",userSchema); // Capitalized model name
export default User;