"use client"

import { motion, MotionProps } from "framer-motion";
import { ReactNode } from "react";

interface MotionDivWrapperProps extends MotionProps {
    children: ReactNode;
}

export default function MotionDivWrapper({ children, ...props }: MotionDivWrapperProps) {
    return (
        <motion.div { ...props } >
            {children}
        </motion.div>
    )
}