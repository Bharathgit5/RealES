import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user_route.js';
import authRouter from './routes/auth_route.js'
dotenv.config();
mongoose.connect(process.env.MONGO).then(() =>{
    console.log('Connected to Mongodb');
}).catch((err) =>{
    console.log(err);
})


const app = express();

app.listen(3000, () =>{
    console.log('server is running  on port 3000!! nodemon is working');
    //when there is a change here we always need to run again(node api/index.js)
    //instead we can use nodemon
});

app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)