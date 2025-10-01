import React from "react";
import Navbar from "../components/Navbar";

function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col">
            <Navbar auth />
            {children}
        </div>
    );
}

export default layout;
