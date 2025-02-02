import express from 'express'

const cors = require('cors');
//import {CustomerRouter} from "./router/CustomerRouter";

import VehicleRouter from "./router/VehicleRouter";
const port:number=3000;


const app=express();

app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    credentials: true // If you need to send cookies
}));




app.use(express.json())
app.use('/vehicle',VehicleRouter)

app.listen(port,()=>{
    console.log(`Server started at port : ${port}`);
})
app.use("/",(req,res)=>{
    res.status(404).send("Not Found");
})
