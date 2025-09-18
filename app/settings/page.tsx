"use client"
import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/hooks/get-current-user";
import React from "react";

function Settings() {
    const user = getCurrentUser();

    const onClick = () => {
        logout();
    }

    return (
        <div className="text-white">
            {JSON.stringify(user)}
            <Button variant='destructive' className=" cursor-pointer" onClick={onClick}>Sign Out</Button>
        </div>
    );
}

export default Settings;
