import {FC} from "react";
import {Newspaper} from "lucide-react";
import BlogPosts from "@/components/BlogPosts";

const RecentUpdate: FC = () => {
  return (
      <div className={"mt-10"}>
        <div className="flex items-center justify-start w-full gap-3 mb-10">
          <Newspaper/>
          <span className="text-lg font-semibold">最近更新</span>
        </div>
          <div className={"flex flex-col gap-10"}>
            <BlogPosts />
          </div>
      </div>
  )
}

export default RecentUpdate