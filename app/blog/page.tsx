import MotionDivWrapper from "@/components/MotionDivWrapper";
import Description from "@/components/Description";

export default function Blog() {

    return (
        <MotionDivWrapper
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 2}}
            className="flex flex-col gap-10"
        >
            <Description page="Blog" description=""/>
        </MotionDivWrapper>
    )
}