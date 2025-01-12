import MotionDivWrapper from "@/components/MotionDivWrapper";
import Hero from "@/components/Hero";

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
    </MotionDivWrapper>
  );
}
