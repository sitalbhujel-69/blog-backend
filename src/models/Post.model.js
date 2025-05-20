import mongoose ,{Schema} from 'mongoose';

const postSchema  = new Schema({
  title:{
    type:String,
    required:true,
    trim:true
  },
  content:{
    type:String,
    required:true,
    trim:true
  },
  Photo:{
    type:String
  },
  owner:{
    type:Schema.Types.ObjectId,
    ref:"User"
  }
},{timestamps:true})

export const Post = mongoose.model('Post',postSchema);