"use server";
import { db } from "@/lib/db";
import { startOfDay } from "date-fns";

export const inCompleteHabit = async (habitId: string) => {
    const today = startOfDay(new Date());

    try {
        await db.habitLog.update({
            where: {
                habitId_date: {
                    habitId,
                    date: today,
                },
            },
            data: {
                completed: false,
            },
        });
        console.log("Habit Log Updated Successfully!");
    } catch (error) {
        console.log("Error in updating Habit Log!", error);
        return {
            error: "Could not log Habit!",
        };
    }
};
