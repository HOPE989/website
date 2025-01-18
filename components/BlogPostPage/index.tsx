"use client"

import {FC} from "react";
import {PostDetail} from "@/sanity/schemaTypes/postType";
import Link from "next/link";
import {ArrowLeft, BookOpenText, CalendarIcon, MousePointerClickIcon} from "lucide-react";
import Image from "next/image";
import BlogPostTableOfContents from "@/components/BlogPostPage/BlogPostTableOfContents";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import {TagIcon} from "@sanity/icons";
import Balancer from "react-wrap-balancer";
import {PortableText} from "@portabletext/react";

interface Props {
    post: PostDetail
    views?: number
    reactions?: number[]
    relatedViews: number[]
}

const BlogPostsPage:FC<Props> = ({
    post,
    views,
    reactions,
    relatedViews
}) => {
    console.log(post.body)

    return (
        <section className="mt-16 lg:mt-32">
            <div className="w-full md:flex md:justify-between xl:relative">
                <aside className="hidden w-[160px] shrink-0 lg:block">
                    <div className="sticky top-2 pt-20">
                        <BlogPostTableOfContents headings={post.headings} />
                    </div>
                </aside>
                <div className="max-w-2xl md:flex-1 md:shrink-0">
                    <Link
                        href="/blog"
                        className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full border shadow-md shadow-zinc-800/5 border-zinc-700/50 bg-zinc-800 ring-0 ring-white/10 hover:border-zinc-700 hover:ring-white/20 lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0"
                    >
                        <ArrowLeft className="w-5 h-5"/>
                    </Link>

                    <article data-postid={post._id}>
                        <header className="relative flex flex-col items-center pb-5 after:absolute after:-bottom-1 after:block after:h-px after:w-full after:rounded after:bg-gradient-to-r after:from-zinc-400/20 after:via-zinc-200/10 after:to-transparent dark:after:from-zinc-600/20 dark:after:via-zinc-700/10">
                            <motion.div
                                className="relative mb-7 aspect-[240/135] w-full md:mb-12 md:w-[120%]"
                                initial={{opacity: 0, scale: 0.96, y: 10}}
                                animate={{opacity: 1, scale: 1, y: 0}}
                                transition={{
                                    duration: 0.35,
                                    type: 'spring',
                                    stiffness: 120,
                                    damping: 20,
                                }}
                            >
                                <div
                                    className="absolute z-0 hidden aspect-[240/135] w-full blur-xl saturate-150 after:absolute after:inset-0 after:hidden after:bg-white/50 dark:after:bg-black/50 md:block md:after:block">
                                    <Image
                                        src={post.mainImage.asset.url}
                                        alt=""
                                        className="select-none"
                                        unoptimized
                                        fill
                                        aria-hidden={true}
                                    />
                                </div>
                                <Image
                                    src={post.mainImage.asset.url}
                                    alt={post.title}
                                    className="select-none rounded-2xl ring-1 ring-zinc-900/5 transition dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20 md:rounded-3xl"
                                    placeholder="blur"
                                    blurDataURL={post.mainImage.asset.lqip}
                                    unoptimized
                                    fill
                                />
                            </motion.div>
                            <motion.div
                                className="flex w-full items-center space-x-4 text-sm font-medium text-zinc-600/80 dark:text-zinc-400/80"
                                initial={{opacity: 0, y: 10}}
                                animate={{opacity: 1, y: 0}}
                                transition={{
                                    duration: 0.15,
                                    type: 'spring',
                                    stiffness: 150,
                                    damping: 20,
                                    delay: 0.1,
                                }}
                            >
                                <time
                                    dateTime={post.publishedAt}
                                    className="flex items-center space-x-1.5"
                                >
                                    <CalendarIcon/>
                                    <span>
                                    {
                                        dayjs(new Date(post.publishedAt))?.format('YYYY-MM-DD')
                                    }
                                </span>
                                </time>
                                <span className="inline-flex items-center space-x-1.5">
                                  <TagIcon/>
                                  <span>{post.categories?.join(', ')}</span>
                            </span>
                            </motion.div>
                            <motion.h1
                                className="mt-6 w-full text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl"
                                initial={{opacity: 0, y: 8}}
                                animate={{opacity: 1, y: 0}}
                                transition={{
                                    duration: 0.2,
                                    type: 'spring',
                                    stiffness: 150,
                                    damping: 30,
                                    delay: 0.2,
                                }}
                            >
                                <Balancer>{post.title}</Balancer>
                            </motion.h1>
                            <motion.p
                                className="my-5 w-full text-sm font-medium text-zinc-500"
                                initial={{opacity: 0, y: 8}}
                                animate={{opacity: 1, y: 0}}
                                transition={{
                                    duration: 0.2,
                                    type: 'spring',
                                    stiffness: 150,
                                    damping: 20,
                                    delay: 0.23,
                                }}
                            >
                                {post.description}
                            </motion.p>
                            <motion.div
                                className="flex w-full items-center space-x-4 text-sm font-medium text-zinc-700/50 dark:text-zinc-300/50"
                                initial={{opacity: 0, y: 5}}
                                animate={{opacity: 1, y: 0}}
                                transition={{
                                    duration: 0.15,
                                    type: 'spring',
                                    stiffness: 150,
                                    damping: 20,
                                    delay: 0.255,
                                }}
                            >
                            <span
                                className="inline-flex items-center space-x-1.5"
                                title={views?.toString()}
                            >
                                <MousePointerClickIcon/>
                                <span>{views}次点击</span>
                            </span>

                            <span className="inline-flex items-center space-x-1.5">
                                <BookOpenText/>
                                <span>{post.readingTime.toFixed(0)}分钟阅读</span>
                            </span>
                            </motion.div>
                        </header>

                        <div className="mt-8 prose-invert">
                            <PortableText value={post.body} />
                        </div>
                    </article>
                </div>

            </div>
        </section>
    )
}

export default BlogPostsPage;