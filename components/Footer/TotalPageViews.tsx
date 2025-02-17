import {UserIcon} from "lucide-react";
import {env} from "@/env.mjs";
import {redis} from "@/lib/redis";
import {kvKeys} from "@/config/kv";

export default async function TotalPageView() {
    let views: number
    if (env.VERCEL_ENV === "production") {
        views = await redis.incr(kvKeys.totalPageViews)
    }else {
        views = 345678
    }

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