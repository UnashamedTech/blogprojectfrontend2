// app/api/auth/callback/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { setAuthCookie } from '@/actions/auth/auth';
import { decodeToken } from '@/lib/utils';

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const token = url.searchParams.get('token');
    const blogId = url.searchParams.get('blogId');

    if (!token) {
        return NextResponse.redirect(new URL('/login?error=missing_token', req.url));
    }

    try {
        // Set cookies before redirect
        await setAuthCookie(token); // ✅ sets cookie server-side

        const decoded = decodeToken(token);
        const role = Array.isArray(decoded?.roles)
            ? decoded.roles[0]?.toUpperCase()
            : decoded?.roles?.toUpperCase();

        if (role === 'OWNER') {
            return NextResponse.redirect(new URL('/admin', req.url));
        }

        if (role === 'USER') {
            // Redirect back to blog
            if (!blogId) {
                return NextResponse.redirect(new URL('/login?error=missing_blog_id', req.url));
            }

            return NextResponse.redirect(new URL(`/blogs/${blogId}`, req.url)); // ✅ No token in URL anymore
        }

        return NextResponse.redirect(new URL('/', req.url)); // fallback
    } catch (error) {
        console.error('Failed to set auth cookie:', error);
        return NextResponse.redirect(new URL('/login?error=auth_failed', req.url));
    }
}
