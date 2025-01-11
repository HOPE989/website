import Link from "next/link";
import Image from "next/image";
import avatarImg from "@/public/images/avatar.png"

interface AvatarProps {
    page?: string
}

export default function Avatar({page}: AvatarProps) {

    return (
        <div className="flex items-center justify-start col-span-1">
            <Link href="/">
                <div className="flex flex-col items-center justify-end">
                    <Image
                        src={avatarImg}
                        alt="avatar"
                        width={60}
                        unoptimized
                        className={`decoration-100 rounded-full opacity-60 hover:opacity-90 ${page == "/"? "translate-y-20 scale-150": ""}`}
                    />
                </div>
            </Link>
        </div>
    )
}