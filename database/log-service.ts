import {PrismaClient} from "@prisma/client";

import {Log} from "../model/LogModel";

const prisma = new PrismaClient();


export async function addLog(log: Log) {
    try {
        if (!log.relevantStaff || log.relevantStaff.length === 0) {
            throw new Error("Staff information is required to create a staff log.");
        }

        const addedLog = await prisma.log.create({
            data: {
                logCode: log.logCode,
                logDate: log.logDate,
                logDetails: log.logDetails,
                observedImage: log.observedImage,
                field: {
                    connect: { fieldCode: log.relevantFields }
                },
                crop: {
                    connect: { cropCode: log.relevantCrops}
                },
                staffLogs: {
                    create: log.relevantStaff.map((staffId: string) => ({
                        staff: { connect: { staffId } }
                    }))
                }
            },
        });

        console.log("Log created:", addedLog);
        return addedLog;
    } catch (error) {
        console.error("Error adding log:", error);
        throw new Error("Could not add log: " + error);
    }
}

export async function getAllLogs(){
    try{
        return await prisma.log.findMany();
    }catch(err){
        console.log("error getting logs from prisma data",err);
    }
}
