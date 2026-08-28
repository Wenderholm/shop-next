import NextAuth from "next-auth";
import { authConfig } from "./authconfig";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  // req.auth jest oznacza czy użytkownik jest zalogowany czy nie
  const isLoggedIn = !!req.auth;

  const isLoginPage = req.nextUrl.pathname === "/login";
  const isRegisterPage = req.nextUrl.pathname === "/register";

  if (!isLoggedIn && !isLoginPage && !isRegisterPage) {
    return Response.redirect(new URL("/login", req.nextUrl));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
