import mongoose ,{Schema} from 'mongoose';

const notificationSchema = new Schema({
  type:{
    type:String,
    enum:['like','comment'],
    required:true
  },
  sender:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  receiver:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  post:{
    type:Schema.Types.ObjectId,
    ref:"Post",
    required:true
  },
  seen:{
    type:Boolean,
    default:false
  }
},{timestamps:true})

export const Notification = mongoose.model('Notification',notificationSchema)