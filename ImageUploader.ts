import multer, { Multer } from "multer";
import path from "path";

export class ImageUploader {
    public upload: Multer;

    constructor(private type: string) {
        this.upload = multer({
            storage: multer.diskStorage({
                destination: `uploads/${type}/`,
                filename: (req, file, cb) => {
                    cb(null, `${Date.now()}${path.extname(file.originalname)}`); // Unique filename
                },
            }),
        });
    }
}
