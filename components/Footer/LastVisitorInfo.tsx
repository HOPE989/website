import {MousePointerClick} from "lucide-react";

interface VisitorGeolocation {
    country: string
    city?: string
    flag: string
}

export default function LastVisitorInfo() {
    let lastVisitor: VisitorGeolocation | undefined = undefined
    // todo
    // if (env.VERCEL_ENV === 'production') {
    //     const [lv, cv] = await redis.mget<VisitorGeolocation[]>(
    //         kvKeys.lastVisitor,
    //         kvKeys.currentVisitor
    //     )
    //     lastVisitor = lv
    //     await redis.set(kvKeys.lastVisitor, cv)
    // }

    if (!lastVisitor) {
        lastVisitor = {
            country: 'CN',
            flag: 'cn',
        }
    }

    return (
        <span className="flex items-center justify-center gap-1 text-sm font-mono opacity-70 md:justify-start">
            <MousePointerClick className="h-4 w-4"/>
            <span>
                最近访客来自&nbsp;
                {[lastVisitor.city, lastVisitor.country].filter(Boolean).join(', ')}
            </span>
            <span className="font-medium">{lastVisitor.flag}</span>
        </span>
    )
}