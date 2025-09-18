"use server"
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { db } from "@/lib/db";

export const verifyToken = async (token: string) => {
    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken) {
        return {
            error: "No verification token exists!",
        };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
        return {
            error: "Verification Token Expired!",
        };
    }

    const user = await getUserByEmail(existingToken.email);

    if (!user) return { error: "Email not found!" };

    await db.user.update({
        where: {
            id: user.id
        },
        data: {
            emailVerified: new Date(),
            email: existingToken.email,
        }
    })

    await db.verificationToken.delete({
        where: {
            id: existingToken.id
        }
    })

    return {
        success: "Email Verified!"
    }
};
