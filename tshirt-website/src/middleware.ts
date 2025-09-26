import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Define routes directly in middleware to avoid import issues
const PUBLIC_ROUTES = [
  '/',
  '/login',
  '/register',
  '/about',
  // add your public routes here
];

const PROTECTED_ROUTES = [
  '/dashboard',
  '/profile',
  '/settings',
  // add your protected routes here
];

export default async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;

  console.log(`[middleware] Processing: ${pathname}`);

  // Skip middleware for system routes - simplified condition
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/auth') || // Allow NextAuth API routes
    pathname.startsWith('/static') ||
    pathname.includes('.') // files with extensions
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
    console.log(`[middleware] Public route allowed: ${pathname}`);
    return NextResponse.next();
  }

  // Check if route is protected
  const isProtectedRoute = PROTECTED_ROUTES.some(route =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    try {
      // Check for NEXTAUTH_SECRET
      if (!process.env.NEXTAUTH_SECRET) {
        console.error('[middleware] NEXTAUTH_SECRET not found');
        const url = new URL('/login', origin);
        url.searchParams.set('from', pathname);
        return NextResponse.redirect(url);
      }

      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });

      if (!token) {
        console.log(`[middleware] No token found, redirecting to login`);
        const url = new URL('/login', origin);
        url.searchParams.set('from', pathname);
        return NextResponse.redirect(url);
      }

      console.log(`[middleware] Protected route authorized: ${pathname}`);
    } catch (err) {
      console.error('[middleware] Authentication error:', err);
      const url = new URL('/login', origin);
      url.searchParams.set('from', pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
};
