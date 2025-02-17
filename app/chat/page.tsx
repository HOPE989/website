"use client"
import MessageCard from "@/components/MessageCard";
import {useChat} from "@/hooks/useChat";

const Chat = () => {
    const { messages, input, handleSubmit, handleInputChange } = useChat();
    return (
        <div className="flex h-full flex-col w-full max-w-xl pb-36 pt-9 mx-auto stretch">
            <ul className="space-y-4">
                {messages.map((message) => (
                    <MessageCard key={message.id} message={message} />
                ))}
            </ul>

            <form onSubmit={handleSubmit}>
                <input
                    value={input}
                    onChange={handleInputChange}
                    className="w-full p-3 focus-visible:outline-gray-300 rounded shadow-xl focus:shadow-2xl transition-all"
                    placeholder="随便说点什么..."
                />
            </form>
        </div>
    );
};
export default Chat;
