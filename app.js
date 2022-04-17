const connectDB = require('./db/connect');
const express = require('express');
const app = express();
const tasks= require('./routes/tasks')
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
require('dotenv').config();

//middleware
app.use(express.json())
app.use(express.static('./public'))
//routes


app.use('/api/v1/tasks',tasks)
app.use(notFound); 
app.use(errorHandlerMiddleware);


const PORT = process.env.PORT ||3000;



const start = async ()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT , console.log(`server is listening on port ${PORT}...`));

    }
    catch(error){
        console.log(error)

    }
} 

start()