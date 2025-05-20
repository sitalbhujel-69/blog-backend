import dotenv from 'dotenv';
dotenv.config();

import { app } from './app.js';
import { connectionToDB } from './config/database.js';

const port  = process.env.PORT || 8080;

connectionToDB()
.then(()=>{
  app.listen(port,()=>{
    console.log(`server started successfully at port: ${port}`);
  })
})