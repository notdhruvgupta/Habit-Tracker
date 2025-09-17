import { auth, signOut } from "@/auth";
import React from "react";

async function Settings() {
    const session = await auth();

    return (
        <div className="text-white">
            <p>Settings</p>
            <div className="text-2xl">
                <p>{session?.user?.name}</p>
                <p>{session?.user?.email}</p>
                <p>{session?.expires}</p>
            </div>

            <form
                action={async () => {
                    "use server";
                    await signOut();
                }}
            >
                <button type="submit">Sign Out</button>
            </form>
        </div>
    );
}

export default Settings;
