import { CircleAlert, CircleCheck } from "lucide-react";
import React from "react";

function Message({ type, label }: { type: string; label: string }) {
    return (
        <div>
            <div className={`flex text-sm rounded-md py-2 px-3 gap-2 items-center ${type === 'error' ? 'border bg-red-950 border-red-400 text-red-400' : 'border bg-emerald-950 border-emerald-300 text-emerald-300'}`}>
                {type === 'error' && <CircleAlert size={18} />}
                {type === 'success' && <CircleCheck size={18} />}
                <p>{label}</p>
            </div>
        </div>
    );
}

export default Message;
