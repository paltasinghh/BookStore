import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    middleName: {      
      type: String,
      trim: true,
    },
    age: {
      type: Number,    
    },
    phoneNumber:{
      type: Number,
      trim: true,
    },
    // category: {         
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Book",
    // },
    photo: {
      type: String,   
      trim: true,
    },
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
