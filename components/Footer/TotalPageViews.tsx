import {UserIcon} from "lucide-react";

export default function TotalPageView() {
    let views: number = 345678

    return (
        <span className="flex items-center justify-center gap-1 text-sm font-mono opacity-70 md:justify-start">
            <UserIcon className="h-4 w-4" />
            <span>
                总浏览量&nbsp;
                <span>{ views }</span>
            </span>
        </span>
    )
}