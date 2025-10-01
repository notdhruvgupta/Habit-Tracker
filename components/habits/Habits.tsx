"use client";
import { HabitLogSchema, HabitSchema } from "@/schemas";
import { Check, Dumbbell, LoaderCircle } from "lucide-react";
import React, { useEffect, useMemo, useState, useTransition } from "react";
import * as z from "zod";
import { IconComponent } from "../../app/components/IconComponent";
import { FEATURED_COLORS } from "@/data/colors";
import { useHabits } from "@/hooks/non-user-habits";
import { getFormattedDateHalf } from "@/hooks/get-format-date";
import { getCurrentUser } from "@/hooks/get-current-user";
import { fetchHabits } from "@/actions/fetchHabits";
import { completeHabit } from "@/actions/completeHabit";
import { inCompleteHabit } from "@/actions/inCompleteHabit";
import { fetchHabitLogs } from "@/actions/fetchHabitLogs";

const getColor = (colorName: string) => {
    return (
        FEATURED_COLORS.find((color) => color.name === colorName)?.value ||
        "#fff"
    );
};

const getColorMix = (colorName: string, percentage: number): string => {
    const color = getColor(colorName);
    return `color-mix(in srgb, ${color} ${percentage}%, transparent)`;
};

const getTwoMonthDate = () => {
    const days = [];
    const today = new Date();
    const previousMonth = new Date(today);
    previousMonth.setMonth(today.getMonth() - 2);

    const curDate = new Date(previousMonth);

    while (curDate <= today) {
        days.push(new Date(curDate));
        curDate.setDate(curDate.getDate() + 1);
    }

    return days;
};

type ClientHabit = z.infer<typeof HabitSchema> & {
    id?: string;
    userId?: string | null;
};

const TextFormatter = (text: string | undefined) => {
    if (!text) return;
    return text.charAt(0).toUpperCase() + text.slice(1);
};

function Habits() {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const [habits, setHabits] = useState<ClientHabit[]>([]);

    const [habitLogs, setHabitLogs] = useState<
        z.infer<typeof HabitLogSchema>[]
    >([]);

    const [markHabit, setMarkHabit] = useState([
        {
            habitId: "",
            completed: false,
        },
    ]);

    const user = getCurrentUser();
    const localHabits = useHabits();
    const days = useMemo(() => getTwoMonthDate(), []);

    const LogHabit = (habitName: string, habitId: string) => {
        if (user?.id) {
            // set habit complete
            const isMarkedComplete = markHabit.find(
                (h) => h.habitId === habitId
            )?.completed;
            console.log(habitName, habitId, isMarkedComplete);

            if (!isMarkedComplete) {
                completeHabit(habitId);
            }

            if (isMarkedComplete) {
                inCompleteHabit(habitId);
            }
        }
    };

    useEffect(() => {
        const handleHabitUpdate = () => {
            if (user?.id) {
                startTransition(() => {
                    fetchHabits()
                        .then((res) => {
                            if (res.success) {
                                const mapped: ClientHabit[] = (
                                    res.data ?? []
                                ).map((h) => ({
                                    title: h.title,
                                    subtitle: h.subtitle ?? "", // <- convert null -> ""
                                    icon: h.icon,
                                    // Prisma's Color enum should be compatible with the string union,
                                    // but cast to satisfy the zod-inferred type if needed:
                                    color: h.color as unknown as z.infer<
                                        typeof HabitSchema
                                    >["color"],
                                    id: h.id,
                                    userId: h.userId ?? null,
                                }));
                                setHabits(mapped);
                                setMarkHabit(
                                    mapped
                                        .filter(
                                            (habit) =>
                                                habit.id !== undefined &&
                                                habit.id !== null
                                        )
                                        .map((habit) => ({
                                            habitId: habit.id as string,
                                            completed: false,
                                        }))
                                );
                            } else {
                                setError(res.error ?? "Failed Loading!");
                            }
                        })
                        .catch((err) => {
                            setError("Something went wrong!");
                        });
                });
            } else {
                setHabits(localHabits ?? []);
            }
        };

        handleHabitUpdate();

        window.addEventListener("habits_updated", handleHabitUpdate);

        return () => {
            window.removeEventListener("habits_updated", handleHabitUpdate);
        };
    }, [user?.id, localHabits, startTransition]);

    function handleHabitCompletion(
        habitName: string,
        habitId: string | undefined
    ) {
        if (!habitId) return;
        setMarkHabit((prev) =>
            prev.map((h) =>
                h.habitId === habitId ? { ...h, completed: !h.completed } : h
            )
        );

        LogHabit(habitName, habitId);
    }

    function getHabitCompletion(habitId: string | undefined) {
        if (!habitId) return;
        return markHabit.find((h) => h.habitId === habitId)?.completed;
    }

    return (
        <div>
            {!isPending ? (
                <div>
                    {habits.map((habit, id) => (
                        <div
                            key={id}
                            style={{
                                color: getColor(habit.color),
                                borderColor: getColorMix(habit.color, 30),
                            }}
                            className="my-5 border rounded-xl p-3"
                        >
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div
                                        style={{
                                            borderColor: getColorMix(
                                                habit.color,
                                                30
                                            ),
                                        }}
                                        className="border rounded-md"
                                    >
                                        <IconComponent
                                            iconName={habit.icon}
                                            className="bg-none"
                                        />
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <p>{TextFormatter(habit.title)}</p>
                                        <p className="text-xs font-light opacity-70">
                                            {TextFormatter(habit.subtitle)}
                                        </p>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        borderColor: getColorMix(
                                            habit.color,
                                            30
                                        ),
                                        background: getHabitCompletion(habit.id)
                                            ? getColorMix(habit.color, 30)
                                            : "black",
                                    }}
                                    className="border cursor-pointer hover:bg-white/20 flex justify-center items-center p-2 rounded-md"
                                    onClick={() =>
                                        handleHabitCompletion(
                                            habit.title,
                                            habit.id
                                        )
                                    }
                                >
                                    <Check />
                                </div>
                            </div>

                            <div
                                style={{
                                    backgroundColor: getColorMix(
                                        habit.color,
                                        10
                                    ),
                                }}
                                className="px-2.5 pb-2.5 pt-1 mt-3 rounded-sm"
                            >
                                <div className="mt-2 flex flex-wrap gap-[4px]">
                                    {days.map((day, index) => {
                                        const formatDate =
                                            getFormattedDateHalf(day);
                                        return (
                                            <div
                                                style={{
                                                    borderColor: getColorMix(
                                                        habit.color,
                                                        20
                                                    ),
                                                }}
                                                title={formatDate}
                                                key={index}
                                                className="h-4 w-4 border relative group rounded-[1.5px] hover:bg-white/20 cursor-pointer"
                                            >
                                                <div
                                                    style={{
                                                        backgroundColor:
                                                            getColorMix(
                                                                habit.color,
                                                                90
                                                            ),
                                                    }}
                                                    className="absolute rounded-sm text-background p-1 opacity-0 text-xs pointer-events-none whitespace-nowrap transition-opacity -translate-y-[110%] left-1/2 -translate-x-1/2 group-hover:opacity-100"
                                                >
                                                    {formatDate}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-xl mt-10 opacity-50 text-white flex justify-center items-center gap-2">
                    <LoaderCircle className=" animate-spin" />
                    Loading
                </div>
            )}
        </div>
    );
}

export default Habits;
