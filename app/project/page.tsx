import Projects from "@/components/Projects";

import Description from "@/components/Description";
import MotionDivWrapper from "@/components/MotionDivWrapper";

export default function ProjectPage() {

  return (
    <MotionDivWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="flex flex-col gap-10"
    >
      <Description page="Projects" description="Projects"/>
      <Projects />
    </MotionDivWrapper>
  );
}
