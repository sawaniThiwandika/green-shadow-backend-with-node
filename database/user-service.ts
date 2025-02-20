import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { User } from "../model/UserModel";

const prisma = new PrismaClient();

export async function createUser(user: User) {
    try {

        console.log("password to hashed: "+user.password);
        const hashedPassword = await bcrypt.hash(user.password, 10);

        const addedUser = await prisma.user.create({
            data: {
                username: user.userName,
                password: hashedPassword,
                role: user.role ?? "user",
            },
        });

        console.log("User created:", addedUser);
        return { success: true, message: "User created successfully", user: addedUser };
    } catch (error) {
        console.error("Error creating user:", error);
        return { success: false, message: "Failed to create user", error };
    }
}

export async function verifyUserCredentials(verifyUser: User) {
    const user = await prisma.user.findUnique({
        where: { username: verifyUser.userName },
    });
    if (!user) {
        return false;
    }
    return await bcrypt.compare(verifyUser.password, user.password);
}