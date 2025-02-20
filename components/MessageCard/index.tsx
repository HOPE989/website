import classNames from 'classnames';
import {Message} from "@/components/MessageCard/type";
import {markdownToHTML} from "@/lib/marked";
import ContentBlock from "@/components/MessageCard/ContentBlock";

interface MessageCardProps {
    message: Message;
}

type AvatarProps = Pick<Message, 'role'>;

const Avatar = ({ role }: AvatarProps) => {
    const getName = () => (role === 'user' ? 'U' : 'AI');

    return (
        <span
            className={classNames(
                'w-6 h-6 inline-flex items-center justify-center rounded-full min-w-[24px]',
                role === 'user' ? 'bg-orange-300' : 'bg-green-400'
            )}
        >
      {getName()}
    </span>
    );
};

const MessageCard = ({ message }: MessageCardProps) => {
    const content = markdownToHTML(message.content);

    return (
        <div key={message.id}>

            {
                message.role === 'assistant' && (
                    <div className="flex items-start">
                        <Avatar role={message.role} />
                        <ContentBlock content={content as string} />
                    </div>
                )
            }
            {
                message.role === 'user' && (
                    <div className="flex items-start justify-end">
                        <div className="ml-2 prose" dangerouslySetInnerHTML={{ __html: content as string }} />
                        <Avatar role={message.role} />
                    </div>
                )
            }
        </div>
    );
};

export default MessageCard;