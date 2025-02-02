import express from "express";
import {Vehicle} from "../model/VehicleModel";
import {
    addVehicle
} from "../database/vehicle-data";


const router = express.Router();

router.post("/add", async(req, res) => {
    const vehicle: Vehicle= req.body;
    try{
        const addedVehicle = await addVehicle(vehicle);
        res.send('vehicle Added')
    }catch(err){
        console.log("error adding vehicle", err);
        res.status(400).send("error adding vehicle");
    }
})

router.delete("/delete/:code", async (req, res) => {
    const code: string  = req.params.code;
    try{
        //await VehicleDelete(code);
        res.send('Vehicle Deleted');
    }catch(err){
        console.log("error deleting Vehicle", err);
    }
})


router.put("/update/:code",async (req, res) => {
    const code:string = req.params.code;
    const vehicle :Vehicle = req.body;

    try{
       // await VehicleUpdate(code, vehicle);
        res.send('Vehicle Updated');
    }catch(err){
        console.log("error updating Vehicle", err);
    }
})

router.get("/getAll", async (req, res) => {
    try{
        //const vehicles=  await getAllVehicles();
       // res.json(vehicles);
    }catch(err){
        console.log("error getting vehicles", err);
    }
})
export default router;
