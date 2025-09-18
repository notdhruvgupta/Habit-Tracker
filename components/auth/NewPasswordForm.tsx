"use client";
import React, { useState, useTransition } from "react";
import CradWrapper from "./CradWrapper";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { PassSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";
import Message from "./Message";
import { ResetPassword } from "@/actions/new-password";
import { LoaderCircle } from "lucide-react";

function NewPasswordForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [error, setError] = useState<string | null>();
    const [success, setSuccess] = useState<string | null>();
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof PassSchema>>({
        resolver: zodResolver(PassSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const handleSubmit = (values: z.infer<typeof PassSchema>) => {
        if (!token) {
            setError("Missing Token!");
            return;
        }
        startTransition(() => {
            ResetPassword(values, token).then((data) => {
                setError(data.error);
                setSuccess(data.success);
            });
        });
    };

    return (
        <CradWrapper
            header="Reset Password"
            socials={false}
            backbutton="Back to login"
            backbuttonHref="/auth/login"
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="space-y-5"
                >
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
                                    ></Input>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isPending}
                                        {...field}
                                        placeholder="******"
                                        type="password"
                                        className="border-light-purple/20 bg-light-purple/5 selection:bg-light-purple/30 selection:text-white"
                                    ></Input>
                                </FormControl>
                                <p className="text-sm text-red-500">{form.formState.errors.confirmPassword?.message}</p>
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
                        {isPending && (
                            <LoaderCircle className=" animate-spin" />
                        )}
                        Reset Password
                    </Button>
                </form>
            </Form>
        </CradWrapper>
    );
}

export default NewPasswordForm;
