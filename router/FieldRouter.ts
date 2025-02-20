import express from "express";
import {addField, fieldDelete, getAllFields, updateField} from "../database/field-service";
import {body, validationResult} from "express-validator";
import {ImageUploader} from "../ImageUploader";
import {generateCropCode} from "../genarate-id/genarateCropCode";
import {generateFieldCode} from "../genarate-id/gearateFieldCode";

const router = express.Router();

let imageUploader = new ImageUploader("field");

router.post("/add",
    imageUploader.upload.single("fieldImage1"),
    [
        body('fieldCode').notEmpty().withMessage('Field code is required'),
        body('fieldName').notEmpty().withMessage('Field name is required'),
    ],
    async (req: any, res: any) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        try {
            const {fieldName, fieldLocation, fieldSize, crop, staff, equipment} = req.body;
            const file = req.file;

            if (!file) {
                return res.status(400).json({error: "No file uploaded"});
            }
            const fieldCode=await generateFieldCode();

            const fieldImage1 = file.filename;

            const field = {
                fieldCode,
                fieldName,
                fieldLocation,
                fieldSize,
                fieldImage1,
                crop,
                staff: staff ? JSON.parse(staff) : [],
                equipment: equipment ? JSON.parse(equipment) : [],
                log: [],
            };

            console.log("Before send to the service: " + field.crop);

            const addedField = await addField(field);
            res.status(201).json({message: "Field added successfully", data: addedField});
        } catch (err) {
            console.error("Error adding field:", err);
            res.status(500).json({error: "Error adding field", details: err});
        }
    }
);

router.get("/getAll", async (req, res) => {
    try {
        const field: any = await getAllFields();
        //console.log("Fields  in router:"+field[0].cropCode);
        res.json(field);
    } catch (err) {
        console.log("Error getting fields:", err);
        res.status(500).json({error: "Error retrieving fields"});
    }
});

router.delete("/delete/:fieldCode", async (req, res) => {
    const code = req.params.fieldCode;
    try {
        await fieldDelete(code);
        res.status(200).send('Field deleted successfully');
    } catch (err) {
        console.log("Error deleting field:", err);
        res.status(500).send('Error deleting field');
    }
});


router.put("/update/:fieldCode",
    imageUploader.upload.single("fieldImage1"), // Middleware to handle file upload
    [
        body('fieldCode').notEmpty().withMessage('Field code is required'),
        body('fieldName').notEmpty().withMessage('Field name is required'),
    ],
    async (req: any, res: any) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const code = req.params.fieldCode;
        try {
            const {fieldCode, fieldName, fieldLocation, fieldSize, crop, staff, equipment} = req.body;
            const file = req.file;

            if (!file) {
                return res.status(400).json({error: "No file uploaded"});
            }

            const fieldImage1 = file.filename;

            const field = {
                fieldCode,
                fieldName,
                fieldLocation,
                fieldSize,
                fieldImage1,
                crop,
                staff: staff ? JSON.parse(staff) : [],
                equipment: equipment ? JSON.parse(equipment) : [],
                log: [],
            };

            console.log("Before send to the service: " + field.crop);

            const updatedField = await updateField(code,field);
            res.status(201).json({message: "Field added successfully", data: updatedField});
        } catch (err) {
            console.error("Error updating field:", err);
            res.status(500).json({error: "Error updating field", details: err});
        }
    }
);


export default router;