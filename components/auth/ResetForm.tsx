"use client";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CradWrapper from "@/components/auth/CradWrapper";

import * as z from "zod";
import { ResetSchema } from "@/schemas";
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
import Message from "@/components/auth/Message";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { sendReset } from "@/actions/reset";

function ResetForm() {
    const [error, setError] = useState<string | null>();
    const [success, setSuccess] = useState<string | null>();
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
        },
    });

    const handleSubmit = (values: z.infer<typeof ResetSchema>) => {
        startTransition(() => {
            sendReset(values)
            .then((data) => {
                setError(data.error)
                setSuccess(data.success)
            })
        });
    };

    return (
        <CradWrapper
            header="Forgot your password?"
            backbutton="Don't have an account?"
            backbuttonHref="/auth/register"
            socials={false}
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
                        Send Reset Email
                    </Button>
                </form>
            </Form>
        </CradWrapper>
    );
}

export default ResetForm;
