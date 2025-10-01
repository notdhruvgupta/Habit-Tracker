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
import { LoaderCircle } from "lucide-react";
import Link from "next/link";

function LoginForm() {
    const searchParams = useSearchParams();
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

    const urlError =
        searchParams.get("error") === "OAuthAccountNotLinked"
            ? "Email already in use!"
            : "";
    
    const handleSubmit = (values: z.infer<typeof LoginSchema>) => {
        startTransition(() => {
            login(values).then((data) => {
                setError(data?.error);
                setSuccess(data?.success);
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
                                        className="border-light-purple/20 bg-light-purple/5 selection:bg-light-purple/30 selection:text-white"
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
                                        className="border-light-purple/20 bg-light-purple/5 selection:bg-light-purple/30 selection:text-white"
                                    />
                                </FormControl>
                                <Button size='sm' variant='link' asChild className="text-white px-0 w-fit flex font-normal justify-start">
                                    <Link href='/auth/reset'>Forgot Password</Link>
                                </Button>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {(error || urlError) && <Message type="error" label={error || urlError} />}
                    {success && <Message type="success" label={success} />}
                    <Button
                        disabled={isPending}
                        variant="custom_pur"
                        type="submit"
                        className="w-full cursor-pointer text-purple"
                    >
                        {isPending && <LoaderCircle className=" animate-spin" />}
                        Login
                    </Button>
                </form>
            </Form>
        </CradWrapper>
    );
}

export default LoginForm;
