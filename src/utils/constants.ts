export const isPublicRoute = (pathname: string) => pathname.startsWith("/sign-in")
    || pathname.startsWith("/sign-up")
    || pathname === "/"
    || (pathname.startsWith("/blog") && !pathname.endsWith("/update"));