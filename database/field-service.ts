import { PrismaClient } from "@prisma/client";
import {Field} from "../model/FieldModel";
const prisma = new PrismaClient();


export async function addField(field :Field) {
    const existingCrop = await prisma.crop.findUnique({
        where: { cropCode: field.crop },
    });

    if (!existingCrop) {
        throw new Error(`Crop with cropCode '${field.crop}' not found.`);
    }

    const addedField = await prisma.field.create({

        data: {

            fieldCode : field.fieldCode,
            fieldName:field.fieldName,
            fieldLocation:field.fieldLocation,
            fieldSize:field.fieldSize,
            fieldImage1:field.fieldImage1,
            crop: {
                connect:  { cropCode: field.crop }
            },
            staff: {
                connect: field.staff?.map((id) => ({ staffId: id })) || [],
            },
            equipments: {
                connect: field.equipment?.map((id) => ({ equipmentId: id })) || [],
            },
            logs: {
                connect: field.log?.map((id) => ({ logCode: id })) || [],
            },

        },
    });
    console.log("Field created:", addedField);
    return addedField;
}