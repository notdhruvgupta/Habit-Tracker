"use server"
import { db } from '@/lib/db';
import {startOfDay} from 'date-fns'

export const completeHabit = async (habitId: string) => {

    const today = startOfDay(new Date());

    try {
        await db.habitLog.upsert({
            where: {
                habitId_date: {
                    habitId,
                    date: today
                }
            },
            update: {
                completed: true
            },
            create: {
                habitId, 
                date: today,
                completed: true
            }
        })
        console.log("Habit Log Updated Successfully!");
    } catch (error) {
        console.log("Error in updating Habit Log!", error);
        return {
            error: "Could not log Habit!"
        }
    }
    

}