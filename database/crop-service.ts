import { PrismaClient } from "@prisma/client";
import { Crop } from "../model/CropModel";
import {Vehicle} from "../model/VehicleModel";

const prisma = new PrismaClient();

export async function addCrop(crop: Crop) {
    try {
        const addedCrop = await prisma.crop.create({
            data: {
                cropCode: crop.cropCode,
                commonName: crop.commonName,
                scientificName: crop.scientificName,
                image: crop.image,
                category: crop.category,
                season: crop.season,
                fields: {
                    connect: crop.fieldDetails.length > 0 ? crop.fieldDetails.map((code) => ({ fieldCode: code })) : []
                }
            },
        });

        console.log("Crop created:", addedCrop);
        return addedCrop;
    } catch (error) {
        console.error("Error adding crop:", error);
        throw new Error("Could not add crop");
    }
}

export async function getAllCrops(){
    try{
        return await prisma.crop.findMany();
    }catch(err){
        console.log("error getting crops from prisma data",err);
    }
}

export async function cropDelete(code:string){
    try{
        await prisma.crop.delete({
            where: {cropCode:code},

        });
        console.log('crop deleted :',code);
    }
    catch (err){
        console.log("error deleting crop ",err)
    }
}

export async function updateCrop(code:string,crop :Crop){
    try{
        await prisma.crop.update({
            where:{ cropCode : code},
            data:{
                commonName: crop.commonName,
                scientificName: crop.scientificName,
                image: crop.image,
                category: crop.category,
                season: crop.season,
                fields: {
                    connect: crop.fieldDetails.length > 0 ? crop.fieldDetails.map((code) => ({ fieldCode: code })) : []
                }
            }
        })
    }
    catch (err){
        console.log("error: "+err);

    }

}