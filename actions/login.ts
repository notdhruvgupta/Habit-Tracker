"use server";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import * as z from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validateValues = LoginSchema.safeParse(values);

    if (!validateValues.success) {
        return {
            error: "Invalid Credentials",
        };
    }

    const { email, password } = validateValues.data;

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid Credentials!" };
                default:
                    return { error: "Something went wrong!" };
            }
        }

        throw error;
    }
};
