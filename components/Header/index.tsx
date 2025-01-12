"use client"

import Avatar from "@/components/Header/Avatar";
import {usePathname} from "next/navigation";
import Navbar from "@/components/Header/Navbar";
import Link from "next/link";
import GithubIcon from "@/public/icons/GithubIcon";

export default function Header() {
    const pathname = usePathname()
    const page = pathname.split("/").slice(0, 2).join("/")

    return (
        <header className="grid w-full grid-flow-col grid-cols-3 sm:grid-cols-4">
            <Avatar page={page} />

            <Navbar page={page} />

            <div className="flex items-center justify-end gap-2">
                <Link
                    href="https://github.com/HOPE989/website"
                    target="_blank"
                    className="opacity-80 hover:opacity-100"
                >
                    <GithubIcon />
                </Link>
                {
                    //todo login
                }
            </div>
        </header>
    )
}