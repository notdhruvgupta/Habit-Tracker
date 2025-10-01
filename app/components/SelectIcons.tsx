import { Input } from "@/components/ui/input";
import {
    ChevronDown,
} from "lucide-react";
import React, {
    useState,
    useMemo,
    useCallback,
    useRef,
    useEffect,
} from "react";
import { icons, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { FEATURED_ICONS } from "@/data/icon-placeholder";
import { IconComponent } from "./IconComponent";


const ICON_NAMES = Object.keys(icons);

interface SelectIconsProps {
    onIconSelect?: (iconName: string) => void;
    defaultIcon?: string;
}

// Main component
const SelectIcons: React.FC<SelectIconsProps> = ({
    onIconSelect,
    defaultIcon = "",
}) => {
    const [selectedIcon, setSelectedIcon] = useState<string>(defaultIcon);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Memoized filtered icons for performance
    const filteredIcons = useMemo(() => {
        if (!searchQuery.trim()) return ICON_NAMES;
        return ICON_NAMES.filter((iconName) =>
            iconName.toLowerCase().includes(searchQuery.toLowerCase().trim())
        );
    }, [searchQuery]);

    // Handle icon selection
    const handleIconSelect = useCallback(
        (iconName: string) => {
            setSelectedIcon(iconName);
            onIconSelect?.(iconName);

        },
        [onIconSelect]
    );

    // Handle submit action
    const handleSubmit = useCallback(() => {
        if (selectedIcon) {
            onIconSelect?.(selectedIcon);
            setIsExpanded(false);
            setSearchQuery("");
        }

        console.log(selectedIcon);
    }, [selectedIcon, onIconSelect]);

    // Toggle expanded state
    const toggleExpanded = useCallback(() => {
        setIsExpanded((prev) => {
            const newState = !prev;
            // Focus search input when expanding
            if (newState) {
                setTimeout(() => searchInputRef.current?.focus(), 100);
            } else {
                setSearchQuery("");
            }
            return newState;
        });
    }, []);

    // Handle keyboard navigation
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === "Escape") {
            setIsExpanded(false);
            setSearchQuery("");
        }
    }, []);

    // Focus management
    useEffect(() => {
        if (isExpanded && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isExpanded]);

    return (
        <div className="text-white mb-1" onKeyDown={handleKeyDown}>
            <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center gap-2">
                    {!isExpanded ? (
                        // Featured icons section
                        <div className="flex gap-2 flex-1">
                            {FEATURED_ICONS.map((icon) => (
                                <IconComponent
                                    key={icon.name}
                                    iconName={icon.name}
                                    isSelected={selectedIcon === icon.name}
                                    onClick={() => handleIconSelect(icon.name)}
                                />
                            ))}
                            {selectedIcon &&
                                !FEATURED_ICONS.some(
                                    (icon) => icon.name === selectedIcon
                                ) && (
                                    <IconComponent
                                        iconName={selectedIcon}
                                        isSelected={true}
                                        onClick={() =>
                                            handleIconSelect(selectedIcon)
                                        }
                                        className="ring-2 ring-white/30"
                                    />
                                )}
                        </div>
                    ) : (
                        // Search input section
                        <Input
                            ref={searchInputRef}
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search icons..."
                            className="border-light-purple/50 flex-1"
                            aria-label="Search for icons"
                        />
                    )}

                    {/* Expand/collapse button */}
                    <motion.button
                        initial={false}
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        onClick={toggleExpanded}
                        className="text-light-purple border border-light-purple hover:bg-light-purple/70 focus:bg-light-purple/70 focus:outline-none focus:ring-2 focus:ring-white/10 cursor-pointer p-1 rounded-full bg-lavender-dark/60 h-7 w-7 flex items-center justify-center transition-colors duration-200"
                        aria-label={
                            isExpanded
                                ? "Collapse icon selection"
                                : "Expand icon selection"
                        }
                        aria-expanded={isExpanded}
                        type="button"
                    >
                        <ChevronDown size={14} />
                    </motion.button>
                </div>

                {/* Expanded section */}
                <AnimatePresence mode="wait">
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 300, opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="flex flex-col gap-3"
                        >
                            {/* Icons grid */}
                            <div
                                className="flex flex-wrap content-start gap-2 h-64 overflow-y-auto p-1"
                                role="grid"
                                aria-label="Icon selection grid"
                            >
                                {filteredIcons.length > 0 ? (
                                    filteredIcons.map((iconName) => (
                                        <div
                                            key={iconName}
                                            className={`rounded-md transition-all duration-300 ease-in-out ${
                                                selectedIcon === iconName
                                                    ? "bg-lavender-dark ring-2 ring-white/10"
                                                    : ""
                                            }`}
                                            role="gridcell"
                                        >
                                            <IconComponent
                                                iconName={iconName}
                                                isSelected={
                                                    selectedIcon === iconName
                                                }
                                                onClick={() =>
                                                    handleIconSelect(iconName)
                                                }
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-8 text-center text-white/50 py-8">
                                        No icons found for "{searchQuery}"
                                    </div>
                                )}
                            </div>

                            {/* Action buttons */}
                            <div className="flex gap-2 justify-end">
                                <Button
                                    onClick={() => {
                                        setIsExpanded(false);
                                        setSearchQuery("");
                                    }}
                                    className="cursor-pointer flex-1 bg-red-950 text-red-300 border border-red-300/30"
                                    type="button"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleSubmit}
                                    variant="default"
                                    className="cursor-pointer bg-light-purple/10 text-light-purple border border-light-purple/20 flex-2"
                                    disabled={!selectedIcon}
                                    type="button"
                                >
                                    Select Icon
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default SelectIcons;
