import { PrismaClient } from "@prisma/client";
import {Vehicle} from "../model/VehicleModel";
import {Staff} from "../model/StaffModel";
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