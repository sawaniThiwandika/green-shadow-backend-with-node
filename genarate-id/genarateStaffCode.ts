import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function generateStaffCode(): Promise<string> {
    const lastStaff = await prisma.staff.findFirst({
        orderBy: { staffId: 'desc' },
    });

    let nextNumber = 1;
    if (lastStaff && lastStaff.staffId) {
        const lastCode = lastStaff.staffId;
        const parts = lastCode.split('-');

        if (parts.length === 2) {
            const numericPart = parseInt(parts[1].substring(1), 10);
            if (!isNaN(numericPart)) {
                nextNumber = numericPart + 1;
            }
        }
    }

    return `S-${String(nextNumber).padStart(3, '0')}`;
}
