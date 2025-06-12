


interface Content {
    type: 'document' | 'tweet' | 'youtube' | 'link';
    link: string;
    title: string;
    tags: string[];
    content?: string;
}

export default function EditContentDialog({ content }: { content: Content }) {
    return (
        <div>EditContentDialog</div>
    )
}
