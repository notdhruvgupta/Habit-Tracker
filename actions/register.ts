"use server";
import { RegisterSchema } from '@/schemas';
import * as z from 'zod'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validateValues = RegisterSchema.safeParse(values);

    if(!validateValues) {
        return {
            error: "Invalid Credentials"
        }
    }

    return {
        success: "Email Sent!"
    }
}