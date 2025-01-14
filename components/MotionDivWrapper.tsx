"use client"

import { motion, MotionProps } from "framer-motion";
import {HTMLAttributes, ReactNode} from "react";

interface MotionDivWrapperProps extends Omit<HTMLAttributes<HTMLDivElement>, keyof MotionProps>, MotionProps {
    children: ReactNode;
}

export default function MotionDivWrapper({ children, ...props }: MotionDivWrapperProps) {
    return (
        <motion.div { ...props } >
            {children}
        </motion.div>
    )
}