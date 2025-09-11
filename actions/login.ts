"use server";
import { LoginSchema } from '@/schemas';
import * as z from 'zod'

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validateValues = LoginSchema.safeParse(values);

    if(!validateValues) {
        return {
            error: "Invalid Credentials"
        }
    }

    return {
        success: "Email Sent!"
    }
}