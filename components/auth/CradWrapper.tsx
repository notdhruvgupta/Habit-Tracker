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
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

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

    const onClick = (provider: "google" | "github") => {
        signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT
        })
    }

    return (
        <Card className=" bg-background border-white/30 text-white">
            <CardHeader className="text-sm text-light-purple/60">{header}</CardHeader>
            <CardContent>{children}</CardContent>
            {socials && (
                <CardFooter className="gap-2">
                    <Button
                        onClick={() => onClick("google")}
                        variant="outline"
                        className="flex-1 border-light-purple/50 font-normal flex gap-2 cursor-pointer glow-white"
                    >
                        <FcGoogle />
                    </Button>
                    <Button
                        onClick={() => onClick("github")}
                        variant="outline"
                        className="flex-1 border-light-purple/50 font-normal flex gap-2 cursor-pointer glow-white"
                    >
                        <FaGithub />
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
