import { getVerificationTokenByEmail } from "@/data/verification-token";
import { v4 as uuidv4 } from "uuid";
import { db } from "./db";
import { getPasswordTokenByEmail } from "@/data/password-token";

export const generateVerificationToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 500);

    const existingToken = await getVerificationTokenByEmail(email);

    if (existingToken) {
        await db.verificationToken.delete({
            where: {
                id: existingToken.id,
            },
        });
    }

    const verificationToken = db.verificationToken.create({
        data: {
            email,
            token,
            expires,
        },
    });

    return verificationToken;
};


export const generatePasswordResetToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 500);

    const existingToken = await getPasswordTokenByEmail(email);

    if (existingToken) {
        await db.passwordVerificationToken.delete({
            where: {
                id: existingToken.id,
            },
        });
    }

    const verificationToken = db.passwordVerificationToken.create({
        data: {
            email,
            token,
            expires,
        },
    });

    return verificationToken;
};
