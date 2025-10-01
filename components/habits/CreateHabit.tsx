"use client"
import {
    Plus,
    X,
} from "lucide-react";
import React from "react";
import useModalBlur from "../../app/stores/modalStore";
import HabitForm from "./HabitForm";


function CreateHabit() {
    const { modalBlur, flipModalBlur } = useModalBlur();

    return (
        <>
            {/* Overlay */}
            {modalBlur && (
                <div className="absolute inset-0 h-screen w-screen z-10 backdrop-blur-sm bg-black/30" />
            )}

            <div className="my-3 relative text-light-purple">
                {/* Button */}
                <button
                    onClick={(e) => {
                        flipModalBlur();
                    }}
                    className="flex cursor-pointer items-center text-light-purple bg-light-purple/20 border border-light-purple/20 justify-between mt-5 px-3 py-2 w-full rounded-xl"
                >
                    Create Habit
                    <Plus />
                </button>

                {/* Modal */}
                {modalBlur && (
                    <div
                        className="absolute flex flex-col p-4 z-20 left-1/2 top-1/4 -translate-x-1/2 rounded-xl w-[90%] backdrop-blur-2xl border border-white/50 bg-light-purple/20"
                    >
                        <div className="flex items-center justify-between w-full mb-4">
                            <p className="text-sm">Create Habit</p>
                            <X
                                onClick={flipModalBlur}
                                className=" cursor-pointer"
                                size={18}
                            />
                        </div>
                        <HabitForm />
                    </div>
                )}
            </div>
        </>
    );
}

export default CreateHabit;
