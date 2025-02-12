import { PrismaClient } from "@prisma/client";
import {Staff} from "../model/StaffModel";
import {Vehicle} from "../model/VehicleModel";

const prisma = new PrismaClient();

export async function addStaff(staff :Staff) {

    const addedMem = await prisma.staff.create({
        data: {

            staffId : staff.staffId,
            firstName:staff.firstName,
            lastName:staff.lastName,
            designation:staff.designation,
            address:staff.address,
            gender: staff.gender,
            contact: staff.contact,
            email:staff.email,
            vehicle: {
                connect:{vehicleId:staff.vehicle}
            },
            field: {
                connect:{ fieldCode: staff.field }
            },
        },
    });
    console.log("Vehicle created:", addedMem);
}

export async function getAllStaff(){
    try{
        return await prisma.staff.findMany();
    }catch(err){
        console.log("error getting staff from prisma data",err);
    }
}

export async function updateStaff(code:string,staff :Staff){
    try{
        await prisma.staff.update({
            where:{ staffId : code},
            data:{
                firstName:staff.firstName,
                lastName:staff.lastName,
                designation:staff.designation,
                address:staff.address,
                gender: staff.gender,
                contact: staff.contact,
                email:staff.email,
                vehicle: {
                    connect:{vehicleId:staff.vehicle}
                },
                field: {
                    connect:{ fieldCode: staff.field }
                },
            }
        })
    }
    catch (err){
        console.log("error: "+err);

    }

}
export async function staffDelete(code:string){
    try{
        await prisma.staff.delete({
            where: {staffId:code},

        });
        console.log(' deleted staff:',code);
    }
    catch (err){
        console.log("error deleting staff ",err)
    }
}