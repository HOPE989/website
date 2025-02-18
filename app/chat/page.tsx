"use client"
import MessageCard from "@/components/MessageCard";
import {useState} from "react";

export type Message = {
    id: string;
    createdAt?: Date;
    content: string;
    role: 'system' | 'user' | 'assistant';
};

const Chat = () => {

    const messages: Message[] = [
        { id: '1', content: 'hello', role: 'user' },
        { id: '2', content: 'world', role: 'assistant' },
    ];

    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
      setInputValue(e.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await fetch('/api/chat', {
            method: 'POST',
            body: JSON.stringify({
                data: inputValue,
            }),
        })

        console.log(res)
    }

    return (
        <div className="flex h-full flex-col w-full max-w-xl pb-36 pt-9 mx-auto stretch">
            <ul className="space-y-4">
                {messages.map((message) => (
                    <MessageCard key={message.id} message={message} />
                ))}
            </ul>

            <form onSubmit={handleSubmit}>
                <input
                    value={inputValue}
                    onChange={handleInputChange}
                    className="w-full p-3 focus-visible:outline-gray-300 rounded shadow-xl focus:shadow-2xl transition-all"
                    placeholder="随便说点什么..."
                />
            </form>
        </div>
    );
};
export default Chat;
