import express from 'express';
import userRouter from './routes/User.route.js'
import cookieParser from 'cookie-parser';

const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser())

app.use('/api/users',userRouter)

export {app} 