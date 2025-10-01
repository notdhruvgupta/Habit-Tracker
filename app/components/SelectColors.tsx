import { FEATURED_COLORS } from "@/data/colors";
import React, { useCallback, useState } from "react";

interface SelectColorProps {
    onColorSelect: (colorName: string) => void;
}

function SelectColors({ onColorSelect }: SelectColorProps) {
    const [selectedColor, setSelectedColor] = useState('');

    const handleSubmit = useCallback((colorName: string) => {
        if(colorName) {
            onColorSelect(colorName);
            setSelectedColor(colorName);
        }
    }, [selectedColor]) 
    
    return (
        <div className="flex gap-2 mt-2">
            {FEATURED_COLORS.map((color, i) => (
                <div key={i} className="">
                    <div onClick={() => handleSubmit(color.name)} 
                    className={`w-9 h-9 relative transition-all duration-150 z-30 rounded-full border border-white/30 cursor-pointer hover:bg-white/50
                        ${selectedColor === color.name && "shadow-[0px_0px_4px_2px_rgba(255,255,255,0.62)]"}
                    `}>
                        <div
                            className={`w-6 h-6 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
                            style={{ backgroundColor: color.value }}
                        ></div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SelectColors;
