import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user_route.js';
import authRouter from './routes/auth_route.js';
import cookieParser from 'cookie-parser';
import listingRouter from './routes/listing_route.js'
import path from 'path';


dotenv.config();
mongoose.connect(process.env.MONGO).then(() =>{
    console.log('Connected to Mongodb');
}).catch((err) =>{
    console.log(err);
})
const __dirname = path.resolve();

const app = express();
app.use(express.json());

app.use(cookieParser());

app.listen(3000, () =>{
    console.log('server is running  on port 3000!! nodemon is working');
    //when there is a change here we always need to run again(node api/index.js)
    //instead we can use nodemon
});

app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)
app.use("/api/listing", listingRouter)

app.use(express.static(path.join(__dirname, '/client/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/dist/index.html'));
})
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message =err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    });
});