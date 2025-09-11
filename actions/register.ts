"use server";
import { RegisterSchema } from '@/schemas';
import * as z from 'zod'
import bcrypt from 'bcrypt'
import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validateValues = RegisterSchema.safeParse(values);

    if(!validateValues.success) {
        return {
            error: "Invalid Credentials"
        }
    }

    const {name, email, password} = validateValues.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const foundUser = await getUserByEmail(email);

    if(foundUser) {
        return {
            error: "Email already in use!"
        }
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        }
    })


    return {
        success: "User Created!"
    }
}