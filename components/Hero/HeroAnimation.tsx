"use client"

import {useEffect, useState} from "react";

export default function HeroAnimation({ text1, text2, speed=100 }: { text1: string, text2: string, speed?: number }) {
    const [displayText, setDisplayText] = useState<string>(text1)
    const [showCursor, setShowCursor] = useState<boolean>(true)
    const [typeStatus, setTypeStatus] = useState<"typing" | "deleting">("typing")
    const [currIdx, setCurrIdx] = useState<number>(text1.length)
    const [isText1, setIsText1] = useState<boolean>(true)

    useEffect(() => {
        const currentText = isText1 ? text1 : text2;

        const timeout = setTimeout(() => {
            if (typeStatus === "typing" && currIdx < currentText.length) {
                setDisplayText(displayText + currentText[currIdx]);
                setCurrIdx(currIdx + 1);
            } else if (typeStatus === "deleting" && currIdx > 0) {
                setDisplayText(displayText.slice(0, -1));
                setCurrIdx(currIdx - 1);
            } else if (typeStatus === "typing" && currIdx === currentText.length) {
                setTimeout(() => setTypeStatus("deleting"), 2000);
            } else if (typeStatus === "deleting" && currIdx === 0) {
                setTimeout(() => {
                    setIsText1(!isText1);
                    setTypeStatus("typing");
                }, 500);
            }
        }, speed);

        return () => clearTimeout(timeout);
    }, [currIdx, typeStatus, speed, isText1, displayText, text1, text2]);

    //设置竖线闪烁
    useEffect(() => {
        const interval = setInterval(() => {
            setShowCursor((prev) => !prev)
        }, 500)
        return () => {clearInterval(interval)}
    }, [typeStatus])

    return (
        <p className="text-3xl sm:text-5xl">
            <span className="text-transparent sm:bg-gradient-to-r to-foreground bg-gradient-to-t to-70% from-muted-foreground bg-clip-text font-semibold">
                {displayText}
            </span>
            <span className={`${showCursor ? "text-muted-foreground" : "hidden"}`}>
                |
            </span>
        </p>
    )
}