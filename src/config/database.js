import mongoose from "mongoose";

const connectionToDB = async ()=>{
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database connection is successful : ${connection.connection.host}`)
  } catch (error) {
    console.error(`database connection failed: ${error.message}`)
    process.exit(1)
  }
}

export {connectionToDB};