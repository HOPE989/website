import MotionDivWrapper from "@/components/MotionDivWrapper";
import Hero from "@/components/Hero";
import SkillsBar from "@/components/SkillsBar";

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
          <div>
            最近更新
          </div>

          <aside className="lg:w-[680px] w-full lg:sticky lg:h-fit lg:-top-10 flex flex-col gap-12 rounded-2xl">
            <SkillsBar />
          </aside>
        </div>
      </section>
    </MotionDivWrapper>
  );
}
