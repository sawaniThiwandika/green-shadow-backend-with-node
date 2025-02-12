import { PrismaClient } from "@prisma/client";
import {Staff} from "../model/StaffModel";

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