import { CircleAlert, CircleCheck } from "lucide-react";
import React from "react";

function Message({ type, label }: { type: string; label: string }) {
    return (
        <div>
            <div className={`flex text-sm rounded-full py-2 px-3 gap-2 items-center ${type === 'error' ? 'bg-red-300 text-red-900' : 'bg-emerald-300 text-emerald-950'}`}>
                {type === 'error' && <CircleAlert size={18} />}
                {type === 'success' && <CircleCheck size={18} />}
                <p>{label}</p>
            </div>
        </div>
    );
}

export default Message;
