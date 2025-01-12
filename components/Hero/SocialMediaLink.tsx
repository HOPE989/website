import { ReactNode } from "react"
import Link from "next/link";

export default function SocialMediaLink({ children, link }: { children: ReactNode, link: string }) {
    return (
        <Link
            href={link}
            target="_blank"
            className="flex items-center justify-start w-8 h-8 p-[5px] duration-500 opacity-60 hover:opacity-100 border-muted-foreground"
            title={link}
        >
            {children}
        </Link>
    )
}