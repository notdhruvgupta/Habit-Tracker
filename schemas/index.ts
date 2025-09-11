import * as z from 'zod';

export const LoginSchema = z.object({
    email: z.email(),
    password: z.string().min(6, {
        message: "Password too Short"
    })
})


export const RegisterSchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6, {
        message: "Minimum 6 Characters required"
    })
})