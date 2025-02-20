"use client"
import MessageCard from "@/components/MessageCard";
import {useChat} from "@/hooks/useChat";
import {ChangeEvent, FormEvent} from "react";
import MotionDivWrapper from "@/components/MotionDivWrapper";
import Description from "@/components/Description";

export type Message = {
    id: string;
    createdAt?: Date;
    content: string;
    role: 'system' | 'user' | 'assistant';
};

const Chat = () => {
    const {
        messages,
        input,
        setInput,
        append,
    } = useChat({})

    const handleInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
      setInput(e.target.value);
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!input) {
            return;
        }

        append({
            content: input,
            role: 'user',
            createdAt: new Date(),
        })

        setInput("")
    }

    return (
        <MotionDivWrapper
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="flex flex-col gap-10 relative h-full w-full"
        >
            <Description page="Chat" description=""/>
            <ul className="flex-grow space-y-4">
                {messages.map((message) => (
                    <MessageCard key={message.id} message={message} />
                ))}
            </ul>

            <div className="w-full">
                <div className="p-4 rounded-3xl bg-[#303030]">
                    <form onSubmit={handleSubmit} className="flex space-x-2">
                        <input
                            value={input}
                            onChange={handleInputChange}
                            className="w-full p-2 rounded bg-[#303030] focus: outline-none"
                            placeholder="随便说点什么..."
                        />
                    </form>
                </div>
            </div>
        </MotionDivWrapper>
    );
};
export default Chat;
