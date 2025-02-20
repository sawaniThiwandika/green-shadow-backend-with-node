import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function generateLogCode(): Promise<string> {
    const lastLog = await prisma.log.findFirst({
        orderBy: { logCode: 'desc' },
    });

    let nextNumber = 1;
    if (lastLog && lastLog.logCode) {
        const lastCode = lastLog.logCode;
        const parts = lastCode.split('-');

        if (parts.length === 2) {
            const numericPart = parseInt(parts[1].substring(1), 10);
            if (!isNaN(numericPart)) {
                nextNumber = numericPart + 1;
            }
        }
    }

    return `L-${String(nextNumber).padStart(3, '0')}`;
}
