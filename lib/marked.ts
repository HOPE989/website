import { marked } from 'marked';

export const markdownToHTML = (markdown: string) => {
    if (!markdown || typeof markdown !== 'string') {
        return '';
    }

    const formattedInput = markdown.replace(/\\n/g, '\n');

    return marked.parse(formattedInput);
};