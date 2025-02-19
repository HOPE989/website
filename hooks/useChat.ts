import {useEffect, useId, useRef, useState} from "react";
import useSWR from "swr";
import {nanoid} from "nanoid";
import useSWRMutation from "swr/mutation";

export type Message = {
    id: string;
    createdAt?: Date;
    content: string;
    role: 'system' | 'user' | 'assistant';
};

export type CreateMessage = {
    id?: string;
    createdAt?: Date;
    content: string;
    role: 'system' | 'user' | 'assistant';
};

export function useChat({
    api = "api/chat",
    id,
    initialInput = '',
    initialMessages = [],
}: {
    // 指定聊天功能的API地址，默认为'/api/chat'
    api?: string;

    // 指定聊天的唯一标识符，如果没有指定，则使用useId生成一个唯一的Hook ID
    id?: string;

    // 消息列表初始化内容，默认为空数组
    initialMessages?: Message[];

    // 输入框的初始内容，默认为空字符串
    initialInput?: string;
}) {
    const hookId = useId()
    const chatId = id || hookId

    const { data, mutate } = useSWR<Message[]>([api, chatId], null, {
        fallbackData: initialMessages,
    });
    const messages = data!;

    // 用 ref 保存最新的消息列表
    const messagesRef = useRef<Message[]>(messages);
    useEffect(() => {
        messagesRef.current = messages;
    }, [messages]);

    const [input, setInput] = useState(initialInput);

    const { trigger } = useSWRMutation<
        string | null,
        any,
        [string, string],
        Message[]
    >(
        [api, chatId],
        async (_, { arg: messagesSnapshot }) => {
            try {
                const previousMessages = messagesRef.current;
                mutate(messagesSnapshot, false);

                const body = messagesSnapshot.map(({ role, content }) => ({
                    role,
                    content,
                }))

                const res = await fetch(api, {
                    method: "GET",
                    // body: JSON.stringify({messages: body}),
                }).catch((error) => {
                    // 如果报错了，回退到上一次的消息列表
                    mutate(previousMessages, false);
                    throw error;
                })

                if (!res.ok) {
                    // 如果接口请求不成功，回退到上一次的消息列表
                    mutate(previousMessages, false);
                    throw new Error(
                        (await res.text()) || 'Faild to fetch the chat response.'
                    );
                }

                // body为空，直接报错
                if (!res.body) {
                    throw new Error('The response body is empty.');
                }

                const createdAt = new Date();
                const replyId = nanoid();
                const data = await res.json()

                mutate([...messagesSnapshot, {
                    id: replyId,
                    createdAt: createdAt,
                    content: data.message,
                    role: 'assistant',
                }], false)

                return data.message;
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        {
            revalidate: false,
        }
    )

    const append = async (message: Message | CreateMessage) => {
        if(!message.id){
            message.id = nanoid();
        }
        await trigger(messagesRef.current.concat(message as Message))
    }

    return {
        messages,
        input,
        setInput,
        append,
    }
}