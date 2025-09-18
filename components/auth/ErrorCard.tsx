import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";

function ErrorCard() {
    return (
        <Card className=" bg-background border-white/30 text-white">
            <CardContent className="flex text-red-400 items-center justify-center text-3xl">
                <FaExclamationTriangle />
            </CardContent>
            <CardHeader className="text-xl text-red-300 text-center">
                Oops! Something went wrong
            </CardHeader>
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

export default ErrorCard;
