import SocialMediaLink from "@/components/Hero/SocialMediaLink";
import {Github, Mail} from "lucide-react";

export default function Socials() {
    return (
        <div className="flex gap-6">
            <SocialMediaLink link="https://github.com/HOPE989" >
                <Github />
            </SocialMediaLink>
            <SocialMediaLink link="mailto:836495061@qq.com">
                <Mail />
            </SocialMediaLink>
        </div>
    )
}