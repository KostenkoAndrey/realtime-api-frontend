import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = new URL(req.url);
  const pathname = url.pathname;

  if (pathname === '/confirm-google-auth') {
    const code = url.searchParams.get('code');
    if (code) {
      const backendUrl = `https://realtime-api-backend-production.up.railway.app/confirm-google-auth?code=${code}`;
      return NextResponse.redirect(backendUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/confirm-google-auth'],
};
