"use client";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CradWrapper from "@/components/auth/CradWrapper";
import { useSearchParams } from "next/navigation";

import * as z from "zod";
import { LoginSchema } from "@/schemas";
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
import { login } from "@/actions/login";
import Message from "@/components/auth/Message";

function LoginForm() {
    const searchParams = useSearchParams();
    const urlError =
        searchParams.get("error") === "OAuthAccountNotLinked"
            ? "Email already in use!"
            : "";
    const [error, setError] = useState<string | null>();
    const [success, setSuccess] = useState<string | null>();
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const handleSubmit = (values: z.infer<typeof LoginSchema>) => {
        startTransition(() => {
            login(values).then((data) => {
                // This will only run if login returns an error (failed authentication)
                if (data?.error) {
                    setError(data.error);
                    // 2FA
                }
            });
        });
    };

    return (
        <CradWrapper
            header="Login | Habit Tracker Account"
            backbutton="Don't have an account?"
            backbuttonHref="/auth/register"
            socials
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="space-y-5"
                >
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
                    {error || urlError && <Message type="error" label={error || urlError} />}
                    {success && <Message type="success" label={success} />}
                    <Button
                        disabled={isPending}
                        variant="custom_pur"
                        type="submit"
                        className="w-full cursor-pointer text-purple"
                    >
                        Login
                    </Button>
                </form>
            </Form>
        </CradWrapper>
    );
}

export default LoginForm;
