"use server";
import { db } from "@/lib/db";

export const fetchHabitLogs = async (habitId: string) => {
    try {
        const since = new Date();
        since.setDate(since.getDate() - 10);

        const habitLogs = await db.habitLog.findMany({
            where: { habitId, date: { gte: since } },
            orderBy: { date: "asc" },
        });

        console.log(habitLogs);
        return { success: true, data: habitLogs };
    } catch (error) {
        return { success: false, error: `Server Error: ${error}` };
    }
};
