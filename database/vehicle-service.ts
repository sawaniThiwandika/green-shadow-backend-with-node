import { PrismaClient } from "@prisma/client";
import {Vehicle} from "../model/VehicleModel";
const prisma = new PrismaClient();


export async function addVehicle(vehicle :Vehicle) {

    const addedVehicle = await prisma.vehicle.create({
        data: {

            vehicleId : vehicle.vehicleId,
            type:vehicle.type,
            model:vehicle.model,
            licensePlate:vehicle.licensePlate,
            assignedStaff: {
                connect: vehicle.assignedStaff.map((id) => ({ staffId: id }))
            }
        },
    });
    console.log("Vehicle created:", addedVehicle);
}

export async function getAllVehicles(){
    try{
        return await prisma.vehicle.findMany();
    }catch(err){
        console.log("error getting vehicles from prisma data",err);
    }
}

export async function updateVehicle(code:string,vehicle :Vehicle){
    try{
        await prisma.vehicle.update({
            where:{ vehicleId : code},
            data:{
                licensePlate: vehicle.licensePlate,
                model:vehicle.model,
                type:vehicle.type,
                assignedStaff: {
                    connect: vehicle.assignedStaff.map((id) => ({ staffId: id }))
                }
            }
        })
    }
    catch (err){
        console.log("error: "+err);

    }

}

export async function vehicleDelete(code:string){
    try{
        await prisma.vehicle.delete({
            where: {vehicleId:code},

        });
        console.log('item deleted :',code);
    }
    catch (err){
        console.log("error deleting item ",err)
    }
}
