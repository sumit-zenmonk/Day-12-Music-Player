import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ['/public', '/login', '/signup'];
const AuthBlockRoutes = ['/login', '/signup']

export default function middleware(req: NextRequest) {
    const credentials = req.cookies.get("uid")?.value;
    const pathname = req.nextUrl.pathname;
    const isPublic = publicRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`) || pathname.endsWith('.svg'));
    const isAuthBlock = AuthBlockRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
    const isAuthenticated = Boolean(credentials);

    if (isAuthenticated && isAuthBlock) {
        return NextResponse.redirect(new URL("/", req.url));
    }
    if (isPublic) {
        return NextResponse.next();
    }
    if (!isAuthenticated && !isPublic) {
        return NextResponse.redirect(new URL("/signup", req.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next|api|.*\\..*).*)'],
};