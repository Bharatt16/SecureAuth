import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true , 
        required : [true , 'name is required'],
        minLength : 2 , 
        maxLength : 50 
    },
    email : {
                type : String,
        trim : true , 
        required : [true , 'email is required'],
        unique : true ,
        minLength : 2 , 
        maxLength : 50 
    } , 
    password : {
             type : String,
        trim : true , 
        required : [true , 'password is required'],
        select : false ,
        minLength : 8
    },
    role : {
        type : String,
        enum : ['user' , 'moderator' , 'admin'],
        required : [true , 'role is required']
    },
    isVerified: {
  type: Boolean,
  default: false,
},
        verificationToken: { type: String, select: false }, //Used for email verification
    refreshToken: { type: String, select: false }, //Stored for session management
    resetPasswordToken: { type: String, select: false },
    resetPasswordExpires: { type: Date, select: false },
} , {timestamps : true})


//Hashing of password
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function(candidatePassword){
    return bcrypt.compare(candidatePassword , this.password)
}


export default mongoose.model("User" , userSchema)


