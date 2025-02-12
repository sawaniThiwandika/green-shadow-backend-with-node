import express from 'express'
const cors = require('cors');
import VehicleRouter from "./router/VehicleRouter";
import FieldRouter from "./router/FieldRouter";
import CropRouter from "./router/CropRouter";
import path from "path";
import StaffRouter from "./router/StaffRouter";

const port:number=3000;
const app=express();

app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    credentials: true // If you need to send cookies
}));

app.use(express.json())

app.use('/vehicle',VehicleRouter)
app.use('/field',FieldRouter)
app.use('/crop',CropRouter)
app.use('/staff',StaffRouter)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(port,()=>{
    console.log(`Server started at port : ${port}`);
})
app.use("/",(req,res)=>{
    res.status(404).send("Not Found");
})
