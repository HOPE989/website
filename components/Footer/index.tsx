import Links from "@/components/Footer/Links";
import Link from "next/link";
import {Github} from "lucide-react";
import TotalPageView from "@/components/Footer/TotalPageViews";
import LastVisitorInfo from "@/components/Footer/LastVisitorInfo";

export default function Footer() {
    return (
        <div className="w-full m-16 text-muted-foreground">
            <div className="w-full border border-muted-foreground opacity-10"></div>

            <div className="flex items-center justify-between mt-4 h-24 gap-1 font-mono text-sm opacity-70">
                <p className="flex items-center">
                    &copy; {new Date().getFullYear()} H0PE. 网站已开源:
                    <Link
                        href="https://github.com/HOPE989/website"
                        target="_blank"
                        className="flex items-center justify-start w-8 h-8 p-[5px] duration-500 opacity-60 hover:opacity-100 border-muted-foreground"
                    >
                        <Github />
                    </Link>
                </p>
                <Links />
            </div>

            <div className="flex items-center justify-start gap-4 sm:flex-row">
                <TotalPageView />
                <LastVisitorInfo />
            </div>
        </div>
    )
}