import express from 'express'
const cors = require('cors');
import VehicleRouter from "./router/VehicleRouter";
import FieldRouter from "./router/FieldRouter";
import CropRouter from "./router/CropRouter";
import path from "path";
import StaffRouter from "./router/StaffRouter";
import LogRouter from "./router/LogRouter";
import authRoutes, {authenticateToken} from "./router/AuthRoutes";

const port:number=3000;
const app=express();

app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    credentials: true // If you need to send cookies
}));

app.use(express.json());

console.log("Loaded SECRET_KEY:", process.env.SECRET_KEY);

app.use('/auth', authRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(authenticateToken);

app.use('/vehicle',VehicleRouter)
app.use('/field',FieldRouter)
app.use('/crop',CropRouter)
app.use('/staff',StaffRouter)
app.use('/log',LogRouter)


app.listen(port,()=>{
    console.log(`Server started at port : ${port}`);
})
app.use("/",(req,res)=>{
    res.status(404).send("Not Found");
})
