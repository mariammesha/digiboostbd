import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdmin = token?.role === 'ADMIN';

    // Role-based protection for /admin routes
    if (req.nextUrl.pathname.startsWith('/admin')) {
      if (!isAdmin) {
        // Non-admins trying to access admin panel get redirected to their dashboard
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Ensures user is logged in. If false, redirects to login page automatically.
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ['/dashboard', '/dashboard/:path*', '/admin', '/admin/:path*'],
};
