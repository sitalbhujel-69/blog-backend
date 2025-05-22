import mongoose,{mongo, Schema} from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
  email:{
    type:String,
    required:true,
    unique:true,
  },
  username:{
    type:String,
    required:true,
    unique:true,
    trim:true
  },
  password:{
    type:String,
    required:true,
    trim:true
  },
  isVerified:{
    type:Boolean,
    default:false,
  },
  otp:{
    type:String,  
  },
  otpExpiry:{
    type:Date
  }
})

userSchema.pre('save',async function(next){
  if(!this.isModified('password')) return next();
  if(!this.isModified('otp') || !this.otp) next();

  const hashedPassword = await bcrypt.hash(this.password,10);

  const hashedOTP = await bcrypt.hash(this.otp,10)
  this.password = hashedPassword;
  this.otp = hashedOTP
  next()
})

export const User = mongoose.model('User',userSchema)