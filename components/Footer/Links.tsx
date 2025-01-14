import {navigationItems} from "@/config/nav";
import Link from "next/link";

export default function Links() {
    return (
        <nav className="flex gap-6 text-sm font-mono opacity-70 text-zinc-200">
            {navigationItems.map(({href, name}) => (
                <Link href={href} key={href} className="transition hover:text-lime-500">
                    {name}
                </Link>
            ))}
        </nav>
    )
}