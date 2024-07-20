import express from 'express';

const app = express();

app.listen(3000, () =>{
    console.log('server is running on port 3000! nodemon is working');
    //when there is a change here we always need to run again(node api/index.js)
    //instead we can use nodemon
});