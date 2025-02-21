"use client"
import MessageCard from "@/components/MessageCard";
import {useChat} from "@/hooks/useChat";
import {ChangeEvent, FormEvent, useEffect, useRef} from "react";
import MotionDivWrapper from "@/components/MotionDivWrapper";
import Description from "@/components/Description";
import { useClerk } from "@clerk/nextjs";

export type Message = {
    id: string;
    createdAt?: Date;
    content: string;
    role: 'system' | 'user' | 'assistant';
};

const Chat = () => {
    const { openSignIn, user } = useClerk()
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const {
        messages,
        input,
        setInput,
        append,
    } = useChat({})

    useEffect(() => {
        textareaRef.current!.addEventListener("keydown", e => {
            if (e.key == "Enter" && !e.shiftKey) {
                e.preventDefault();
                textareaRef.current!.form!.dispatchEvent(
                    new Event("submit", {bubbles: true, cancelable: true})
                )
            }
        })
    }, [])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
      setInput(e.target.value);
      const textarea = e.target;
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!input) {
            return;
        }

        if (!user) {
            openSignIn();
            return;

        }

        await append({
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
                        <textarea
                            ref={textareaRef}
                            value={input}
                            onChange={handleInputChange}
                            className="resize-none max-h-52 scrollbar scrollbar-thumb-muted-foreground scrollbar-track-muted w-full p-2 rounded bg-[#303030] focus: outline-none"
                            placeholder="随便说点什么..."
                            rows={1}
                        />
                    </form>
                </div>
            </div>
        </MotionDivWrapper>
    );
};
export default Chat;
