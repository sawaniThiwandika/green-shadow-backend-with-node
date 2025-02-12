import express from "express";
import {Staff} from "../model/StaffModel";
import {addStaff} from "../database/staff-service";


const router = express.Router();

router.post("/add", async(req, res) => {
    const staff: Staff= req.body;
    try{
        const addedMem = await addStaff(staff);
        res.send('staff Added')
    }catch(err){
        console.log("error adding staff", err);
        res.status(400).send("error adding staff");
    }
})

export default router;