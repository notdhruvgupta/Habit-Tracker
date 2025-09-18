import { db } from "@/lib/db";


export const getPasswordTokenByToken = async (token: string) => {
    try {
        const passResetToken = db.passwordVerificationToken.findUnique({
            where: {token}
        })

        return passResetToken;
    } catch (error) {
        return null;
    }
} 

export const getPasswordTokenByEmail = async (email: string) => {
    try {
        const passResetToken = db.passwordVerificationToken.findFirst({
            where: {email}
        })

        return passResetToken;
    } catch (error) {
        return null;
    }
} 