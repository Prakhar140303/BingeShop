import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    Username : {
        type : String,
        required : true,
        unique :true
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