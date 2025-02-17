import {FC} from "react";
import {getBlogPost} from "@/sanity/queries";
import {notFound} from "next/navigation";
import BlogPostPage from "@/components/BlogPostPage";
import {env} from "@/env.mjs";
import {redis} from "@/lib/redis";
import {kvKeys} from "@/config/kv";

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

    let views: number
    if (env.VERCEL_ENV === 'production') {
        views = await redis.incr(kvKeys.postViews(post._id))
    } else {
        views = 30578
    }

    return (
        <BlogPostPage
            post={post}
            views={views}
        />
  )
}

export default Blog;

export const revalidate = 60