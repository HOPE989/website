import {FC} from "react";
import Link from "next/link";
import {ArrowLeft} from "lucide-react";
import Image from "next/image";
import {getBlogPost} from "@/sanity/queries";
import {notFound} from "next/navigation";
import BlogPostPage from "@/components/BlogPostPage";

interface Props {
    params:{
        slug: string,
    }
}

export const generateMetadata = async ({ params }: Props) => {
    //Error: Route "/blog/[slug]" used `params.slug`. `params` should be awaited before using its properties.
    // Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis
    const { slug } =await params;
    const post = await getBlogPost(slug);
    if (!post) {
        notFound()
    }

    const { title, description, mainImage } = post

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [
                {
                    url: mainImage.asset.url,
                },
            ],
            type: 'article',
        },
        twitter: {
            images: [
                {
                    url: mainImage.asset.url,
                },
            ],
            title,
            description,
            card: 'summary_large_image',
            site: '@EchengHop',
            creator: '@EchengHop',
        },
    }
}

const Blog: FC<Props> = async ({
    params
}) => {
    const { slug } = await params
    const post = await getBlogPost(slug)
    if (!post) {
        notFound()
    }

    //todo
    //add redis
    let views = 30578

     //todo
    let reactions = Array.from({ length: 4 }, () =>
        Math.floor(Math.random() * 50000)
    )

    //todo
    let relatedViews: number[] = []
    if (typeof post.related !== 'undefined' && post.related.length > 0) {
        relatedViews = post.related.map(() => Math.floor(Math.random() * 1000))
    }

    return (
        <BlogPostPage
            post={post}
            views={views}
            relatedViews={relatedViews}
            reactions={reactions.length > 0 ? reactions : undefined}
        />
  )
}

export default Blog;

export const revalidate = 60