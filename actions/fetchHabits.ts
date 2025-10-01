"use server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export const fetchHabits = async () => {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            throw new Error("Unauthorized");
        }

        const habits = await db.habit.findMany({
            where: {
                userId: session.user.id,
            },
        });

        return { success: true, data: habits };
    } catch (error) {
        return { success: false, error: `Server Error: ${error}` };
    }
};
