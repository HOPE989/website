import classNames from 'classnames';
import {Message} from "@/components/MessageCard/type";

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
    return (
        <div key={message.id} className="flex items-center">
            <Avatar role={message.role} />
            <div className="ml-2">{message.content}</div>
        </div>
    );
};

export default MessageCard;