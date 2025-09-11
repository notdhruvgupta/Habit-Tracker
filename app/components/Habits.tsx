import { Check, Dumbbell } from "lucide-react";
import React from "react";

function Habits() {
    return (
        <div className="my-5 border border-light-purple/30 rounded-xl p-3">
            <div className="flex text-light-purple justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="border border-light-purple/50 flex justify-center items-center p-2 rounded-md">
                        <Dumbbell />
                    </div>
                    <div>
                        <p>Habit 1</p>
                        <p className="text-xs font-light">Habit Desc</p>
                    </div>
                </div>
                <div className="border border-light-purple/50 flex justify-center items-center p-2 rounded-md">
                    <Check />
                </div>
            </div>

            <div className="bg-light-purple/10 px-2.5 pb-2.5 pt-1 mt-3 rounded-sm">
                <p className="text-xs text-light-purple/40">April</p>
                <div className="mt-2 custom-grid gap-1">
                    {Array.from({ length: 45 }).map((_, index) => (
                        <div
                            key={index}
                            className="h-5 border border-light-purple/20 rounded-[2px]"
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Habits;
