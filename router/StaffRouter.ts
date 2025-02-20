import express from "express";
import {Staff} from "../model/StaffModel";
import {addStaff, getAllStaff, staffDelete, updateStaff} from "../database/staff-service";
import {generateCropCode} from "../genarate-id/genarateCropCode";
import {generateStaffCode} from "../genarate-id/genarateStaffCode";


const router = express.Router();

router.post("/add", async(req, res) => {
    const staff: Staff= req.body;
    try{
        staff.staffId=await generateStaffCode();
        const addedMem = await addStaff(staff);
        res.send('staff Added');
    }catch(err){
        console.log("error adding staff", err);
        res.status(400).send("error adding staff");
    }
});

router.get("/getAll", async (req, res) => {
    try{
        const staffList=  await getAllStaff();
        res.json(staffList);
    }catch(err){
        console.log("error getting staff list", err);
    }
});

router.put("/update/:staffId",async (req, res) => {
    const code:string = req.params.staffId;
    const staff :Staff = req.body;

    try{
        await updateStaff(code, staff);
        res.send('Staff Updated');
    }catch(err){
        console.log("error updating Staff", err);
    }
});

router.delete("/delete/:staffId", async (req, res) => {
    const code: string  = req.params.staffId;
    try{
        await staffDelete(code);
        res.send('staff Deleted');
    }catch(err){
        console.log("error deleting staff", err);
    }
});


export default router;