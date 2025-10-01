"use client";
import { User } from "lucide-react";
import React, { useState } from "react";
import { AnimatePresence, easeInOut, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getCurrentUser } from "@/hooks/get-current-user";

function Navbar({ auth }: { auth: boolean }) {
    const [openMenu, setOpenMenu] = useState(false);
    const user = getCurrentUser();

    return (
        <div className="flex text-white glow-white bg-linear-to-b from-white/20 to-white/50 border-white/10 rounded-[8px] p-[0.8px] items-center">
            <div className="flex relative justify-between items-center w-full bg-radial-bw p-3 rounded-[7.2px]">
                <div className="text-xl font-semibold">
                    <Link href="/">Habit Tracker</Link>
                </div>
                <button
                    onClick={() => {
                        setOpenMenu((prev) => !prev);
                    }}
                    className="flex gap-1.5 hover:bg-light-purple/10 cursor-pointer rounded-full p-1"
                >
                    {!user?.image ? (
                        <User />
                    ) : (
                        <div className="border border-white/50 w-9 h-9 rounded-full overflow-hidden p-1">
                            <img src={user.image} alt="image" className="rounded-full" />
                        </div>
                    )}
                </button>
                {!auth && !user && (
                    <AnimatePresence>
                        {openMenu && (
                            <motion.div
                                initial={{
                                    height: 0,
                                    opacity: 0,
                                    y: 0,
                                }}
                                animate={{
                                    height: "auto",
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                }}
                                exit={{
                                    height: 0,
                                    opacity: 0,
                                    y: 0,
                                }}
                                transition={{
                                    duration: 0.3,
                                    ease: easeInOut,
                                    height: { duration: 0.2 },
                                    opacity: { duration: 0.2 },
                                }}
                                className="flex overflow-hidden flex-col gap-2 absolute top-16 border border-light-purple/30 rounded-md px-3 py-2 right-0 backdrop-blur-2xl z-20 w-32"
                            >
                                <Button className="text-end bg-background/40">
                                    <Link href="/auth/login">Login</Link>
                                </Button>
                                <hr className=" border-light-purple/20" />
                                <Button className="text-end bg-background/40">
                                    <Link href="/auth/register">Register</Link>
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
}

export default Navbar;
