import React from "react";

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html>
            <body>
                <header>header</header>
                <main>{children}</main>
                <footer>footer</footer>
            </body>
        </html>
    );
}
