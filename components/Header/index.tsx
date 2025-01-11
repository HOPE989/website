"use client"

import Avatar from "@/components/Header/Avatar";
import {usePathname} from "next/navigation";
import Navbar from "@/components/Header/Navbar";

export default function Header() {
    const pathname = usePathname()
    const page = pathname.split("/").slice(0, 2).join("/")

    return (
        <header className="gird w-full grid-flow-col grid-cols-3 sm:grid-cols-4">
            <Avatar page={page} />

            <Navbar page={page} />
        </header>
    )
}