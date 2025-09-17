import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import bcryptjs from "bcryptjs";

import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";

export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                console.log("🔐 Auth attempt for:", credentials?.email); // Debug log
                
                const validateFields = LoginSchema.safeParse(credentials);
                
                if (!validateFields.success) {
                    console.log("❌ Schema validation failed:", validateFields.error); // Debug log
                    return null;
                }
                
                const { email, password } = validateFields.data;
                console.log("✅ Schema validation passed for:", email); // Debug log
                
                const user = await getUserByEmail(email);
                
                if (!user) {
                    console.log("❌ User not found:", email); // Debug log
                    return null;
                }
                
                if (!user.password) {
                    console.log("❌ No password hash found for user:", email); // Debug log
                    return null;
                }
                
                console.log("🔍 Comparing passwords..."); // Debug log
                const matchPass = await bcryptjs.compare(password, user.password);
                
                if (matchPass) {
                    console.log("✅ Password match! Login successful"); // Debug log
                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name, // Include other necessary fields
                        // Don't return the password hash
                    };
                } else {
                    console.log("❌ Password mismatch"); // Debug log
                }
                
                return null;
            },
        }),
    ],
} satisfies NextAuthConfig;
