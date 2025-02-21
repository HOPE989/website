import { NextResponse } from 'next/server';
const tencentcloud = require("tencentcloud-sdk-nodejs-lkeap");

const clientConfig = {
    credential: {
        secretId: process.env.TENCENT_CLOUD_SECRET_ID,
        secretKey: process.env.TENCENT_CLOUD_SECRET_KEY,
    },
    region: 'ap-guangzhou',
    profile: {
        httpProfile: {
            endpoint: 'lkeap.tencentcloudapi.com',
        },
    },
};

export async function POST(req: Request) {
    const { messages } = await req.json();

    try {
        const LkeapClient = tencentcloud.lkeap.v20240522.Client;
        const client = new LkeapClient(clientConfig);

        const params = {
            Model: "deepseek-r1",
            Messages: messages.map((message: any) => ({
                Content: message.content,
                Role: message.role,
            })),
            Stream: true,
        };

        const res = await client.ChatCompletions(params);

        const encoder = new TextEncoder();

        const stream = new ReadableStream({
            async start(controller) {
                let isAnswering = false;

                try {
                    for await (const { data } of res) {
                        if (data === "[DONE]") {
                            break;
                        }

                        let chunk;
                        try {
                            chunk = JSON.parse(data);
                        } catch (err) {
                            console.error("解析 JSON 失败:", err);
                            continue;
                        }

                        if (!chunk?.Choices?.length) {
                            continue;
                        }

                        const delta = chunk.Choices[0].Delta;

                        if (!delta.ReasoningContent && !delta.Content) {
                            continue;
                        }

                        if (!delta.ReasoningContent && !isAnswering) {
                            isAnswering = true;
                            console.log("\n" + "=".repeat(20) + "完整回复" + "=".repeat(20) + "\n");
                        }

                        if (delta.ReasoningContent) {
                            process.stdout.write(delta.ReasoningContent);
                            controller.enqueue(encoder.encode("__SYSTEM_LOADING__"));
                        }

                        if (delta.Content) {
                            process.stdout.write(delta.Content);
                            controller.enqueue(encoder.encode(delta.Content));
                        }
                    }
                } catch (err) {
                    console.error("流处理失败:", err);
                    controller.enqueue(encoder.encode("data: 服务器错误\n\n"));
                } finally {
                    controller.close();
                }
            },
        });

        return new Response(stream, {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
                "Transfer-Encoding": "chunked",
            },
        });
    } catch (error) {
        console.error("请求失败:", error);
        return NextResponse.json({ error: "请求失败" }, { status: 500 });
    }
}

export async function GET() {
    const res = "\\n\\n9.9比9.11大。\\n\\n**详细解释：**\\n1. **整数部分相同**：两个数的整数部分均为9，因此需要比较小数部分。\\n2. **对齐小数位数**：将9.9写为9.90，使其与9.11的小数位数一致。\\n3. **逐位比较小数部分**：\\n   - 第一位小数：9（来自9.90）> 1（来自9.11），因此无需比较后续位数。\\n4. **结论**：9.90（即9.9）> 9.11。\\n\\n**关键点**：小数比较时，若整数部分相同，需逐位对比小数部分，高位数字更大者整体数值更大。"
    return NextResponse.json({
        message: res,
    })
}