import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Force Node.js runtime to avoid Edge Runtime issues with NextAuth
export const runtime = 'nodejs';

// Define routes directly to avoid import issues
const PUBLIC_ROUTES = ['/', '/login', '/register', '/about'];

const PROTECTED_ROUTES = ['/dashboard', '/profile', '/settings'];

export default async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;

  // Skip middleware for system routes and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.endsWith('.ico') ||
    pathname.endsWith('.png') ||
    pathname.endsWith('.jpg') ||
    pathname.endsWith('.svg')
  ) {
    return NextResponse.next();
  }

  // Check if route is public
  const isPublicRoute = PUBLIC_ROUTES.some(route => {
    if (route === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(route);
  });

  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Check if route is protected
  const isProtectedRoute = PROTECTED_ROUTES.some(route =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    // Use cookie-based authentication instead of getToken
    // This works better in Edge Runtime
    const sessionCookie =
      req.cookies.get('next-auth.session-token') ||
      req.cookies.get('__Secure-next-auth.session-token');

    if (!sessionCookie) {
      const url = new URL('/login', origin);
      url.searchParams.set('from', pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  // Only match specific routes to avoid conflicts
  matcher: ['/dashboard/:path*', '/profile/:path*', '/settings/:path*'],
};
