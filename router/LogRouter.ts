import express from "express";
import {ImageUploader} from "../ImageUploader";
import {body, validationResult} from "express-validator";
import {addLog, getAllLogs} from "../database/log-service";
import {generateLogCode} from "../genarate-id/genarateLogCode";

const router = express.Router();

let imageUploader = new ImageUploader("log");

router.post("/add",
    imageUploader.upload.single("observedImage"),
    [
        body('logDetails').notEmpty().withMessage('Log Details is required'),
        body('logDate').notEmpty().withMessage('Log Date required'),
    ],
    async (req: any, res: any) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        try {
            const {logDate, logDetails, relevantCrops, relevantFields, relevantStaff} = req.body;
            const file = req.file;

            if (!file) {
                return res.status(400).json({error: "No file uploaded"});
            }

            const observedImage = file.filename;
            const logCode = await generateLogCode();

            const log = {
                logCode,
                logDate,
                logDetails,
                observedImage,
                relevantFields,
                relevantCrops,
                relevantStaff: relevantStaff ? JSON.parse(relevantStaff) : [],

            };

            console.log("Before send to the service: " + log.relevantStaff[0]);

            const addedLog = await addLog(log);
            res.status(201).json({message: "Log added successfully", data: addedLog});

        } catch (err) {
            console.error("Error adding log:", err);
            res.status(500).json({error: "Error adding log", details: err});

        }
    }
);

router.get("/getAll", async (req, res) => {
    try {
        const logs: any = await getAllLogs();
        //console.log("Fields  in router:"+field[0].cropCode);
        res.json(logs);
    } catch (err) {
        console.log("Error getting logs:", err);
        res.status(500).json({error: "Error retrievinglogs"});
    }
});


export default router;