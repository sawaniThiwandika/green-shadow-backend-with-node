import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function generateVehicleCode(): Promise<string> {
    const lastVehicle = await prisma.vehicle.findFirst({
        orderBy: { vehicleId: 'desc' },
    });

    let nextNumber = 1;
    if (lastVehicle && lastVehicle.vehicleId) {
        const lastCode = lastVehicle.vehicleId;
        const parts = lastCode.split('-');

        if (parts.length === 2) {
            const numericPart = parseInt(parts[1].substring(1), 10);
            if (!isNaN(numericPart)) {
                nextNumber = numericPart + 1;
            }
        }
    }

    return `V-${String(nextNumber).padStart(3, '0')}`;
}
