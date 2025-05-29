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

userSchema.pre('save', async function (next) {
  
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  if (this.isModified('otp') && this.otp) {
    this.otp = await bcrypt.hash(this.otp, 10);
  }

  next();
});


export const User = mongoose.model('User',userSchema)