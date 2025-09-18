import { Subtitles } from "lucide-react";
import * as z from "zod";

export const PassSchema = z
    .object({
        password: z.string().min(6, {
            message: "Password too Short",
        }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export const ResetSchema = z.object({
    email: z.email(),
});

export const LoginSchema = z.object({
    email: z.email(),
    password: z.string().min(6, {
        message: "Password too Short",
    }),
});

export const RegisterSchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6, {
        message: "Minimum 6 Characters required",
    }),
});

export const HabitSchema = z.object({
    title: z
        .string()
        .min(2, { message: "Title must be at least 2 characters long" })
        .max(50, { message: "Title too long" }),
    subtitle: z
        .string()
        .max(100, { message: "Subtitle too long" })
        .optional()
        .or(z.literal("")),
    icon: z.enum(["gym", "coding", "fitness", "active"]),
    color: z.enum([
        "mint-green",
        "sky-blue",
        "lavender",
        "peach",
        "pastel-yellow",
        "pale-coral",
    ]),
});
