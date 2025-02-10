import express from "express";
import { addField } from "../database/field-service";
import multer from "multer";
import path from "path";
import fs from "fs"; // Import fs to read files
import { body, validationResult } from "express-validator";
import {ImageUploader} from "../ImageUploader";

const router = express.Router();

let imageUploader = new ImageUploader("field");

router.post("/add",
    imageUploader.upload.single("fieldImage1"), // Middleware to handle file upload
    [
        body('fieldCode').notEmpty().withMessage('Field code is required'),
        body('fieldName').notEmpty().withMessage('Field name is required'),
    ],
    async (req:any, res:any) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { fieldCode, fieldName, fieldLocation, fieldSize, crop, staff, equipment } = req.body;
            const file = req.file;

            if (!file) {
                return res.status(400).json({ error: "No file uploaded" });
            }

            const fieldImage1=file.filename;

            const field = {
                fieldCode,
                fieldName,
                fieldLocation,
                fieldSize,
                fieldImage1,
                crop,
                staff: staff ? JSON.parse(staff) : [],
                equipment: equipment ? JSON.parse(equipment) : [],
                log : [],
            };

            console.log("Before send to the service: "+field.crop);

            // Add the field to the database
            const addedField = await addField(field);
           res.status(201).json({ message: "Field added successfully", data: addedField });
        } catch (err) {
            console.error("Error adding field:", err);
            res.status(500).json({ error: "Error adding field", details: err});
        }
    }
);

export default router;