import { NextResponse } from 'next/server'
// import { authenticate } from 'auth-provider'

export function middleware(request) {
    console.log("=============================");
    console.log(request.nextUrl);


    // if (request.nextUrl.pathname === "/cart") return NextResponse.redirect(new URL("/"), request.url)
    // else return NextResponse.redirect(new URL("/", request.url))
}

// export const config = {
//     matcher: "/admin/:slug*",
// }