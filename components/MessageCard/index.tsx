import classNames from 'classnames';
import {Message} from "@/components/MessageCard/type";
import {markdownToHTML} from "@/lib/marked";
import ContentBlock from "@/components/MessageCard/ContentBlock";
import avatarImg from "@/public/images/avatar.png";
import Image from "next/image";
import {useUser} from "@clerk/nextjs";

interface MessageCardProps {
    message: Message;
}

const MessageCard = ({ message }: MessageCardProps) => {
    const { user } = useUser()
    const content = markdownToHTML(message.content);

    const { imageUrl } = user!

    return (
        <div key={message.id} className="mt-4">
            <div className={classNames("flex items-start", message.role === 'user' ? 'justify-end' : '')}>
                {message.role === 'assistant' && (
                    <Image
                        src={avatarImg}
                        alt="avatar"
                        width={60}
                        unoptimized
                        className="decoration-100 rounded-full opacity-60 hover:opacity-90"
                    />
                )}
                <ContentBlock content={content as string} />
                {message.role === 'user' && (
                    <Image
                        src={imageUrl}
                        alt="avatar"
                        width={60}
                        height={60}
                        unoptimized
                        className="decoration-100 rounded-full opacity-60 hover:opacity-90"
                    />
                )}
            </div>
        </div>
    );
};

export default MessageCard;