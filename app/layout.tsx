import "./globals.css"
import React from "react";
import Header from "@/components/Header";
import { Roboto_Mono } from "next/font/google"
import Footer from "@/components/Footer";
import MainWrapper from "@/components/MainWrapper";
import {ClerkProvider} from "@clerk/nextjs";
import {dark} from "@clerk/themes";

const roboto_mono = Roboto_Mono({ subsets: ["latin"] });

const localization = {
    signUp: {
        start: {
            title: "Sign Up",
            subtitle: "Create an account",
        },
    },
    signIn: {
        start: {
            title: "Welcome Back",
            subtitle: "Sign in to zephrlin.me",
        },
    },
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html
            lang="en"
            className="scrollbar-thin scrollbar-thumb-muted-foreground scrollbar-track-muted"
        >
        <ClerkProvider
            appearance={{
                baseTheme: dark,
            }}
            localization={localization}
        >
            <body className={`${roboto_mono.className} bg-bg-image`}>
                <div
                    className="flex flex-col items-center px-4 pt-10 mx-auto max-w-4xl lg:max-w-5xl sm:px-12 md:px-20 lg:px-12 xl:max-w-7xl min-h-svh">
                    <Header/>
                    <MainWrapper>{children}</MainWrapper>
                    <Footer/>
                </div>
            </body>
        </ClerkProvider>
        </html>
    );
}
