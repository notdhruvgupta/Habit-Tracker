import { icons, LucideIcon } from "lucide-react"

const ICON_BASE_CLASSES =
    "cursor-pointer w-10 h-10 flex items-center justify-center transition-all duration-300 border-light-purple/20 ease-in-out p-2 rounded-md bg-gradient-to-tl from-background/40 to-lavender-base/20 hover:bg-lavender-base/80 focus:outline-none focus:ring-1 focus:ring-lavender-base focus:ring-offset-1";
const ICON_SELECTED_CLASSES = "border-white/50 bg-lavender-base";
interface IconCompProps {
    iconName: string;
    isSelected?: boolean;
    onClick?: () => void;
    className?: string;
}

export const IconComponent: React.FC<IconCompProps> = ({
    iconName,
    isSelected = false,
    onClick,
    className = "",
}) => {
    if (!iconName || !icons[iconName as keyof typeof icons]) {
        return (
            <div
                className={`${ICON_BASE_CLASSES} ${className} opacity-50 cursor-not-allowed`}
                aria-label="Icon not found"
                role="button"
                tabIndex={-1}
            >
                <span>?</span>
            </div>
        );
    }

    const LucideIconComp = icons[iconName as keyof typeof icons] as LucideIcon;

    return (
        <button
            className={`
                ${ICON_BASE_CLASSES} 
                ${isSelected ? ICON_SELECTED_CLASSES : ""} 
                ${className}
            `}
            onClick={onClick}
            aria-label={`Select ${iconName} icon`}
            aria-pressed={isSelected}
            type="button"
        >
            <LucideIconComp size={20} />
        </button>
    );
};
