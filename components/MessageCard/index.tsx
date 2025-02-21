import classNames from 'classnames';
import {Message} from "@/components/MessageCard/type";
import {markdownToHTML} from "@/lib/marked";
import ContentBlock from "@/components/MessageCard/ContentBlock";
import avatarImg from "@/public/images/avatar.png";
import Image, {StaticImageData} from "next/image";
import {useUser} from "@clerk/nextjs";
import {useEffect, useMemo} from "react";

interface MessageCardProps {
    message: Message;
}

const Icon = ({ imgSrc, hidden=false }: {imgSrc: string | StaticImageData, hidden?: boolean}) => {
    return useMemo(() => (
            <Image
                src={imgSrc}
                alt="avatar"
                width={60}
                height={60}
                unoptimized
                className={classNames({["hidden"]: hidden}, "decoration-100 rounded-full opacity-60 hover:opacity-90")}
            />
        )
    , [imgSrc])
}


const MessageCard = ({ message }: MessageCardProps) => {
    const { user } = useUser()
    const content = markdownToHTML(message.content);

    const { imageUrl } = user!

    return (
        <div key={message.id} className="mt-4">
            <Icon imgSrc={imageUrl} hidden />
            <div className={classNames("flex items-start", message.role === 'user' ? 'justify-end' : '')}>
                {message.role === 'assistant' && (
                    <Icon imgSrc={avatarImg} />
                )}
                <ContentBlock content={content as string} />
                {message.role === 'user' && (
                    <Icon imgSrc={imageUrl} />
                )}
            </div>
        </div>
    );
};

export default MessageCard;