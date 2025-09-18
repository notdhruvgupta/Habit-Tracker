"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { LoaderCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { verifyToken } from "@/actions/new-verification";
import Message from "./Message";

function  ConfirmVerification() {
    const [error, setError] = useState<string | null>();
    const [success, setSuccess] = useState<string | null>();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {
        if (!token) {
            setError("Missing Token!");
            return;
        }

        verifyToken(token)
            .then((data) => {
                setError(data.error);
                setSuccess(data.success);
            })
            .catch(() => {
                setError("Something went Wrong!");
            });
    }, [token]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return (
        <Card className=" bg-background border-white/30 text-white">
            <CardHeader className="text-sm text-light-purple/50 text-center">
                Please wait
            </CardHeader>
            <CardContent className="flex flex-col gap-5 text-emerald-400 text-xl items-center justify-center">
                {!success && !error && (<div className="flex gap-2">
                    <LoaderCircle className=" animate-spin" />
                    Verifying your email
                </div>)}
                <div>
                    {error && <Message type="error" label={error} />}
                    {success && <Message type="success" label={success} />}
                </div>
            </CardContent>
            <CardFooter>
                <Button
                    variant="link"
                    className="w-full font-normal text-zinc-200"
                    size="sm"
                    asChild
                >
                    <Link href="/auth/login">Back to login</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}

export default ConfirmVerification;
