import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the user cookie
  const user = request.cookies.get('user');

  // List of paths that don't require authentication
  const publicPaths = [
    '/api/auth/signin', 
    '/api/auth/signup',
    '/api/chatbot', // Add chatbot to public paths
  ];

  // Check if the path requires authentication
  if (!publicPaths.includes(request.nextUrl.pathname)) {
    // If no user cookie is present and trying to access protected route
    if (!user && request.nextUrl.pathname.startsWith('/api/')) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
}; 