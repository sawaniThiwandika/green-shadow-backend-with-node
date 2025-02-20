import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function generateCropCode(): Promise<string> {
    const lastCrop = await prisma.crop.findFirst({
        orderBy: { cropCode: 'desc' },
    });

    let nextNumber = 1;
    if (lastCrop && lastCrop.cropCode) {
        const lastCode = lastCrop.cropCode;
        const parts = lastCode.split('-');

        if (parts.length === 2) {
            const numericPart = parseInt(parts[1].substring(1), 10);
            if (!isNaN(numericPart)) {
                nextNumber = numericPart + 1;
            }
        }
    }

    return `C-${String(nextNumber).padStart(3, '0')}`;
}
