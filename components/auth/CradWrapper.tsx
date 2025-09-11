import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
} from "../ui/card";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

interface CradWrapperProps {
    children: React.ReactNode;
    header: string;
    backbutton: string;
    backbuttonHref: string;
    socials: boolean;
}

function CradWrapper({
    children,
    header,
    backbutton,
    backbuttonHref,
    socials,
}: CradWrapperProps) {
    return (
        <Card className=" bg-background border-white/30 text-white">
            <CardHeader className="text-sm text-light-purple/60">{header}</CardHeader>
            <CardContent>{children}</CardContent>
            {socials && (
                <CardFooter>
                    <Button
                        variant="outline"
                        className="w-full border-light-purple/50 font-normal flex gap-2 cursor-pointer glow-white"
                    >
                        <FcGoogle />
                        Sign in with Google
                    </Button>
                </CardFooter>
            )}
            <CardFooter>
                <Button variant='link' className="w-full font-normal text-zinc-200" size='sm' asChild>
                    <Link href={backbuttonHref}>{backbutton}</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}

export default CradWrapper;
