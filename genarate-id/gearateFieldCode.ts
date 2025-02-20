import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function generateFieldCode(): Promise<string> {
    const lastField = await prisma.field.findFirst({
        orderBy: { fieldCode: 'desc' },
    });

    let nextNumber = 1;
    if (lastField && lastField.fieldCode) {
        const lastCode = lastField.fieldCode;
        const parts = lastCode.split('-');

        if (parts.length === 2) {
            const numericPart = parseInt(parts[1].substring(1), 10);
            if (!isNaN(numericPart)) {
                nextNumber = numericPart + 1;
            }
        }
    }

    return `F-${String(nextNumber).padStart(3, '0')}`;
}
