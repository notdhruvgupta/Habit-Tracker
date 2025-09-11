import {
    Activity,
    CodeIcon,
    Dumbbell,
    Footprints,
    Plus,
    X,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import useModalBlur from "../stores/modalStore";
interface IconDivProps {
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface ColorDivProps {
    Color: {
        name: string;
        value: string;
    };
}

function IconDiv({ Icon }: IconDivProps) {
    return (
        <div className="border border-light-purple/60 p-2 rounded-lg">
            <input type="radio" />
            <Icon className="" />
        </div>
    );
}

function ColorDiv({ Color }: ColorDivProps) {
    return (
        <div
            className="w-6 h-6 rounded-full"
            style={{ backgroundColor: Color.value }}
        ></div>
    );
}

const Icons = [
    { name: "gym", value: Dumbbell },
    { name: "coding", value: CodeIcon },
    { name: "fitness", value: Footprints },
    { name: "active", value: Activity },
];

const colorValues = [
    { name: "mint-green", value: "var(--color-mint-green-base)" },
    { name: "sky-blue", value: "var(--color-sky-blue-base)" },
    { name: "lavender", value: "var(--color-lavender-base)" },
    { name: "peach", value: "var(--color-peach-base)" },
    { name: "pastel-yellow", value: "var(--color-pastel-yellow-base)" },
    { name: "pale-coral", value: "var(--color-pale-coral-base)" },
];

function CreateHabit() {
    const { modalBlur, flipModalBlur } = useModalBlur();
    const ModalRef = useRef(null);

    const [habitData, setHabitData] = useState({
        title: "",
        subtitle: "",
        icon: "",
        color: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setHabitData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Submitted", JSON.stringify(habitData, null, 2));

        setHabitData({
            title: "",
            subtitle: "",
            icon: "",
            color: "",
        });

        flipModalBlur();
    };

    useEffect(() => {
        const mouseClickHandler = (event: MouseEvent) => {
            const target = event.target as HTMLElement | null;
            if (
                ModalRef.current &&
                target &&
                !ModalRef.current?.contains(target) &&
                !target.closest("button")
            ) {
                console.log("clicked");
                flipModalBlur();
            }
        };

        document.addEventListener("click", mouseClickHandler);

        return () => {
            document.removeEventListener("click", mouseClickHandler);
        };
    }, [flipModalBlur]);

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
                        ref={ModalRef}
                        className="absolute flex flex-col p-4 z-20 left-1/2 top-1/4 -translate-x-1/2 rounded-xl w-[85%] backdrop-blur-2xl border border-white/50 bg-light-purple/20"
                    >
                        <div className="flex items-center justify-between w-full mb-4">
                            <p className="text-sm">Create Habit</p>
                            <X
                                onClick={flipModalBlur}
                                className=" cursor-pointer"
                                size={18}
                            />
                        </div>
                        <p className="text-sm font-light">Title</p>
                        <input
                            name="title"
                            value={habitData.title}
                            onChange={handleInputChange}
                            className="border border-light-purple/30 bg-light-purple/10 mt-1 mb-3 h-9 rounded-md"
                        />
                        <p className="text-sm font-light">Subtitle</p>
                        <input
                            name="subtitle"
                            value={habitData.subtitle}
                            onChange={handleInputChange}
                            className="border border-light-purple/30 bg-light-purple/10 mt-1 mb-3 h-9 rounded-md"
                        />
                        <p className="text-sm font-light">Icon</p>
                        <div className="flex gap-2 my-1 mb-3">
                            {Icons.map((icon, i) => (
                                <div key={i} className="">
                                    <label className="border border-white/30 p-2 rounded-lg cursor-pointer hover:bg-purple/40 flex items-center justify-center transition-colors duration-200 has-[:checked]:bg-light-purple/20 has-[:checked]:border-light-purple has-[:checked]:shadow-md has-[:checked]:shadow-light-purple/20">
                                        <input
                                            className="sr-only"
                                            type="radio"
                                            name="icon"
                                            value={icon.name}
                                            checked={
                                                habitData.icon === icon.name
                                            }
                                            onChange={handleInputChange}
                                        />
                                        <icon.value />
                                    </label>
                                </div>
                            ))}
                            <button className="p-2 glow-white rounded-lg bg-light-purple/50">
                                <Plus />
                            </button>
                        </div>
                        <p className="text-sm font-light">Color</p>
                        <div className="flex gap-2 mt-2">
                            {colorValues.map((colors, i) => (
                                <div key={i} className="">
                                    <label className="w-9 h-9 rounded-full border border-white/30 cursor-pointer hover:bg-purple/40 flex items-center justify-center transition-colors duration-200 has-[:checked]:bg-light-purple/20 has-[:checked]:border-light-purple has-[:checked]:border-2 has-[:checked]:shadow-md has-[:checked]:shadow-light-purple/20">
                                        <input
                                            className="sr-only"
                                            type="radio"
                                            name="color"
                                            value={colors.name}
                                            checked={
                                                habitData.color === colors.name
                                            }
                                            onChange={handleInputChange}
                                        />
                                        <ColorDiv Color={colors} />
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div className="flex mt-5 gap-1">
                            <button
                                onClick={handleSubmit}
                                className="flex cursor-pointer items-center justify-center gap-1 flex-1 p-1 bg-light-purple/30 border glow-white border-light-purple/70 rounded-md"
                            >
                                <Plus size={15} />
                                Create Habit
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default CreateHabit;
