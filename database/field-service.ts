import { PrismaClient } from "@prisma/client";
import {Field} from "../model/FieldModel";
import {Crop} from "../model/CropModel";
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

export async function getAllFields(){
    try{
        let newVar = await prisma.field.findMany();
       // console.log("fetch data of field : "+newVar[0].cropCode);
        return newVar ;
    }catch(err){
        console.log("error getting fields from prisma data",err);
    }
}

export async function fieldDelete(code:string){
    try{
        await prisma.field.delete({
            where: {fieldCode:code},

        });
        console.log('field deleted :',code);
    }
    catch (err){
        console.log("error deleting field ",err)
    }
}

export async function updateField(code:string,field :Field){
    try{
        await prisma.field.update({
            where:{ fieldCode : code},
            data:{
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
        console.log("Field Updated:");

    }
    catch (err){
        console.log("error: "+err);
    }



}
