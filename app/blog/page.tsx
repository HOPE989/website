import MotionDivWrapper from "@/components/MotionDivWrapper";
import Description from "@/components/Description";
import BlogPosts from "@/components/BlogPosts";
import {FC} from "react";

const Blog:FC= () => {

    return (
        <MotionDivWrapper
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 2}}
            className="flex flex-col gap-10"
        >
            <Description page="Blog" description=""/>
            <BlogPosts limit={20}/>
        </MotionDivWrapper>
    )
}

export default Blog;