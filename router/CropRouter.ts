import express from "express";
import { body, validationResult } from "express-validator";
import {addCrop, cropDelete, getAllCrops, updateCrop} from "../database/crop-service";
import {ImageUploader} from "../ImageUploader";
import {generateCropCode} from "../genarate-id/genarateCropCode";


const router = express.Router();

let imageUploader = new ImageUploader("crop");


router.post("/add",
    imageUploader.upload.single("cropImage"),
    [
        body('cropCode').notEmpty().withMessage('Crop code is required'),
        body('commonName').notEmpty().withMessage('Common name is required'),
        body('scientificName').notEmpty().withMessage('Scientific name is required'),
        body('category').notEmpty().withMessage('Category is required'),
        body('season').notEmpty().withMessage('Season is required'),
    ],
    async (req: any, res: any) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { commonName, scientificName, category, season, fieldDetails } = req.body;
            const file = req.file;

            let cropImage = "";
            if (file) {
                cropImage=file.filename;
            }
            const cropCode=await generateCropCode();

            const crop = {
                cropCode,
                commonName,
                scientificName,
                image: cropImage,
                category,
                season,
                fieldDetails: fieldDetails ? JSON.parse(fieldDetails) : [],
            };

            const addedCrop = await addCrop(crop);
            res.status(201).json({ message: "Crop added successfully", data: addedCrop });
        } catch (err) {
            console.error("Error adding crop:", err);
            res.status(500).json({ error: "Error adding crop", details: err });
        }
    }
);


router.get("/getAll", async (req, res) => {
    try {
        const crops = await getAllCrops();
        res.json(crops);
    } catch (err) {
        console.log("Error getting crops:", err);
        res.status(500).json({ error: "Error retrieving crops" });
    }
});


router.delete("/delete/:cropCode", async (req, res) => {
    const code = req.params.cropCode;
    try {
        await cropDelete(code);
        res.status(200).send('Crop deleted successfully');
    } catch (err) {
        console.log("Error deleting crop:", err);
        res.status(500).send('Error deleting crop');
    }
});

router.put("/update/:cropCode",
    imageUploader.upload.single("cropImage"),
    [
        body('cropCode').notEmpty().withMessage('Crop code is required'),
        body('commonName').notEmpty().withMessage('Common name is required'),
        body('scientificName').notEmpty().withMessage('Scientific name is required'),
        body('category').notEmpty().withMessage('Category is required'),
        body('season').notEmpty().withMessage('Season is required'),
    ],
    async (req: any, res: any) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { cropCode, commonName, scientificName, category, season, fieldDetails } = req.body;
            const file = req.file;

            let cropImage = "";
            if (file) {
                cropImage=file.filename;
            }


            const crop = {
                cropCode,
                commonName,
                scientificName,
                image: cropImage,
                category,
                season,
                fieldDetails: fieldDetails ? JSON.parse(fieldDetails) : [],
            };

            const updatedCrop = await updateCrop(cropCode,crop);
            res.status(201).json({ message: "Crop updated successfully", data: updatedCrop });
        } catch (err) {
            console.error("Error adding crop:", err);
            res.status(500).json({ error: "Error updating crop", details: err });
        }

});



export default router;