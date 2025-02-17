import { type NextRequest } from 'next/server'
import {ipAddress} from "@vercel/functions";

export function getIP(request: Request | NextRequest): string {
  if ('ip' in request && request.ip) {
    return ipAddress(request) || ""
  }

  const xff = request.headers.get('x-forwarded-for')
  if (xff === '::1') {
    return '127.0.0.1'
  }

  return xff?.split(',')?.[0] ?? '127.0.0.1'
}
