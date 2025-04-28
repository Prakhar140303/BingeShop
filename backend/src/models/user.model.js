import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique :true
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure the email is unique
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, // Optional regex for validating email format
      },
    password :{
        type : String,
        required : true,
    },
    role :{
        type : String,
        default : "user"
    }
},{
    timestamps : true
});

export default mongoose.model("User",UserSchema);