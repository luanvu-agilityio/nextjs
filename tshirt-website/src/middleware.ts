import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { PROTECTED_ROUTES, PUBLIC_ROUTES } from './constants';

export const runtime = 'nodejs';

// ============================================================================
// This function runs on EVERY request (except those filtered by config.matcher)
// It checks if the user has a valid JWT before allowing access to protected routes
// ============================================================================
export default async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;

  console.log(`[middleware] Processing: ${pathname}`);

  // STEP 1: Skip Middleware for System Routes

  if (
    pathname.startsWith('/_next') || // Next.js internal routes
    pathname.startsWith('/api/auth') || // NextAuth API routes
    pathname.startsWith('/static') || // Static files
    pathname.includes('.') // Files with extensions (images, css, etc.)
  ) {
    return NextResponse.next();
  }

  // STEP 2: Check if Route is Public
  const isPublicRoute = PUBLIC_ROUTES.some(route => {
    if (route === '/') {
      return pathname === '/'; // Exact match for homepage
    }
    return pathname.startsWith(route); // Prefix match for others
  });

  if (isPublicRoute) {
    console.log(`[middleware] Public route allowed: ${pathname}`);
    return NextResponse.next(); // Allow access
  }

  // STEP 3: Check if Route is Protected
  // If the route is in PROTECTED_ROUTES, verify authentication
  const isProtectedRoute = PROTECTED_ROUTES.some(route =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    try {
      // ----------------------------------------------------------------------
      // AUTHENTICATION CHECK - This is the critical security step
      // ----------------------------------------------------------------------

      // Verify NEXTAUTH_SECRET exists (required to decrypt JWT)
      if (!process.env.NEXTAUTH_SECRET) {
        console.error('[middleware] NEXTAUTH_SECRET not found');
        const url = new URL('/login', origin);
        url.searchParams.set('from', pathname); // Remember where they wanted to go
        return NextResponse.redirect(url);
      }

      // Get and decrypt the JWT from the cookie
      // This verifies the user has a valid, non-expired session
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });

      // If no valid token found, user is NOT authenticated
      if (!token) {
        console.log(`[middleware] No token found, redirecting to login`);
        const url = new URL('/login', origin);
        url.searchParams.set('from', pathname); // Save original destination
        return NextResponse.redirect(url); // Redirect to login
      }

      // Token exists and is valid - user is authenticated!
      console.log(`[middleware] Protected route authorized: ${pathname}`);

      // The token object contains the data from your JWT callback:
      // - token.user (user information)
      // - token.accessToken ( backend's token)
    } catch (err) {
      // If anything goes wrong (expired token, invalid signature, etc.)
      console.error('[middleware] Authentication error:', err);
      const url = new URL('/login', origin);
      url.searchParams.set('from', pathname);
      return NextResponse.redirect(url);
    }
  }

  // STEP 4: Allow Other Routes (neither public nor protected)
  // If a route isn't explicitly listed, allow it through
  return NextResponse.next();
}

// MIDDLEWARE MATCHER CONFIGURATION
// Defines which routes this middleware should run on
// We exclude Next.js internal routes to avoid interference

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

// ============================================================================
// COMPLETE AUTHENTICATION FLOW:
// ============================================================================
//
// LOGIN PROCESS:
// 1. User visits /login (public route, allowed by middleware)
// 2. User submits credentials
// 3. Form calls /api/auth/signin (bypassed by middleware)
// 4. NextAuth calls authorize() function
// 5. authorize() calls your backend API
// 6. Backend returns { user, token }
// 7. jwt() callback stores everything in encrypted JWT
// 8. JWT stored as httpOnly cookie in browser
// 9. User redirected to dashboard
//
// ACCESSING PROTECTED ROUTE:
// 1. User navigates to /dashboard
// 2. Middleware intercepts the request
// 3. Middleware calls getToken() to decrypt JWT from cookie
// 4. If token valid → allow access
// 5. If token invalid/missing → redirect to /login
// 6. Page renders, can access session via useSession() hook
// 7. session() callback exposes user data + accessToken
// 8. Your components can use session.accessToken for API calls
//
// MAKING API CALLS TO YOUR BACKEND:
// 1. Get session: const { data: session } = useSession()
// 2. Use token: fetch('/api/data', {
//      headers: { Authorization: `Bearer ${session.accessToken}` }
//    })
// 3. Your backend validates the token
//
// ============================================================================
