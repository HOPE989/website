import BlogPostCard from "@/components/BlogPosts/BlogPostCard";
import {getLatestBlogPosts} from "@/sanity/queries";
import {kvKeys} from "@/config/kv";

const BlogPosts = async ({ limit=5 }) => {
    const posts = await getLatestBlogPosts({ limit, forDisplay: true }) || []
    const postIdKeys = posts.map(({ _id }) => kvKeys.postViews(_id))

    let views: number[] = []
    //todo
    //this is dev mode
    views = posts.map(() => Math.floor(Math.random() * 1000))


    return (
        <>
            {posts.map((post, idx) => (
                <BlogPostCard post={post} views={views[idx] ?? 0} key={post._id} />
            ))}
        </>
    )
}

export default BlogPosts;
