"use client"
import { HabitSchema } from "@/schemas";
import { useEffect, useState } from "react";
import * as z from "zod";

export const useHabits = () => {
    const [habits, setHabits] = useState<z.infer<typeof HabitSchema>[]>([]);
    
    const loadHabits = () => {
        const savedHabits = localStorage.getItem("habitdata");
        if (savedHabits) {
            setHabits(JSON.parse(savedHabits));
        }
    };

    useEffect(() => {
        loadHabits();
        window.addEventListener("storage_updated", loadHabits);
        return () => window.removeEventListener("storage_updated", loadHabits);
    }, []);

    return habits;
};