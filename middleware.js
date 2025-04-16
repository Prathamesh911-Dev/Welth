import { clerkMiddleware } from "@clerk/nextjs/server";

const protectedRoutes = ["/dashboard", "/account", "/transaction"];

export default clerkMiddleware(async (auth, req) => {
    const { userId } = await auth();
    const pathname = req.nextUrl.pathname;

    // Check if the request is for a protected route
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

    if (!userId && isProtectedRoute) {
        const { redirectToSignIn } = await auth();
        return redirectToSignIn();
    }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
