import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import {getSettings} from "@/sanity/queries";
import {urlFor} from "@/sanity/lib/image";

export default async function Projects() {
    const projects = (await getSettings())?.projects || []

    return (
        <section>
            <ul className="grid w-full grid-cols-1 gap-5 mx-auto sm:grid-cols-2 xl:grid-cols-3">
                {projects.map((project) => (
                    <li key={project._id}>
                        <Link href={project.url} target="_blank">
                            <div className="relative flex flex-col items-start justify-center gap-6 p-5 border-dashed border-[0.8px] border-transparent rounded-2xl hover:border-muted-foreground hover:bg-muted">
                                <div className="relative flex items-center justify-center w-12 h-12 shadow-[0_0px_3px_rgb(180,180,180)] rounded-full ">
                                    <Image
                                        src={urlFor(project.icon)?.size(100, 100).auto('format').url()}
                                        alt="Project image"
                                        width={36}
                                        height={36}
                                        className="object-contain "
                                    />
                                </div>

                                <div>
                                    <h2 className="mb-4 font-semibold">{project.name}</h2>
                                    <p className="text-sm font-light text-muted-foreground">
                                        {project.description}
                                    </p>
                                </div>

                                <div className="flex items-center justify-center gap-2 text-sm">
                                    <p>{new URL(project.url).host}</p>
                                    <ExternalLink className="size-4" />
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}
