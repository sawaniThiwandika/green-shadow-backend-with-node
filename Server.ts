import express from 'express'

//const cors = require('cors');
//import {CustomerRouter} from "./router/CustomerRouter";

const port:number=3000;


const app=express();



app.use(express.json())


app.listen(port,()=>{
    console.log(`Server started at port : ${port}`);
})
app.use("/",(req,res)=>{
    res.status(404).send("Not Found");
})
