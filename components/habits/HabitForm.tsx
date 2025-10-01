"use client"
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { HabitSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Plus } from "lucide-react";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import SelectIcons from "../../app/components/SelectIcons";
import SelectColors from "../../app/components/SelectColors";
import useModalBlur from "../../app/stores/modalStore";
import { createHabit } from "@/actions/createHabit";
import Message from "@/components/auth/Message";
import { toast } from "sonner";
import { getCurrentUser } from "@/hooks/get-current-user";
import { getFormattedDateFull } from "@/hooks/get-format-date";

function HabitForm() {
    const user = getCurrentUser();
    const { flipModalBlur } = useModalBlur();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>();
    const [success, setSuccess] = useState<string | null>();

    const form = useForm<z.infer<typeof HabitSchema>>({
        resolver: zodResolver(HabitSchema),
        defaultValues: {
            title: "",
            subtitle: "",
            icon: "",
            color: "white",
        },
    });

    const handleSubmit = (values: z.infer<typeof HabitSchema>) => {
        console.log(user);
        const dateNow = new Date();
        const formatDate = getFormattedDateFull(dateNow);
        if (!user) {
            flipModalBlur();
            const habits = JSON.parse(
                localStorage.getItem("habitdata") || "[]"
            );
            if (!Array.isArray(habits)) {
                localStorage.setItem("habitdata", JSON.stringify([values]));
            } else {
                const updatedHabits = [...habits, values];
                localStorage.setItem(
                    "habitdata",
                    JSON.stringify(updatedHabits)
                );
            }
            window.dispatchEvent(new Event("storage_updated"));
            toast.success("New Habit has been created", {
                description: formatDate,
            });
        } else {
            startTransition(() => {
                createHabit(values).then((data) => {
                    flipModalBlur();
                    setError(data.error);
                    setSuccess(data.success);
                    if (data.success) {
                        toast.success("New Habit has been created", {
                            description: formatDate,
                        });
                        window.dispatchEvent(new Event("habits_updated"));
                    }
                });
            });
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-5 text-white"
            >
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-light">Title</FormLabel>
                            <FormControl>
                                <Input
                                    disabled={isPending}
                                    className="text-white border border-light-purple/50"
                                    placeholder="Habit name"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="subtitle"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-light">
                                Subtitle
                            </FormLabel>
                            <FormControl>
                                <Input
                                    disabled={isPending}
                                    className="text-white border border-light-purple/50"
                                    placeholder="Habit description"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="icon"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-light">
                                Select Icons
                            </FormLabel>
                            <FormControl>
                                <SelectIcons
                                    onIconSelect={(iconName) => {
                                        field.onChange(iconName);
                                    }}
                                    defaultIcon={field.value}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-light">
                                Select Icons
                            </FormLabel>
                            <FormControl>
                                <SelectColors
                                    onColorSelect={(colorName) => {
                                        field.onChange(colorName);
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    disabled={isPending}
                    type="submit"
                    className="cursor-pointer w-full bg-background/50 border glow-white border-white/40 rounded-md hover:bg-light-purple/50"
                >
                    {isPending ? (
                        <LoaderCircle className=" animate-spin" />
                    ) : (
                        <Plus />
                    )}
                    Create Habit
                </Button>
                {error && <Message type="error" label={error} />}
                {success && <Message type="success" label={success} />}
            </form>
        </Form>
    );
}

export default HabitForm;
