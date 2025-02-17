export class StreamingTextResponse extends Response {
    constructor(res: ReadableStream, init?: ResponseInit) {
        super(res as never, {
            ...init,
            status: 200,
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                ...init?.headers,
            },
        });
    }
}