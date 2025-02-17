import BlogPostCard from "@/components/BlogPosts/BlogPostCard";
import {getLatestBlogPosts} from "@/sanity/queries";
import {kvKeys} from "@/config/kv";
import {env} from "std-env";
import {redis} from "@/lib/redis";

const BlogPosts = async ({ limit=5 }) => {
    const posts = await getLatestBlogPosts({ limit, forDisplay: true }) || []
    const postIdKeys = posts.map(({ _id }) => kvKeys.postViews(_id))

    let views: number[] = []
    console.log(env.VERCEL_ENV)
    if (env.VERCEL_ENV === 'production') {
        if (postIdKeys.length > 0) {
            views = await redis.mget<number[]>(...postIdKeys)
        }
    } else {
        views = posts.map(() => Math.floor(Math.random() * 1000))
    }

    return (
        <>
            {posts.map((post, idx) => (
                <BlogPostCard post={post} views={views[idx] ?? 0} key={post._id} />
            ))}
        </>
    )
}

export default BlogPosts;
