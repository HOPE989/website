import MotionDivWrapper from "@/components/MotionDivWrapper";
import Hero from "@/components/Hero";
import SkillsBar from "@/components/SkillsBar";
import {Newspaper} from "lucide-react";
import RecentUpdate from "@/components/RecentUpdate";

export default function Home() {
  return (
    <MotionDivWrapper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
    >
      <section>
        <Hero />
      </section>

      <section className="relative flex flex-col justify-between w-full gap-10 lg:flex-row">
        <div className="w-full">
          <RecentUpdate />
        </div>
        <aside className="lg:w-[680px] w-full lg:sticky lg:h-fit lg:-top-10 flex flex-col gap-12 rounded-2xl">
          <div className="mt-16" />
          <SkillsBar />
        </aside>
      </section>
    </MotionDivWrapper>
  );
}
