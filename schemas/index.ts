import { FEATURED_COLORS } from "@/data/colors";
import * as z from "zod";

const COLOR_NAMES = FEATURED_COLORS.map(color => color.name);

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
        .max(20, { message: "Title too long" }),
    subtitle: z
        .string()
        .max(50, { message: "Subtitle too long" })
        .optional()
        .or(z.literal("")),
    icon: z.string().min(1, "Please select an icon"),
    color: z.enum([...COLOR_NAMES, "white"]),
});

export const HabitLogSchema = z.object({
  habitId: z.string(),
  date: z.date(),
  completed: z.boolean(),
});