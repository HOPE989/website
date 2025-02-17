import {AIStream} from "@/lib/ai-stream";
import {StreamingTextResponse} from "@/lib/streaming-text-response";
import tencentcloud from "tencentcloud-sdk-nodejs-lkeap"
import {
    ChatCompletionsResponse
} from "tencentcloud-sdk-nodejs-lkeap/tencentcloud/services/lkeap/v20240522/lkeap_models";

const LkeapClient = tencentcloud.lkeap.v20240522.Client;

const clientConfig = {
    credential: {
        secretId: process.env.TENCENT_CLOUD_SECRET_ID,
        secretKey: process.env.TENCENT_CLOUD_SECRET_KEY,
    },
    region: "ap-guangzhou",
    profile: {
        httpProfile: {
            endpoint: "lkeap.tencentcloudapi.com",
        },
    },
};
const client = new LkeapClient(clientConfig);

export const runtime = 'edge';

export async function POST(req: Request) {
    // 获得请求参数
    const { messages } = await req.json();

    client.ChatCompletions({
        Model: "deepseek-r1",
        Messages: messages.map((message: any) => ({
            content: message.content,
            role: message.role,
        })),
        Stream: true
    }).then(
        async (res: any) => {
            res.on("message", (message: any) => {
                console.log(message)
            })
        }
    )


    console.log(response)

    // 将 response 传递给 AIStream 进行处理
    const stream = AIStream(response);
    return new StreamingTextResponse(stream);
}

