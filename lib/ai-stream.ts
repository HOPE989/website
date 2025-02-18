export function createCallbacksTransformer() {
    const encoder = new TextEncoder();

    return new TransformStream<string, Uint8Array>({
        async transform(message, controller): Promise<void> {
            controller.enqueue(encoder.encode(message));
        },
    });
}

export function AIStream(res: Response): ReadableStream {
    if (!res.ok) {
        throw new Error(
            `Failed to convert the response to stream. Received status code: ${res.status}.`
        );
    }

    const stream =
        res.body ||
        new ReadableStream({
            start(controller) {
                controller.close();
            },
        });

    return stream;
    // .pipeThrough(createCallbacksTransformer);
}
