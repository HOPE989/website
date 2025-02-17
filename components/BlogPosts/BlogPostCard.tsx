import React, { FC } from "react";
import Link from "next/link";
import { Post } from "@/sanity/schemaTypes/postType";
import Image from "next/image";
import { BookOpenText, CalendarIcon, MousePointerClickIcon, Tag } from "lucide-react";
import dayjs from "dayjs";

interface Props {
    post: Post;
    views: number;
}

const BlogPostCard: FC<Props> = ({ post, views }) => {
    const { title, slug, mainImage, publishedAt, categories, readingTime } = post;

    return (
        <Link
            href={`/blog/${slug}`}
            prefetch={false}
            className="group relative flex w-full transform-gpu flex-col rounded-3xl bg-transparent ring-2 ring-zinc-800 transition-transform hover:-translate-y-0.5"
            style={{
                '--post-image-fg': mainImage.asset.dominant?.foreground,
                '--post-image-bg': mainImage.asset.dominant?.background,
                '--post-image': `url(${mainImage.asset.url})`,
            } as React.CSSProperties}
        >
            <div className="relative aspect-[240/135]">
                <Image
                    src={mainImage.asset.url}
                    alt="Blog Post Image"
                    className="rounded-t-3xl object-cover brightness-50"
                    placeholder="blur"
                    blurDataURL={mainImage.asset.lqip}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                />
            </div>

            <span className="relative z-10 flex w-full flex-1 shrink-0 flex-col justify-between gap-0.5 rounded-b-[calc(1.5rem+1px)] bg-cover bg-bottom bg-no-repeat p-4 bg-blend-overlay [background-image:var(--post-image)] before:pointer-events-none before:absolute before:inset-0 before:z-10 before:select-none before:rounded-b-[calc(1.5rem-1px)] before:bg-zinc-900 before:opacity-80 before:transition-opacity after:pointer-events-none after:absolute after:inset-0 after:z-10 after:select-none after:rounded-b-[calc(1.5rem-1px)] after:bg-gradient-to-b after:from-transparent after:to-zinc-900 after:backdrop-blur after:transition-opacity group-hover:before:opacity-30 md:p-5">
                <h2 className="z-20 text-base font-bold tracking-tight text-white opacity-70 transition-opacity group-hover:opacity-100 md:text-xl">
                    {title}
                </h2>

                <span className="relative z-20 flex items-center justify-between opacity-50 transition-opacity group-hover:opacity-80">
                    <span className="inline-flex items-center space-x-3">
                        <span className="inline-flex items-center space-x-1 text-xs font-medium text-white md:text-sm">
                            <CalendarIcon />
                            <span>
                                {dayjs(new Date(publishedAt))?.format('YYYY-MM-DD')}
                            </span>
                        </span>

                        {Array.isArray(categories) && (
                            <span className="inline-flex items-center space-x-1 text-xs font-medium text-white md:text-sm">
                                <Tag />
                                <span>{categories.join(', ')}</span>
                            </span>
                        )}
                    </span>

                    <span className="inline-flex items-center space-x-3 text-xs font-medium text-white md:text-xs">
                        <span className="inline-flex items-center space-x-1">
                            <MousePointerClickIcon />
                            <span>{views}</span>
                        </span>

                        <span className="inline-flex items-center space-x-1">
                            <BookOpenText />
                            <span>{readingTime.toFixed(0) === "0" ? "1" : readingTime.toFixed(0)}分钟阅读</span>
                        </span>
                    </span>
                </span>
            </span>
        </Link>
    );
};

export default BlogPostCard;
