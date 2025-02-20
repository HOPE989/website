import classNames from 'classnames';
import {Message} from "@/components/MessageCard/type";
import {markdownToHTML} from "@/lib/marked";
import ContentBlock from "@/components/MessageCard/ContentBlock";
import {MDXRemote} from "next-mdx-remote/rsc";
import avatarImg from "@/public/images/avatar.png";
import Image from "next/image";

interface MessageCardProps {
    message: Message;
}

const MessageCard = ({ message }: MessageCardProps) => {
    const content = markdownToHTML(message.content);

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
                        src={avatarImg}
                        alt="avatar"
                        width={60}
                        unoptimized
                        className="decoration-100 rounded-full opacity-60 hover:opacity-90"
                    />
                )}
            </div>
        </div>
    );
};

export default MessageCard;