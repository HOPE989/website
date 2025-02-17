import { clerkMiddleware } from '@clerk/nextjs/server'
import {type NextRequest, NextResponse} from "next/server";
import {geolocation} from "@vercel/functions";
import {get} from "@vercel/edge-config";
import {getIP} from "@/lib/ip";
import countries from "@/lib/countries.json";
import {redis} from "@/lib/redis";
import {kvKeys} from "@/config/kv";

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
}

export default clerkMiddleware(
    async (auth, req: NextRequest) => {
        const { nextUrl } = req
        const geo = geolocation(req)
        const isApi = nextUrl.pathname.startsWith('/api/')

        if (process.env.EDGE_CONFIG) {
            const blockedIPs = await get<string[]>('blocked_ips')
            const ip = getIP(req)

            if (blockedIPs?.includes(ip)) {
                if (isApi) {
                    return NextResponse.json(
                        { error: 'You have been blocked.' },
                        { status: 403 }
                    )
                }

                nextUrl.pathname = '/blocked'
                return NextResponse.rewrite(nextUrl)
            }

            if (nextUrl.pathname === '/blocked') {
                nextUrl.pathname = '/'
                return NextResponse.redirect(nextUrl)
            }
        }

        if (geo && !isApi && process.env.VERCEL_ENV === 'production') {
            const country = geo.country
            const city = geo.city

            const countryInfo = countries.find((x) => x.cca2 === country)
            if (countryInfo) {
                const flag = countryInfo.flag
                await redis.set(kvKeys.currentVisitor, { country, city, flag })
            }
        }
        return NextResponse.next()
    }
)