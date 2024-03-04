// import { NextResponse } from "next/server";
// import Request  from "next";
// export function middleware(request: Request) {
//   console.log("middleware for roster page");
//   return null;
// }
export {default} from "next-auth/middleware";
export const config = {
  matcher: "/:team/roster",
};

// export { default } from "next-auth/middleware"
