import { NextResponse } from 'next/server';
import {SSEResponseModel} from "tencentcloud-sdk-nodejs-common/tencentcloud/common/sse_response_model";
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

const params = {
    Model: 'deepseek-r1',
    Messages: [
        {
            Role: 'user',
            Content: '9.9和9.11谁大？',
        },
    ],
    Stream: true,
};

// API 处理函数
export async function POST(req: Request) {
    let reasoningContent = ""; // 定义完整思考过程
    let answerContent = ""; // 定义完整回复
    let isAnswering = false; // 判断是否结束思考过程并开始回复

    // 获取腾讯云 LKEAP 客户端
    const LkeapClient = tencentcloud.lkeap.v20240522.Client;
    const client = new LkeapClient(clientConfig);

    // 获取流式数据
    const res: SSEResponseModel = await client.ChatCompletions(params);

    for await (const { data } of res) {
        let chunk
        if (data !== "[DONE]"){
            chunk = JSON.parse(data);
        }else {
            process.stdout.write("/n");
        }

        if (!chunk?.Choices?.length) {
            continue;
        }

        const delta = chunk.Choices[0].Delta;

        // 处理空内容情况
        if (!delta.ReasoningContent && !delta.Content) {
            continue;
        }

        // 处理开始回答的情况
        if (!delta.ReasoningContent && !isAnswering) {
            console.log("\n" + "=".repeat(20) + "完整回复" + "=".repeat(20) + "\n");
            isAnswering = true;
        }

        // 处理思考过程
        if (delta.ReasoningContent) {
            process.stdout.write(delta.ReasoningContent);
            reasoningContent += delta.ReasoningContent;
        }
        // 处理回复内容
        else if (delta.Content) {
            process.stdout.write(delta.Content);
            answerContent += delta.Content;
        }
    }

    // 返回响应
    return NextResponse.json({
        message: answerContent,
    });
}

export async function GET(req: Request) {
    const res = "\\n\\n9.9比9.11大。\\n\\n**详细解释：**\\n1. **整数部分相同**：两个数的整数部分均为9，因此需要比较小数部分。\\n2. **对齐小数位数**：将9.9写为9.90，使其与9.11的小数位数一致。\\n3. **逐位比较小数部分**：\\n   - 第一位小数：9（来自9.90）> 1（来自9.11），因此无需比较后续位数。\\n4. **结论**：9.90（即9.9）> 9.11。\\n\\n**关键点**：小数比较时，若整数部分相同，需逐位对比小数部分，高位数字更大者整体数值更大。"
    return NextResponse.json({
        message: res,
    })
}
