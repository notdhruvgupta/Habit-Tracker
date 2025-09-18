"use server"

import { getUserByEmail } from "@/data/user";
import { sendPassResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/token";
import { ResetSchema } from "@/schemas";
import * as z from 'zod'; 

export const sendReset = async (value: z.infer<typeof ResetSchema>) => {
    const validateFields = ResetSchema.safeParse(value);

    if(!validateFields.success) {
        return {
            error: "Invalid Email!"
        }
    }
    
    const {email} = validateFields.data;

    const existingUser = await getUserByEmail(email);
    
    if(!existingUser) {
        return {
            error: "Email does not exists!"
        }
    }

    const passResetToken = await generatePasswordResetToken(email);

    sendPassResetEmail(
        passResetToken.email,
        passResetToken.token
    )

    return {
        success: "Reset Email sent!"
    }
}