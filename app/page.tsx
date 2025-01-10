import MotionDivWrapper from "@/components/MotionDivWrapper";

export default function Home() {
  return (
    <MotionDivWrapper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
    >
      hello!
    </MotionDivWrapper>
  );
}
