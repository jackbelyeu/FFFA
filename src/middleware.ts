export { default } from "next-auth/middleware";
export const config = {
  matcher: ["/:team/roster", "/matchSchedule"],
};