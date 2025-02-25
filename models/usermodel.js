import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    fullName:{
        type:String,
        required:true,
    },
    emailId:{
        type:String,
        required:true,
        unique: true,
        trim : true,
        lowercase : true,
        minLength :[6,"minimum length should be atleast 6"],
        maxLength :[50, "max length should not exceed more than 50 characters"]
    },
    
    userRole:{
        type:String,
        required:true,
        enum:['Admin','Resident','Maintainance'],
    },
    password:{
        type:String,
        required:true,
        minLength:[6,"minimum length should be 6"]
    }
},{
    timestamps:true

})


const User = mongoose.model('user',userSchema);

export default User;