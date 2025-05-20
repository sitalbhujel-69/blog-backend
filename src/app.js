import express from 'express';
import userRouter from './routes/User.route.js'
import postRouter from './routes/Post.route.js'
import cookieParser from 'cookie-parser';

const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser())
app.use("/uploads",express.static('./uploads'))

app.use('/api/users',userRouter)
app.use('/api/posts/',postRouter)
export {app} 