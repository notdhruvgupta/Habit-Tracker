"use client";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CradWrapper from "@/components/auth/CradWrapper";

import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { register } from "@/actions/register";
import Message from "@/components/auth/Message";

function RegisterForm() {
    const [error, setError] = useState<string | null>();
    const [success, setSuccess] = useState<string | null>();
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const handleSubmit = (values: z.infer<typeof RegisterSchema>) => {
        startTransition(() => {
            register(values)
            .then((data) => {
                setError(data.error);
                setSuccess(data.success);
            })
        });
    };

    return (
        <CradWrapper
            header="Register | Habit Tracker Account"
            backbutton="Already have an account?"
            backbuttonHref="/auth/login"
            socials
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="space-y-5"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isPending}
                                        {...field}
                                        placeholder="Dhruv Gupta"
                                        type="text"
                                        className="border-light-purple/20 bg-light-purple/5"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isPending}
                                        {...field}
                                        placeholder="example@email.com"
                                        type="email"
                                        className="border-light-purple/20 bg-light-purple/5"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isPending}
                                        {...field}
                                        placeholder="******"
                                        type="password"
                                        className="border-light-purple/20 bg-light-purple/5"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {error && <Message type="error" label={error} />}
                    {success && <Message type="success" label={success} />}
                    <Button
                        disabled={isPending}
                        variant="custom_pur"
                        type="submit"
                        className="w-full cursor-pointer text-purple"
                    >
                        Create an account
                    </Button>
                </form>
            </Form>
        </CradWrapper>
    );
}

export default RegisterForm;
