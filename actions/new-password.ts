"use server";
import { getPasswordTokenByToken } from "@/data/password-token";
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { PassSchema } from "@/schemas";
import * as z from "zod";

export const ResetPassword = async (
    values: z.infer<typeof PassSchema>,
    token: string
) => {
    if (!token) {
        return {
            error: "Token missing!",
        };
    }

    const validateFields = PassSchema.safeParse(values);
    if (!validateFields.success) {
        return {
            error: "Invalid Fields",
        };
    }

    const existingToken = await getPasswordTokenByToken(token);
    if (!existingToken) {
        return {
            error: "Token doesn't exists!",
        };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) {
        return {
            error: "Token has expired!",
        };
    }

    const existingUser = await getUserByEmail(existingToken.email);
    if (!existingUser) return { error: "No user Exists!" };

    const { password, confirmPassword } = validateFields.data;
    if (password != confirmPassword) {
        return {
            error: "Passwords don't match",
        };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
        where: {
            id: existingUser.id,
        },
        data: {
            password: hashedPassword,
        },
    });

    await db.passwordVerificationToken.delete({
        where: {
            id: existingToken.id,
        },
    });

    return {
        success: "Password reset successfully!"
    }
};
