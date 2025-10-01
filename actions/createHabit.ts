"use server";
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { HabitSchema } from '@/schemas'
import * as z from 'zod'

export const createHabit = async (values: z.infer<typeof HabitSchema>) => {
    const validateValues = HabitSchema.safeParse(values);

    if(!validateValues.success) {
        return {
            error: "Invalid entries!"
        }
    }

    const {title, subtitle, icon, color} = validateValues.data;
    const session = await auth();
    const userId = session?.user?.id;
        
    // add to db
    try {
        await db.habit.create({
            data: {
                title,
                subtitle: subtitle || null,
                icon, 
                color,
                userId
            }
        })
    } catch(error) {
        return {
            error: `Server Error: ${error}`
        }
    }

    return {
        success: "Habit Created"
    }

}